import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand'
import { API_URL } from "../constants/api"

export const useLeagueStore = create((set) => ({
    isLoading: false,
    users: { Emerald: [], Diament: [], Gold: [], Silver: [], Bronze: [] },
    refreshing: false,
    getLeague: async (token) => {
        set({ isLoading: true, refreshing: true });

        try {
            const response = await fetch(`${API_URL}/league`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch user/walks");

            const splitTop50ToTiers = (users) => ({
                Emerald: users.slice(0, 10),
                Diament: users.slice(10, 20),
                Gold: users.slice(20, 30),
                Silver: users.slice(30, 40),
                Bronze: users.slice(40, 50),
            });

            const grouped = splitTop50ToTiers(data.users);

            set({ isLoading: false, users: grouped, refreshing: false });
            return { success: true };

        } catch (error) {
            set({ isLoading: false, refreshing: false });
            return { success: false, error: error.message };
        }
    },







}));