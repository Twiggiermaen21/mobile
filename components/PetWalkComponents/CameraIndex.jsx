import React from 'react';
import {  View,  Pressable, Alert } from 'react-native';
import styles from '@/assets/styles/map.styles'; 
import texture from '@/constants/colorsApp'
import { useSettingsStore } from '@/store/settingStore';
import { Ionicons } from '@expo/vector-icons';

export default function CameraIndex({ openNativeCamera, savePhoto }) {

    const { color } = useSettingsStore();
    const COLORS = texture[color];
    const dynamicStyles = styles(COLORS);
    return (
        <Pressable
        onPress={async () => {
            const result = await openNativeCamera();
            if (!result.canceled) {
                savePhoto(result);
            } else {
                Alert.alert("Error", result.error);
            }
        }}
        style={({ pressed }) => [
            dynamicStyles.cameraButton,
            { backgroundColor: pressed ? '#e0e0e0' : 'white' },
        ]}>
        <View style={dynamicStyles.iconBackground}>
            <Ionicons name="camera" size={24} color="#777" />
        </View>
    </Pressable>
    )
}

