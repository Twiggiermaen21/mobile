import React, { useEffect } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { Image } from 'expo-image';
import { useAuthStore } from '@/store/authStore';
import COLORS from '@/constants/colorsApp';
import styles from '@/assets/styles/history.styles';
import noDog from "../../assets/ImagesPetWalk/noDog.jpeg";
import HistoryText from "@/constants/HistoryText"
import { useSettingsStore } from '@/store/settingStore';
import { useWalkStore } from "@/store/walkStore"
export default function HistoryScreen() {
    const { token } = useAuthStore();
    const { walks, page, totalPages, isLoadingMore, refreshing, getWalks } = useWalkStore()

    const { lang } = useSettingsStore();
    const t = HistoryText[lang];

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }

    const fetchData = async (pageNumber = 1, refreshing = false) => {
        const result = await getWalks(pageNumber, refreshing, token);
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
                ListFooterComponent={isLoadingMore ? <Text style={styles.loading}>{t.loading}</Text> : null}
                renderItem={({ item }) => (
                    <View style={styles.bookItem}>
                        <View style={styles.mapCard}>
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


