import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { API_URL } from '@/constants/api';
import { useAuthStore } from '@/store/authStore';
import ProfileHeader from '@/components/ProfileHeader'
import styles from "@/assets/styles/profile.styles"
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constants/colorsApp';




export default function ProfileScreen() {
    const { token } = useAuthStore();
    const [dogs, setDogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [deletedDogId, setDeletedDogId] = useState(null);

    const router = useRouter();


    const fetchData = async () => {
        try {
            setIsLoading(true);

            // const response = await fetch(`${API_URL}/walks/user`, {
            //     headers: { Authorization: `Bearer ${token}` },
            // })

            const response = await fetch(`${API_URL}/dogs/get-dog`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch dogs");

            setDogs(data.dogs);

        } catch (error) {
            console.error("Error fetching data:", error);
            Alert.alert("Error", "Failed to load profile data. Pulldown to refresh.");
        } finally {
            setIsLoading(false);
        }



    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteDog = async (dogId) => {
        try {
            setDeletedDogId(dogId);
            const response = await fetch(`${API_URL}/dogs/${dogId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            })

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to delete dog");

            setDogs(dogs.filter((dog) => dog._id !== dogId));
            Alert.alert("Success", "Dog deleted succesfully");
        } catch (error) {
            Alert.alert("Error", error.message || "Failed to delete dog");
        } finally {
            setDeletedDogId(null);
        }
    }

    const confirmDelete = (dogId) => {
        Alert.alert("Delete Recommendation", "Are you sure you want to delete this dog", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => handleDeleteDog(dogId) }
        ]);
    };

    const renderDogItem = ({ item }) => (
        <View style={styles.bookItem}>
            <Image source={{ uri: item.dogImage }} style={styles.bookImage} />
            <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{item.name}</Text>

                <Text style={styles.bookCaption} numberOfLines={4}>
                    {`Rasa: ${item.breed || 'Nieznana'}\n`}
                    {`Wiek: ${item.age} lat\n`}
                    {`Waga: ${item.weight} kg\n`}
                    {`Wzrost: ${item.height} cm`}
                </Text>


            </View>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => confirmDelete(item._id)} >
                {deletedDogId == item._id ? (
                    <ActivityIndicator size="small" color={COLORS.primary} />
                ) : (
                    <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
                )}
            </TouchableOpacity>
        </View>
    );

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }

    return (
        <View style={styles.container}>

            <ProfileHeader />

            <View style={styles.booksHeader}><Text style={styles.bookTitle}>Twoje zwierzeta</Text></View>
            {!isLoading && dogs.length === 0 && (
                <Text style={styles.noDogsText}>Nie masz jeszcze żadnych zwierząt. Dodaj pierwszego psa!</Text>
            )}

            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={dogs}
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

            <TouchableOpacity style={styles.logoutButton} onPress={() => router.push('/addDog')}>
                <Ionicons name='add-circle-outline' size={20} color={COLORS.white} />
                <Text style={styles.logoutText}>Add Dog </Text>
            </TouchableOpacity >


        </View>
    );
}
