import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { API_URL } from '@/constants/api';
import { useAuthStore } from '@/store/authStore';
import ProfileHeader from '@/components/ProfileHeader'
import styles from "@/assets/styles/profile.styles"
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constants/colorsApp';
const dogs = [{

    name: "Max",
    breed: "Owczarek niemiecki",
    weight: 35,
    age: 4,
    height: 60,
    profileImage: "https://media.istockphoto.com/id/1482199015/pl/zdjęcie/szczęśliwy-szczeniak-walijski-corgi-14-tygodni-pies-mrugający-dyszący-i-siedzący-samotnie.jpg?s=612x612&w=0&k=20&c=L7e6j1fqOSdy9iokwc7sOgcFVBQzKzxrH-zRB474kak="

}, {
    name: "Luna",
    breed: "Golden Retriever",
    weight: 30,
    age: 2,
    height: 55,
    profileImage: "https://cdn.onemars.net/sites/perfect-fit_pl_W7ZCj_JAs8/image/zachowanie-psa_1632842738937.png"
}, {
    name: "Burek",
    breed: "",
    weight: 18,
    age: 5,
    height: 40,
    profileImage: "https://cdn.onemars.net/sites/perfect-fit_pl_W7ZCj_JAs8/image/zachowanie-psa_1632842738937.png"
}

]

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

    const renderDogs = ({ item }) => (
        <View style={styles.bookItem}>
            <Image source={{ uri: item.profileImage }} style={styles.bookImage} />
            <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>
                    {item.name}
                </Text>
            </View>
        </View>


    );


    return (
        <View style={styles.container}>

            <ProfileHeader />

            <View style={styles.booksHeader}>
                <Text style={styles.bookTitle}>Twoje zwierzeta</Text>

            </View>
            <FlatList
                data={dogs}
                renderItem={renderDogs}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.booksList}
            />

            <TouchableOpacity style={styles.logoutButton} onPress={() => router.push('/addDog')}>
                <Ionicons name='log-out-outline' size={20} color={COLORS.white} />
                <Text style={styles.logoutText}>Add Dog </Text>
            </TouchableOpacity >


        </View>
    );
}
