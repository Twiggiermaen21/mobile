import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { useAuthStore } from '@/store/authStore';
import ProfileHeader from '@/components/ProfileHeader'
import styles from "@/assets/styles/profile.styles"
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constants/colorsApp';
import noDog from "../../assets/ImagesPetWalk/noDog.jpeg";
import { useDogStore } from "@/store/dogStore"
import ProfileText from "@/constants/ProfileText";
import { useSettingsStore } from '@/store/settingStore';


export default function ProfileScreen() {
    const { token } = useAuthStore();
    const [refreshing, setRefreshing] = useState(false);
    const { lang } = useSettingsStore();
    const t = ProfileText[lang];
    const router = useRouter();
    const { dogsFromDB, getDogs, isLoading, DeletedDogId } = useDogStore()

    const GetDogsFromDataBase = async () => {
        const result = await getDogs(token);
        if (!result.success) Alert.alert("Error", result.error);
    }

    useEffect(() => {
        GetDogsFromDataBase();
    }, []);

    const handleDeleteDog = async (dogId) => {
        const result = await DeletedDogId(token, dogId);
        if (!result.success) Alert.alert("Error", result.error);
        else Alert.alert(t.Success, t.DeleteDog);
    }

    const confirmDelete = (dogId) => {
        Alert.alert(t.deleteTitle, t.deleteMessage, [
            { text: t.cancel, style: "cancel" },
            { text: t.confirmDelete, style: "destructive", onPress: () => handleDeleteDog(dogId) }
        ]);
    };
    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }

    const renderDogItem = ({ item }) => (
        <View style={styles.bookItem}>
            <Image
                source={item.dogImage ? { uri: item.dogImage } : noDog}
                style={styles.bookImage} />
            <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{item.name}</Text>

                <Text style={styles.bookCaption} numberOfLines={4}>
                    {`${t.breed}: ${item.breed || '---'}\n`}
                    {`${t.age}: ${item.age} \n`}
                    {`${t.weight}: ${item.weight} kg\n`}
                    {`${t.height}: ${item.height} cm`}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => confirmDelete(item._id)} >
                {isLoading ? (
                    <ActivityIndicator size="small" color={COLORS.primary} />
                ) : (
                    <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
                )}
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <ProfileHeader />
            <View style={styles.booksHeader}><Text style={styles.bookTitle}>{t.Yourpets}</Text></View>
            {!isLoading && dogsFromDB === null && (
                <Text style={styles.noDogsText}>{t.noDogs}</Text>
            )}
            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={dogsFromDB}
                    renderItem={renderDogItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.booksList}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            colors={[COLORS.primary]}
                        />
                    }
                />)}

            <TouchableOpacity style={styles.logoutButton} onPress={() => router.push('/(notabs)/addDog')}>
                <Ionicons name='add-circle-outline' size={20} color={COLORS.white} />
                <Text style={styles.logoutText}>{t.addDog}</Text>
            </TouchableOpacity >
        </View>
    );
}
