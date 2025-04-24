import React, { useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, Alert, Pressable } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { Image } from 'expo-image';
import { useAuthStore } from '@/store/authStore';
import COLORS from '@/constants/colorsApp';
import styles from '@/assets/styles/history.styles';
import noDog from "../../assets/ImagesPetWalk/noDog.jpeg";
import HistoryText from "@/constants/HistoryText"
import { useSettingsStore } from '@/store/settingStore';
import { useWalkStore } from "@/store/walkStore"
import formatTime from "@/components/PetWalkComponents/timeUtils"

export default function HistoryScreen() {
    const { token } = useAuthStore();
    const { walks, page, totalPages, isLoadingMore, refreshing, getWalks, deleteWalk } = useWalkStore()

    const { lang } = useSettingsStore();
    const t = HistoryText[lang];

    const handleDeleteWalk = (id) => {
        Alert.alert(
            t.deleteTitle,
            t.deleteMessage,
            [
                { text: t.deleteCancel, style: "cancel" },
                {
                    text: t.deleteConfirm,
                    style: "destructive",
                    onPress: async () => {
                        const result = await deleteWalk(id, token);
                        if (!result.success) Alert.alert("Error", result.error);
                        else fetchData();
                    }
                }
            ]
        );

    };


    const handleRefresh = async () => {
        await fetchData();
    }

    const fetchData = async (pageNumber = 1, refreshing = false) => {
        const result = await getWalks(pageNumber, refreshing, token);
        if (!result.success) Alert.alert("Error", result.error);

    };


    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token]);



    const handleLoadMore = () => {
        if (!isLoadingMore && page < totalPages) {
            fetchData(page + 1);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t.historyTitle}</Text>
            <FlatList
                data={walks}
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
                    <Pressable onLongPress={() => handleDeleteWalk(item._id)}>
                        <View style={styles.bookItem}>
                            <View style={styles.mapCard}>
                                {item.path && item.path.length > 0 ? (
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
                                            strokeColor={COLORS.black}
                                            strokeWidth={3}
                                        />
                                    </MapView>
                                ) : (
                                    <View style={[styles.map, { justifyContent: 'center', alignItems: 'center' }]}>
                                        <Text style={{ color: COLORS.gray }}>{t.noPath}</Text>
                                    </View>
                                )}
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
                                        keyExtractor={(dog, index) => dog?._id?.toString() || `dog-${index}`}
                                        renderItem={({ item: dog }) => (
                                            <View style={styles.dogContainer}>
                                                <Image
                                                    source={dog.dogImage ? { uri: dog.dogImage } : noDog}
                                                    style={styles.dogImage} />
                                            </View>
                                        )}
                                        showsHorizontalScrollIndicator={false} />
                                </View>
                            </View>
                        </View>
                    </Pressable>
                )} />
        </View>
    );
}


