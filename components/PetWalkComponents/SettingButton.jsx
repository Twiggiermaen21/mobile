import { TouchableOpacity, Text } from 'react-native';
import React from 'react'
import styles from '@/assets/styles/settings.styles';
import { useSettingsStore } from '@/store/settingStore';
import texture from "@/constants/colorsApp";


export default function SettingButton({ label, onPress }) {

    const { color } = useSettingsStore();
    const COLORS = texture[color];
    const dynamicStyles = styles(COLORS);



    return (
        <TouchableOpacity style={dynamicStyles.settingButton} onPress={onPress}>
            <Text style={dynamicStyles.settingText}>{label}</Text>
        </TouchableOpacity>
    )
}