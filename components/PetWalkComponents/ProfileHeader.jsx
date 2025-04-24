import { View, Text } from 'react-native'
import React from 'react'
import { useAuthStore } from '@/store/authStore'
import styles from '@/assets/styles/profile.styles';
import { Image } from 'expo-image';
import ProfileText from "@/constants/ProfileText";
import { useSettingsStore } from '@/store/settingStore';



export default function ProfileHeader() {
    const { user } = useAuthStore();
    if (!user) return null;
    const { lang } = useSettingsStore();
    const t = ProfileText[lang];
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    return (
        <View style={styles.profileHeader}>
            <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
            <View style={styles.profileInfo}>
                <Text style={styles.username} >{user.username}</Text>

                <Text style={styles.email} >{user.email}</Text>
                <Text style={styles.memberSince} >{t.Joined} {formatDate(user.createdAt)}</Text>

            </View>
        </View>
    )
}