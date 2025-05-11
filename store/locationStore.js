import AsyncStorage from '@react-native-async-storage/async-storage';

const PATH_STORAGE_KEY = 'location_path';

export const savePathToStorage = async (path) => {
    try {
        await AsyncStorage.setItem(PATH_STORAGE_KEY, JSON.stringify(path));
    } catch (e) {
        console.error('Error saving path:', e);
    }
};

export const getPathFromStorage = async () => {
    try {
        const storedPath = await AsyncStorage.getItem(PATH_STORAGE_KEY);
        return storedPath ? JSON.parse(storedPath) : [];
    } catch (e) {
        console.error('Error retrieving path:', e);
        return [];
    }
};

export const clearPathStorage = async () => {
    try {
        await AsyncStorage.removeItem(PATH_STORAGE_KEY);
    } catch (e) {
        console.error('Error clearing path:', e);
    }
};
