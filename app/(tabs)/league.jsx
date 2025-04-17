import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import styles from "../../assets/styles/league.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colorsApp";
import { useAuthStore } from '@/store/authStore';
import { API_URL } from '@/constants/api';

import { Image } from 'expo-image';
const mockRanking = {
    Diament: Array(20).fill(null).map((_, index) => ({
        name: `User ${index + 1}`,
        walks: Math.floor(Math.random() * 100),
        profileImage: `https://api.dicebear.com/9.x/avataaars/svg?seed=User${index + 1}`, // Unikalne awatar na podstawie nazwy użytkownika
    })),
    Gold: Array(20).fill(null).map((_, index) => ({
        name: `User ${index + 21}`,
        walks: Math.floor(Math.random() * 100),
        profileImage: `https://api.dicebear.com/9.x/avataaars/svg?seed=User${index + 21}`,
    })),
    Silver: Array(20).fill(null).map((_, index) => ({
        name: `User ${index + 41}`,
        walks: Math.floor(Math.random() * 100),
        profileImage: `https://api.dicebear.com/9.x/avataaars/svg?seed=User${index + 41}`,
    })),
    Bronze: Array(20).fill(null).map((_, index) => ({
        name: `User ${index + 61}`,
        walks: Math.floor(Math.random() * 100),
        profileImage: `https://api.dicebear.com/9.x/avataaars/svg?seed=User${index + 61}`,
    })),
    Platinum: Array(20).fill(null).map((_, index) => ({
        name: `User ${index + 81}`,
        walks: Math.floor(Math.random() * 100),
        profileImage: `https://api.dicebear.com/9.x/avataaars/svg?seed=User${index + 81}`,
    })),
    Titanium: Array(20).fill(null).map((_, index) => ({
        name: `User ${index + 101}`,
        walks: Math.floor(Math.random() * 100),
        profileImage: `https://api.dicebear.com/9.x/avataaars/svg?seed=User${index + 101}`,
    })),
    Copper: Array(20).fill(null).map((_, index) => ({
        name: `User ${index + 121}`,
        walks: Math.floor(Math.random() * 100),
        profileImage: `https://api.dicebear.com/9.x/avataaars/svg?seed=User${index + 121}`,
    })),
    Steel: Array(20).fill(null).map((_, index) => ({
        name: `User ${index + 141}`,
        walks: Math.floor(Math.random() * 100),
        profileImage: `https://api.dicebear.com/9.x/avataaars/svg?seed=User${index + 141}`,
    })),
    Ruby: Array(20).fill(null).map((_, index) => ({
        name: `User ${index + 161}`,
        walks: Math.floor(Math.random() * 100),
        profileImage: `https://api.dicebear.com/9.x/avataaars/svg?seed=User${index + 161}`,
    })),
    Emerald: Array(20).fill(null).map((_, index) => ({
        name: `User ${index + 181}`,
        walks: Math.floor(Math.random() * 100),
        profileImage: `https://api.dicebear.com/9.x/avataaars/svg?seed=User${index + 181}`,
    })),
};

const tiers = [
    { name: "Emerald", color: "#50c878" },
    { name: "Diament", color: "#33ccff" },
    { name: "Gold", color: "#ffd700" },
    { name: "Silver", color: "#c0c0c0" },
    { name: "Bronze", color: "#cd7f32" },
];

export default function LeagueScreen() {
    const [selectedTier, setSelectedTier] = useState("Diament");

    const handleTierPress = (tierName) => {
        setSelectedTier(tierName);
    };


    const { token } = useAuthStore();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);


    const router = useRouter();


    const fetchData = async () => {
        try {
            setIsLoading(true);

            // const response = await fetch(`${API_URL}/walks/user`, {
            //     headers: { Authorization: `Bearer ${token}` },
            // })

            // const response = await fetch(`${API_URL}/dogs/get-dog`, {
            //     headers: { Authorization: `Bearer ${token}` },
            // });
            // const data = await response.json();
            // if (!response.ok) throw new Error(data.message || "Failed to fetch dogs");

            // setDogs(data.dogs);

        } catch (error) {
            console.error("Error fetching data:", error);
            Alert.alert("Error", "Failed to load profile data. Pulldown to refresh.");
        } finally {
            setIsLoading(false);
        }



    }

    useEffect(() => {
        fetchData();
    }, []
    );



    const renderUsers = ({ item, index }) => (

        <View style={styles.item}>
            <Text style={styles.rank}>{index + 1}.</Text>
            <Image
                source={{ uri: item.profileImage }} style={styles.profileImage} />

            <Text style={styles.name}>  {item.name} </Text>
            <Text style={styles.walks}>{item.walks} spacerów</Text>
        </View>
    );

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>🏆 Liga spacerowiczów</Text>

            {/* Górna część – Tiers (poziomy ScrollView) */}
            <View style={styles.profileHeader}>
                <FlatList
                    data={tiers}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.tierBadge}
                            onPress={() => handleTierPress(item.name)}
                        >
                            <View style={selectedTier === item.name ? styles.selectedIconWrapper : null}>
                                <Ionicons name="trophy-sharp" size={50} color={item.color} />
                            </View>
                            <Text style={[styles.tierText, { color: item.color }]}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                />

            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={mockRanking[selectedTier]}
                    renderItem={renderUsers}
                    keyExtractor={(item, index) => `${item.name}-${index}`}
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


        </View >
    );
}
