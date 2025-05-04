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
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import GalleryText from "@/assets/lang/Gallery.text";
import { useSettingsStore } from '@/store/settingStore';
import { usePhotoStore } from "@/store/photoStore";
import { useAuthStore } from '@/store/authStore';

import styles from '@/assets/styles/gallery.styles';
import { Ionicons } from '@expo/vector-icons';
import texture from "@/constants/colorsApp";


export default function GalleryScreen() {
    const { lang, color } = useSettingsStore();
    const t = GalleryText[lang];
    const { token } = useAuthStore();
    const {
        photos,
        page,
        totalPages,
        isLoadingMore,
        refreshing,
        getPhotos,
        deletePhoto // ← upewnij się, że ta funkcja istnieje w photoStore
    } = usePhotoStore();
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const COLORS = texture[color];
    const dynamicStyles = styles(COLORS);


    const fetchData = async (pageNumber = 1, refreshing = false) => {
        const result = await getPhotos(pageNumber, refreshing, token);
        if (!result.success) Alert.alert("Error", result.error);
    };

    const handleDeletePhoto = () => {

        Alert.alert(
            t.deleteTitle,
            t.deleteMessage,
            [
                { text: t.deleteCancel, style: "cancel" },
                {
                    text: t.deleteConfirm,
                    style: "destructive",
                    onPress: async () => {
                        const result = await deletePhoto(selectedPhoto._id, token);
                        if (!result.success) Alert.alert("Error", result.error);
                        else {
                            Alert.alert(t.success, t.deletePhoto);
                            setModalVisible(false);
                            fetchData(1, true);
                        }
                    }
                }
            ]
        );
    };

    const handleDownload = async () => {

        if (!selectedPhoto) return;

        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permission denied", "You need to allow media access to save photos.");
                return;
            }

            const fileUri = FileSystem.documentDirectory + selectedPhoto._id + '.jpg';
            await FileSystem.downloadAsync(selectedPhoto.photo, fileUri);
            await MediaLibrary.createAssetAsync(fileUri);
            Alert.alert("Saved", "Photo saved to your gallery.");
        } catch (error) {
            Alert.alert("Error", "Could not save photo.");
            console.log(error);
        }
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
        await fetchData(1, true);
    };



    return (
        <View style={dynamicStyles.container}>
            <Text style={dynamicStyles.title}>{t.galleryTitle}</Text>

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
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={isLoadingMore ? <Text style={dynamicStyles.loading}>{t.loading}</Text> : null}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            setSelectedPhoto(item);

                            setModalVisible(true);
                        }}>
                            <Image source={{ uri: item.photo }} style={dynamicStyles.image} />
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <View style={dynamicStyles.noPhotosContainer}>
                    <Text style={dynamicStyles.noPhotosText}>{t.noPhoto}</Text>
                </View>
            )}

            {selectedPhoto && (
                <Modal visible={modalVisible} transparent={true} animationType="fade">
                    <View style={dynamicStyles.modalWrapper}>
                        <View style={dynamicStyles.ImageContainer}>
                            <Image
                                source={{ uri: selectedPhoto?.photo }}
                                style={dynamicStyles.fullImage}
                                resizeMode="contain"
                            />
                        </View>

                        <View style={dynamicStyles.bottomBar}>
                            <Pressable onPress={() => setModalVisible(false)}>
                                <Ionicons name="chevron-back" size={32} color={COLORS.white} />
                            </Pressable>
                            <Pressable onPress={handleDownload}>
                                <Ionicons name="download-outline" size={32} color={COLORS.white} />
                            </Pressable>
                            <Pressable onPress={handleDeletePhoto}>
                                <Ionicons name="trash-outline" size={32} color={COLORS.white} />
                            </Pressable>

                        </View>
                    </View>

                </Modal>
            )}
        </View>
    );
}
