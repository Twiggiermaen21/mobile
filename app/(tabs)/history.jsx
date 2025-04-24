import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { Image } from 'expo-image';
import { API_URL } from '@/constants/api';
import { useAuthStore } from '@/store/authStore';
import COLORS from '@/constants/colorsApp';
import styles from '@/assets/styles/history.styles';
import noDog from "../../assets/ImagesPetWalk/noDog.jpeg";
import HistoryText from "@/constants/HistoryText"
import { useSettingsStore } from '@/store/settingStore';
import { useWalkStore } from "@/store/walkStore"
export default function HistoryScreen() {
    // const [isLoading, setIsLoading] = useState(true);
    // const [walks, setWalks] = useState([]);
    const { token } = useAuthStore();
    // const [refreshing, setRefreshing] = useState(false);
    // const [page, setPage] = useState(1);
    // const [isLoadingMore, setIsLoadingMore] = useState(false);
    // const [totalPages, setTotalPages] = useState(1); // z backendu

    const {
        walks,
        page,
        totalPages,
        isLoading,
        isLoadingMore,
        refreshing,
        pageNumber, getWalks } = useWalkStore()


    const { lang } = useSettingsStore();
    const t = HistoryText[lang];

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }

    const fetchData = async (pageNumber = 1, refreshing = false) => {
        // try {
        //     if (refreshing) setRefreshing(true);
        //     else if (pageNumber > 1) setIsLoadingMore(true);
        //     else setIsLoading(true);

        //     const response = await fetch(`${API_URL}/walks?page=${pageNumber}&limit=5`, {
        //         headers: { Authorization: `Bearer ${token}` },
        //     });

        //     const data = await response.json();
        //     if (!response.ok) throw new Error(data.message || "Failed to fetch walks");


        //     setWalks(prev =>
        //         pageNumber === 1 ? data.walks : [...prev, ...data.walks]
        //     );

        //     setPage(data.currentPage);
        //     setTotalPages(data.totalPages);
        // } catch (error) {
        //     console.error("Error fetching data:", error);
        // } finally {
        //     setIsLoading(false);
        //     setRefreshing(false);
        //     setIsLoadingMore(false);
        // }

        const result = await getWalks(pageNumber = 1, refreshing = false, token);
        if (!result.success) Alert.alert("Error", result.error);

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
            <Text style={styles.title}>{t.historyTitle}</Text>
            <FlatList
                data={walks}
                extraData={walks}
                keyExtractor={(item) => item._id}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[COLORS.primary]} />}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isLoadingMore ? <Text style={{ textAlign: 'center', padding: 8 }}>{t.loading}</Text> : null}
                renderItem={({ item }) => (
                    <View style={styles.bookItem}>
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
                                }} >
                                <Polyline
                                    coordinates={item.path}
                                    strokeColor="#000"
                                    strokeWidth={3}
                                />
                            </MapView>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.email}>
                                {t.date} {new Date(item.createdAt).toLocaleDateString()}
                            </Text>

                            <Text style={styles.email}>
                                {t.time}{formatTime(item.time)}
                            </Text>

                            <Text style={styles.email}>
                                {t.distance} {(item.distance).toFixed(2)} km
                            </Text>

                            <Text style={styles.email}>
                                {t.speed} {item.speed.toFixed(2)} km/h
                            </Text>
                            <View style={styles.dogsContainer}>
                                <FlatList
                                    horizontal={true}
                                    data={item.dogs}
                                    keyExtractor={(dog, index) => dog._id || index.toString()}
                                    renderItem={({ item: dog, index }) => (
                                        <View key={index} style={styles.dogContainer}>
                                            <Image
                                                source={dog.dogImage ? { uri: dog.dogImage } : noDog}
                                                style={styles.dogImage} />
                                        </View>
                                    )}
                                    showsHorizontalScrollIndicator={false} />
                            </View>
                        </View>
                    </View>
                )} />
        </View>
    );
}


