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

    updateUsername: async (token, newUsername) => {
        set({ isLoading: true });
        try {
            // Jeśli używasz API, podstaw URL i metodę aktualizacji
            const response = await fetch(`${API_URL}/auth/update-username`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` // jeśli używasz autoryzacji
                },
                body: JSON.stringify({ username: newUsername })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update username');

            }



            // Jeśli masz lokalny store (np. Zustand):
            // set({ username: data.username });
            set({ isLoading: false });
            console.log('Username updated successfully:', data.username);
            return { success: true };
        } catch (error) {
            set({ isLoading: false });
            console.error('Error updating username:', error);
            return { success: false, error: error.message };
        }
    }
    , updatePassword: async () => {

    }, updateEmail: async () => {

    },



}));