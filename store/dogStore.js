import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand'
import { API_URL } from "../constants/api"

export const useDogStore = create((set) => ({
    dogsFromDB: null,
    isLoading: false,

    addDog: async (username, email, password) => {

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


    getDogs: async (token) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}/dogs/get-dog`, {
                headers: { Authorization: `Bearer ${token}` },
            })

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Something went wrong");
            set({ dogsFromDB: data.dogs, isLoading: false });
            return { success: true };
        } catch (error) {
            set({ isLoading: false });
            return { success: false, error: error.message };
        }
    },

}));