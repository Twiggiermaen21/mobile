import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    Image,

    Alert,
    RefreshControl,
    Text,
    Modal,
    Pressable,
    TouchableOpacity
} from 'react-native';
import { usePhotoStore } from "@/store/photoStore"
import { useAuthStore } from '@/store/authStore';
import COLORS from '@/constants/colorsApp';
import styles from '@/assets/styles/gallery.styles';
export default function GalleryScreen() {

    const { token } = useAuthStore();
    const { photos, page, totalPages, isLoadingMore, refreshing, getPhotos } = usePhotoStore();
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const fetchData = async (pageNumber = 1, refreshing = false) => {
        const result = await getPhotos(pageNumber, refreshing, token);
        if (!result.success) Alert.alert("Error", result.error);
        // console.log(photos);
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
    const handlePhotoPress = (photoUri) => {
        setSelectedPhoto(photoUri);
        setModalVisible(true);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Galeria</Text>

            {photos && photos.length > 0 ? (
                <FlatList
                    data={photos}
                    keyExtractor={item => item._id}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            colors={[COLORS.primary]}
                        />
                    }
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={isLoadingMore ? <Text style={styles.loading}>Ładowanie..</Text> : null}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handlePhotoPress(item.photo)}>
                            <Image source={{ uri: item.photo }} style={styles.image} />
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <View style={styles.noPhotosContainer}>
                    <Text style={styles.noPhotosText}>Brak zdjęć do wyświetlenia</Text>
                </View>
            )}

            <Modal visible={modalVisible} transparent={true} animationType="fade">
                <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
                    <Image source={{ uri: selectedPhoto }} style={styles.fullImage} resizeMode="contain" />
                </Pressable>
            </Modal>
        </View>
    );
};

