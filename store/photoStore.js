import { create } from 'zustand'
import { API_URL } from "../constants/api"

export const usePhotoStore = create((set) => ({

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


            const response = await fetch(`${API_URL}/photo/upload-image`, {
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