
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Alert } from "react-native";
import styles from "../../assets/styles/league.styles";
import { Ionicons } from "@expo/vector-icons";
import texture from "@/constants/colorsApp";
import { useAuthStore } from '@/store/authStore';
import { Image } from 'expo-image';
import LeagueText from "@/assets/lang/League.text"
import { useSettingsStore } from '@/store/settingStore';
import { useLeagueStore } from "@/store/leagueStore"
export default function LeagueScreen() {
    const [selectedTier, setSelectedTier] = useState("Emerald");
    const { lang, color } = useSettingsStore();
    const COLORS = texture[color];
    const dynamicStyles = styles(COLORS);
    const t = LeagueText[lang];
    const { token } = useAuthStore();
    const { getLeague, users, isLoading, refreshing } = useLeagueStore()

    const fetchData = async () => {
        const result = await getLeague(token);
        if (!result.success) Alert.alert("Error", result.error);
    };

    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token]);

    const handleRefresh = async () => {
        await fetchData();
    };

    const renderUsers = ({ item, index }) => (
        <View style={dynamicStyles.item}>
            <Text style={dynamicStyles.rank}>{index + 1}.</Text>
            <Image source={{ uri: item.profileImage }} style={dynamicStyles.profileImage} />
            <Text style={dynamicStyles.name}>{item.username}</Text>
            <Text style={dynamicStyles.walks}>{item.rank} {t.point}</Text>
        </View>
    );

    return (
        <View style={dynamicStyles.container}>
            <Text style={dynamicStyles.title}>🏆 {t.leagueName}</Text>
            <View style={dynamicStyles.profileHeader}>
                <FlatList
                    data={t.levels}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={dynamicStyles.tierBadge}
                            onPress={() => setSelectedTier(item.name)} >
                            <View style={selectedTier === item.name ? dynamicStyles.selectedIconWrapper : null}>
                                <Ionicons name="trophy-sharp" size={50} color={item.color} />
                            </View>
                            <Text style={[dynamicStyles.tierText, { color: item.color }]}>{item.name}</Text>
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
                    data={users[selectedTier]}
                    renderItem={renderUsers}
                    keyExtractor={(item, index) => `${item._id}-${index}`}
                    contentContainerStyle={dynamicStyles.booksList}
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
