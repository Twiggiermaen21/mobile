import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { useAuthStore } from '@/store/authStore';
import ProfileHeader from '@/components/PetWalkComponents/ProfileHeader'
import styles from "@/assets/styles/profile.styles"
import { Ionicons } from '@expo/vector-icons';
import texture from '@/constants/colorsApp';
import noDog from "../../assets/ImagesPetWalk/noDog.jpeg";
import { useDogStore } from "@/store/dogStore"
import ProfileText from "@/assets/lang/Profile.text";
import { useSettingsStore } from '@/store/settingStore';


export default function ProfileScreen() {
    const { token } = useAuthStore();
    const [refreshing, setRefreshing] = useState(false);
    const { lang, color } = useSettingsStore();
    const COLORS = texture[color];
    const dynamicStyles = styles(COLORS);
    const t = ProfileText[lang];
    const router = useRouter();
    const { dogsFromDB, getDogs, isLoading, DeletedDogId } = useDogStore()

    const GetDogsFromDataBase = async () => {
        const result = await getDogs(token);
        if (!result.success) Alert.alert("Error", result.error);
    }



    useEffect(() => {
        if (token) {
            GetDogsFromDataBase();
        }
    }, [token]);

    const handleDeleteDog = async (dogId) => {
        const result = await DeletedDogId(token, dogId);
        if (!result.success) Alert.alert("Error", result.error);
        else Alert.alert(t.Success, t.DeleteDog);
        handleRefresh();
    }

    const confirmDelete = (dogId) => {
        Alert.alert(t.deleteTitle, t.deleteMessage, [
            { text: t.cancel, style: "cancel" },
            { text: t.confirmDelete, style: "destructive", onPress: () => handleDeleteDog(dogId) }
        ]);
    };
    const handleRefresh = async () => {
        setRefreshing(true);
        await GetDogsFromDataBase();
        setRefreshing(false);
    }

    const renderDogItem = ({ item }) => (
        <View style={dynamicStyles.bookItem}>
            <Image
                source={item.dogImage ? { uri: item.dogImage } : noDog}
                style={dynamicStyles.bookImage} />
            <View style={dynamicStyles.bookInfo}>
                <Text style={dynamicStyles.bookTitle}>{item.name}</Text>

                <Text style={dynamicStyles.bookCaption} numberOfLines={4}>
                    {`${t.breed}: ${item.breed || '---'}\n`}
                    {`${t.age}: ${item.age} ${t.age2} \n`}
                    {`${t.weight}: ${item.weight} kg\n`}
                    {`${t.height}: ${item.height} cm`}
                </Text>
            </View>
            <TouchableOpacity
                style={dynamicStyles.deleteButton}
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
        <View style={dynamicStyles.container}>
            <ProfileHeader />
            <View style={dynamicStyles.booksHeader}><Text style={dynamicStyles.bookTitle}>{t.Yourpets}</Text></View>
            {!isLoading && (!dogsFromDB || dogsFromDB.length === 0) && (
                <Text style={dynamicStyles.noDogsText}>{t.noDogs}</Text>
            )}
            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={dogsFromDB}
                    renderItem={renderDogItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={dynamicStyles.booksList}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            colors={[COLORS.primary]}
                        />
                    }
                />)}

            <TouchableOpacity style={dynamicStyles.addButton} onPress={() => router.push('/(notabs)/addDog')}>
                <Ionicons name='add-circle-outline' size={20} color={COLORS.white} />
                <Text style={dynamicStyles.addButtonText}>{t.addDog}</Text>
            </TouchableOpacity >
        </View>
    );
}
