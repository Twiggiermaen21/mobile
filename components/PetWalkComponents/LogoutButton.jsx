import { Alert, Text, TouchableOpacity, } from 'react-native'
import React from 'react'

import { useAuthStore } from '@/store/authStore'
import styles from '@/assets/styles/settings.styles'
import texture from '@/constants/colorsApp'
import { Ionicons } from '@expo/vector-icons'
import { useSettingsStore } from '@/store/settingStore'

export default function LogoutButton() {

    const { logout } = useAuthStore();
    const { color } = useSettingsStore();

    const COLORS = texture[color];
    const dynamicStyles = styles(COLORS);
    const confirmLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            { text: "Logout", onPress: () => logout(), style: "destructive" }
        ])
    }

    return (
        <TouchableOpacity style={dynamicStyles.logoutButton} onPress={confirmLogout}>
            <Ionicons name='log-out-outline' size={20} color={COLORS.white} />
            <Text style={dynamicStyles.logoutText}>Logout </Text>
        </TouchableOpacity >
    )

}