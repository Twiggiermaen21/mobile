import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand'
import { API_URL } from "../constants/api"
export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isLoading: false,

    register: async (username, email, password) => {

        set({ isLoading: true });
        try {
            //zmienic tutaj adres jak bede używał telefonu
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username, email, password
                })
            })

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Something went wrong");

            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            await AsyncStorage.setItem("token", data.token);

            set({ token: data.token, user: data.user, isLoading: false });

            return { success: true };

        } catch (error) {
            set({ isLoading: false });
            return { success: false, error: error.message };
        }
    },


    checkAuth: async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const userJson = await AsyncStorage.getItem("user");
            const user = userJson ? JSON.parse(userJson) : null;

            set({ token, user });
        } catch (error) {
            console.log("Auth check failed", error);
        }
    },

    login: async (email, password) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            })

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Something went wrong");

            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            await AsyncStorage.setItem("token", data.token);

            set({ token: data.token, user: data.user, isLoading: false });
            return { success: true };
        } catch (error) {
            set({ isLoading: false });
            return { success: false, error: error.message };
        }
    },

    logout: async () => {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        set({ token: null, user: null });

    },

    updateUser: async (token, updateData) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}/auth/update-user`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` // Bearer token
                },
                body: JSON.stringify(updateData) // Wysyłasz dowolne pola
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update user');
            }



            set({ isLoading: false });
            return { success: true, };
        } catch (error) {
            set({ isLoading: false });
            console.error('Error updating user:', error);
            return { success: false, error: error.message };
        }
    },





}));