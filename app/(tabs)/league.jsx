
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Alert } from "react-native";
import styles from "../../assets/styles/league.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colorsApp";
import { useAuthStore } from '@/store/authStore';
import { API_URL } from '@/constants/api';
import { Image } from 'expo-image';
import LeagueText from "@/constants/LeagueText"
import { useSettingsStore } from '@/store/settingStore';

export default function LeagueScreen() {
    const [selectedTier, setSelectedTier] = useState("Emerald");
    const [tieredUsers, setTieredUsers] = useState({
        Emerald: [],
        Diament: [],
        Gold: [],
        Silver: [],
        Bronze: [],
    });
    const { lang } = useSettingsStore();
    const t = LeagueText[lang];
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { token } = useAuthStore();


    const splitTop50ToTiers = (users) => ({
        Emerald: users.slice(0, 10),
        Diament: users.slice(10, 20),
        Gold: users.slice(20, 30),
        Silver: users.slice(30, 40),
        Bronze: users.slice(40, 50),
    });

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/league`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch user/walks");
            const grouped = splitTop50ToTiers(data.users);
            setTieredUsers(grouped);

        } catch (error) {
            console.error("Error fetching data:", error);
            Alert.alert("Error", "Failed to load ranking data. Pull to refresh.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };

    const renderUsers = ({ item, index }) => (
        <View style={styles.item}>
            <Text style={styles.rank}>{index + 1}.</Text>
            <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
            <Text style={styles.name}>{item.username}</Text>
            <Text style={styles.walks}>{item.rank} {t.point}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🏆 {t.leagueName}</Text>
            <View style={styles.profileHeader}>
                <FlatList
                    data={t.levels}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.tierBadge}
                            onPress={() => setSelectedTier(item.name)}
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
                    data={tieredUsers[selectedTier]}
                    renderItem={renderUsers}
                    keyExtractor={(item, index) => `${item._id}-${index}`}
                    contentContainerStyle={styles.booksList}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            colors={[COLORS.primary]}
                        />
                    }
                />
            )}
        </View>
    );
}
