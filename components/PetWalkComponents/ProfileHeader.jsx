import { View, Text } from 'react-native'
import React from 'react'
import { useAuthStore } from '@/store/authStore'
import styles from '@/assets/styles/profile.styles';
import { Image } from 'expo-image';
import ProfileText from "@/constants/ProfileText";
import { useSettingsStore } from '@/store/settingStore';
import noProfil from "@/assets/ImagesPetWalk/profil.jpg";
import texture from "@/constants/colorsApp";


export default function ProfileHeader() {
    const { user } = useAuthStore();
    if (!user) return null;
    const { lang, color } = useSettingsStore();
    const COLORS = texture[color];
    const dynamicStyles = styles(COLORS);
    const t = ProfileText[lang] || ProfileText.pl;
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    return (
        <View style={dynamicStyles.profileHeader}>
            <Image source={{ uri: user.profileImage || noProfil }} style={dynamicStyles.profileImage} />
            <View style={dynamicStyles.profileInfo}>
                <Text style={dynamicStyles.username} >{user.username}</Text>

                <Text style={dynamicStyles.email} >{user.email}</Text>
                <Text style={dynamicStyles.memberSince} >{t.Joined} {formatDate(user.createdAt)}</Text>

            </View>
        </View>
    )
}