import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand'
import { API_URL } from "../constants/api"

export const useDogStore = create((set) => ({
    dogsFromDB: null,
    isLoading: false,

    addDog: async (token, name, age, breed, image, height, weight, imageBase64) => {

        set({ isLoading: true });
        try {
            let imageDataUrl = null;
            if (image && imageBase64) {
                const uriParts = image.split(".");
                const fileType = uriParts[uriParts.length - 1];
                const imageType = fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg";
                imageDataUrl = `data:${imageType};base64,${imageBase64}`;
            }

            const response = await fetch(`${API_URL}/dogs/add-dog`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({
                    name,
                    breed,
                    weight,
                    age,
                    height,
                    image: imageDataUrl
                })

            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Something went wrong");

            set({ isLoading: false, });

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


    DeletedDogId: async (token, dogId) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}/dogs/${dogId}`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
                body: JSON.stringify({ isDeleted: true })
            })

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Something went wrong");
            set({ isLoading: false });
            return { success: true };
        } catch (error) {
            set({ isLoading: false });
            return { success: false, error: error.message };
        }
    },

}));