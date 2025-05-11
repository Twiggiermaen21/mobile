import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export async function openNativeCamera() {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
        Alert.alert('Permission required', 'Camera access is needed to take photos.');
        return null;
    }

    try {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            quality: 1,
            aspect: [4, 3],
            base64: true
        });
        if (!result.canceled) {
            return {
                uri: result.assets[0].uri,
                base64: result.assets[0].base64,

            };
        }
    } catch (error) {
        console.log("Error occurred while launching the camera: ", error);
        return null;
    }
}