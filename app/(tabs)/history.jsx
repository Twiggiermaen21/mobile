import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native';
import MapView, { Region, Polyline, LatLng } from 'react-native-maps';
import { Image } from 'expo-image';
import { API_URL } from '@/constants/api';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';
import COLORS from '@/constants/colorsApp';
import styles from '@/assets/styles/map.styles';


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

    return (
        <View style={styles.container}>
            <View style={styles.card}>
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
                        <View style={styles.item}>
                            {/* Mapka po lewej */}
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
                                    latitudeDelta: 0.005,
                                    longitudeDelta: 0.005,
                                }}
                            >
                                <Polyline
                                    coordinates={item.path}
                                    strokeColor="#000"
                                    strokeWidth={3}
                                />
                            </MapView>

                            {/* Informacje po prawej */}
                            <View style={styles.infoContainer}>
                                <Text style={styles.infoText}>📅 {new Date(item.createdAt).toLocaleString()}</Text>

                                <Text style={styles.infoText}>🕒 {item.time}</Text>
                                <Text style={styles.infoText}>📏 {item.distance}</Text>
                                <Text style={styles.infoText}>🏃 {item.speed}</Text>
                                <View style={styles.dogsContainer}>
                                    {item.dogs.map((dog, idx) => (
                                        <View key={idx} style={styles.dogContainer}>
                                            <Image
                                                source={{ uri: dog.dogImage }}
                                                style={styles.dogImage}
                                            />
                                            <Text style={styles.dogName}>{dog.name}</Text>
                                        </View>
                                    ))}
                                </View>

                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}



// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: '#fff',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 16,
//     }, dogContainer: {
//         alignItems: 'center',
//         marginRight: 10,
//     },
//     item: {
//         flexDirection: 'row',
//         marginBottom: 16,
//         borderRadius: 12,
//         overflow: 'hidden',
//         backgroundColor: '#f9f9f9',
//         elevation: 2,
//     },
//     map: {
//         width: 150,
//         height: 150,
//     },
//     infoContainer: {
//         flex: 1,
//         padding: 12,
//         justifyContent: 'space-between',
//     },
//     dogsContainer: {
//         flexDirection: 'row',
//         marginBottom: 8,
//     },
//     dogImage: {
//         width: 50,
//         height: 50,
//         borderRadius: 16,
//         marginRight: 8,
//     },
//     infoText: {
//         fontSize: 14,
//         marginBottom: 4,
//     },
// });
