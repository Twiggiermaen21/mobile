import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native';
import MapView, { Region, Polyline, LatLng } from 'react-native-maps';
import { Image } from 'expo-image';
import { API_URL } from '@/constants/api';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';
import COLORS from '@/constants/colorsApp';
import styles from '@/assets/styles/history.styles';


export default function HistoryScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [walks, setWalks] = useState([]);
    const router = useRouter();
    const { token, user } = useAuthStore();
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [totalPages, setTotalPages] = useState(1); // z backendu
    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }
    const fetchData = async (pageNumber = 1, refreshing = false) => {
        try {
            if (refreshing) setRefreshing(true);
            else if (pageNumber > 1) setIsLoadingMore(true);
            else setIsLoading(true);

            const response = await fetch(`${API_URL}/walks?page=${pageNumber}&limit=5`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch walks");

            // Jeśli odświeżamy — nadpisz spacery, jeśli nie — dołącz
            setWalks(prev =>
                pageNumber === 1 ? data.walks : [...prev, ...data.walks]
            );

            setPage(data.currentPage);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
            setIsLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const handleLoadMore = () => {
        if (!isLoadingMore && page < totalPages) {
            fetchData(page + 1);
        }
    };
    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        if (h > 0) {
            return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        } else if (m > 0) {
            return `${m}:${s.toString().padStart(2, '0')}`;
        } else {
            return `${s}s`;
        }
    };
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Historia spacerów</Text>
            <FlatList
                data={walks}
                extraData={walks}
                keyExtractor={(item) => item._id}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[COLORS.primary]}
                    />
                }
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isLoadingMore ? <Text style={{ textAlign: 'center', padding: 8 }}>Ładowanie...</Text> : null}
                renderItem={({ item }) => (
                    <View style={styles.bookItem}>
                        {/* Mapka po lewej */}
                        <View style={[styles.mapCard, { flex: 1, padding: 0, overflow: 'hidden' }]}>
                            <MapView
                                style={styles.map}
                                scrollEnabled={false}
                                zoomEnabled={false}
                                rotateEnabled={false}
                                pitchEnabled={false}
                                toolbarEnabled={false}
                                initialRegion={{
                                    latitude: item.path[0].latitude,
                                    longitude: item.path[0].longitude,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }}
                            >
                                <Polyline
                                    coordinates={item.path}
                                    strokeColor="#000"
                                    strokeWidth={3}
                                />
                            </MapView>
                        </View>
                        {/* Informacje po prawej */}
                        <View style={styles.infoContainer}>
                            <Text style={styles.email}>
                                📅 Data: {new Date(item.createdAt).toLocaleDateString()} {/* Data bez godziny */}
                            </Text>

                            <Text style={styles.email}>
                                🕒 Czas: {formatTime(item.time)} {/* Formatowany czas */}
                            </Text>

                            <Text style={styles.email}>
                                📏 Dystans: {(item.distance).toFixed(2)} km {/* Dystans w kilometrach */}
                            </Text>

                            <Text style={styles.email}>
                                🏃 Szybkość: {item.speed.toFixed(2)} km/h {/* Szybkość w km/h */}
                            </Text>
                            <View style={styles.dogsContainer}>
                                <FlatList
                                    horizontal={true} // Sprawia, że lista jest pozioma
                                    data={item.dogs} // Twoje dane psów
                                    keyExtractor={(dog, index) => dog._id || index.toString()} // Unikalny klucz dla każdego psa
                                    renderItem={({ item: dog, index }) => (
                                        <View key={index} style={styles.dogContainer}>
                                            <Image
                                                source={{ uri: dog.dogImage }}
                                                style={styles.dogImage}
                                            />
                                            {/* <Text style={styles.dogName}>{dog.name}</Text> */}
                                        </View>
                                    )}
                                    showsHorizontalScrollIndicator={false} // Ukrywa pasek przewijania
                                />
                            </View>

                        </View>
                    </View>
                )}
            />

        </View>
    );
}


