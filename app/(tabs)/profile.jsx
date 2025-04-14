import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { API_URL } from '@/constants/api';
import { useAuthStore } from '@/store/authStore';
import ProfileHeader from '@/components/ProfileHeader'
import styles from "@/assets/styles/profile.styles"



export default function ProfileScreen() {

    const [isLoading, setIsLoading] = useState(true);
    const [redreshing, setRefreshing] = useState(true);

    const router = useRouter();


    const fetchData = async () => {
        try {
            setIsLoading(true);

            const response = await fetch(`${API_URL}/walks/user`, {
                headers: { Autorization: `Bearer:${token}` },
            })

        } catch (error) {

        }



    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.container}>

            <ProfileHeader />

        </View>
    );
}
