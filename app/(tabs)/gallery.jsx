
import React, { useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, Alert, RefreshControl } from 'react-native';
import { usePhotoStore } from "@/store/photoStore"
import { useAuthStore } from '@/store/authStore';
import COLORS from '@/constants/colorsApp';
export default function GalleryScreen() {

    const { token } = useAuthStore();
    const { photos, page, totalPages, isLoadingMore, refreshing, getPhotos } = usePhotoStore();

    const fetchData = async (pageNumber = 1, refreshing = false) => {
        const result = await getPhotos(pageNumber, refreshing, token);
        if (!result.success) Alert.alert("Error", result.error);
        console.log(photos);
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
    const handleRefresh = async () => {
        await fetchData();
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={photos}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[COLORS.primary]} />}
                onEndReached={handleLoadMore}
                numColumns={3}
                renderItem={({ item }) => (
                    <Image source={{ uri: item.photo }} style={styles.image} />
                )}
            />
        </View>
    );
};
const windowWidth = Dimensions.get('window').width;
const imageSize = windowWidth / 3;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: imageSize,
        height: imageSize,
        borderWidth: 1,
        borderColor: '#eee',
    },
});
