import { create } from 'zustand'
import { API_URL } from "../constants/api"

export const useWalkStore = create((set) => ({
    isLoading: false,
    walks: [],
    page: null,
    totalPages: null,
    isLoading: null,
    isLoadingMore: null,
    pageNumber: 1,
    refreshing: false,

    getWalks: async (pageNumber, refreshing, token) => {
        if (refreshing) set({ refreshing: true });
        else if (pageNumber > 1) set({ isLoadingMore: true });
        else set({ isLoading: true });

        try {
            const response = await fetch(`${API_URL}/walks?page=${pageNumber}&limit=5`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch walks");

            set((state) => ({
                walks: pageNumber === 1 ? data.walks : [...(state.walks || []), ...data.walks],
                page: data.currentPage,
                totalPages: data.totalPages,
                isLoading: false,
                refreshing: false,
                isLoadingMore: false,
            }));

            return { success: true };

        } catch (error) {
            set({ isLoading: false, isLoadingMore: false, refreshing: false });
            return { success: false, error: error.message };
        }
    },

    saveWalk: async (token, timeElapsed, averageSpeed, distance, path, selectedDogIds,) => {
        set({ isLoading: true, });
        try {
            const response = await fetch(`${API_URL}/walks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    time: timeElapsed,
                    speed: averageSpeed,
                    distance,
                    path,
                    dogs: selectedDogIds,
                })
            })
            set({ isLoading: false });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Something went wrong");

            return { success: true };
        } catch (error) {
            set({ isLoading: false });
            return { success: false, error: error.message };
        }

    },
    deleteWalk: async (id, token) => {
        set({ isLoading: true, });
        try {
            const response = await fetch(`${API_URL}/walks/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            set({ isLoading: false });
            const data = await response.json();
            return { success: response.ok, error: data.message };
        } catch (err) {
            set({ isLoading: false });
            return { success: false, error: err.message };
        }
    },
    uploadImage: async (token, image, imageBase64, user) => {
        set({ isLoading: true, });
        try {

            let imageDataUrl = null;
            if (image && imageBase64) {
                const uriParts = image.split(".");
                const fileType = uriParts[uriParts.length - 1];
                const imageType = fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg";
                imageDataUrl = `data:${imageType};base64,${imageBase64}`;
            }


            const response = await fetch(`${API_URL}/walks/upload-image`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    image: imageDataUrl,
                    user
                })
            })

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Something went wrong");
            set({ isLoading: false });
            return { success: true };
        } catch (error) {
            set({ isLoading: false });
            return { success: false, error: error.message };
        }

    }







}));