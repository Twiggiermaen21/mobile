import React, { useRef, useState, useEffect } from 'react';
import { View, Alert, TouchableOpacity, Text, KeyboardAvoidingView, Image, Modal, FlatList, Pressable, RefreshControl } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { useAuthStore } from '@/store/authStore';
import MapView, { Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from '@/assets/styles/map.styles';
import COLORS from "../../constants/colorsApp";
import noDog from "../../assets/ImagesPetWalk/noDog.jpeg";
import { useDogStore } from "@/store/dogStore"
import IndexText from "@/constants/IndexText";
import { useSettingsStore } from '@/store/settingStore';
import { useWalkStore } from "@/store/walkStore"
import formatTime from "@/components/PetWalkComponents/timeUtils"
import haversineDistance from "@/components/PetWalkComponents/haversineDistance"
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { openNativeCamera } from "@/constants/camera"
export default function Index() {
    const [refreshing, setRefreshing] = useState(false);
    const [isTracking, setIsTracking] = useState(false);
    const [location, setLocation] = useState(null);
    const [path, setPath] = useState([]);
    const [distance, setDistance] = useState(0);
    const [dog, setDog] = useState([]);
    const [currentSpeed, setCurrentSpeed] = useState(0);
    const [averageSpeed, setAverageSpeed] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isDogModalVisible, setIsDogModalVisible] = useState(false);
    const { token } = useAuthStore();
    const [selectedDogIds, setSelectedDogIds] = useState([]);
    const [isPaused, setIsPaused] = useState(false);
    const { dogsFromDB, getDogs } = useDogStore()
    const router = useRouter();
    const { saveWalk } = useWalkStore()
    const { lang } = useSettingsStore();
    const t = IndexText[lang];

    const mapRef = useRef(null);
    const watchSubscription = useRef(null);
    const timerRef = useRef(null);

    const fetchData = async () => {
        const result = await getDogs(token);
        if (!result.success) Alert.alert("Error", result.error);
    };


    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token]);


    const requestPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'You need to allow location access.');
            return false;
        }
        return true;
    };

    const startTracking = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;

        setIsTracking(true);
        setDistance(0);
        setTimeElapsed(0);
        setPath([]);
        setCurrentSpeed(0);
        setAverageSpeed(0);

        const subscription = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.Highest,
                timeInterval: 3000,
                distanceInterval: 5,
            },
            (loc) => {
                const { latitude, longitude, speed } = loc.coords;
                const newLoc = { latitude, longitude };
                setLocation(newLoc);

                setPath(prev => {
                    const updated = [...prev, newLoc];
                    if (updated.length > 1) {
                        const last = updated[updated.length - 2];
                        const segment = haversineDistance(last, newLoc);
                        setDistance(d => d + segment);
                    }
                    return updated;
                });

                if (speed != null) {
                    setCurrentSpeed((speed * 3.6).toFixed(2));
                }

                if (mapRef.current) {
                    mapRef.current.animateToRegion({
                        ...newLoc,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    });
                }
            }
        );

        watchSubscription.current = subscription;
    };

    const stopTracking = () => {

        savePath();

        if (watchSubscription.current) {
            watchSubscription.current.remove();
            watchSubscription.current = null;
        }

        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        setIsTracking(false);
        setPath([]);
        setDistance(0);
        setTimeElapsed(0);
        setCurrentSpeed(0);
        setAverageSpeed(0);
        setSelectedDogIds([]);
        setIsPaused(false);

    };
    const togglePause = () => {
        setIsPaused(prev => !prev);
    };

    const savePath = async () => {
        const result = await saveWalk(token, timeElapsed, averageSpeed, distance, path, selectedDogIds,);
        if (!result.success) Alert.alert("Error", result.error);
        else Alert.alert("Sukces", "Spacer został zapisany!");

    };

    useEffect(() => {
        if (distance > 0 && timeElapsed > 0) {
            const avg = distance / (timeElapsed / 3600);
            setAverageSpeed(avg.toFixed(2));
        };
        if (isTracking && !isPaused) {
            timerRef.current = setInterval(() => {
                setTimeElapsed(prev => prev + 1);
            }, 1000);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [distance, timeElapsed, isTracking, isPaused]);


    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }



    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
            <View style={styles.container}>
                <View style={styles.mapCard}>
                    <Pressable
                        // onPress={() => router.push('/(notabs)/camera')}
                        onPress={async () => {
                            const photoUri = await openNativeCamera();
                            if (photoUri) {
                                console.log('Zrobione zdjęcie:', photoUri);
                                // możesz tu wysłać do Firebase, Supabase itp.
                            }
                        }}
                        style={({ pressed }) => [
                            styles.cameraButton,
                            { backgroundColor: pressed ? '#e0e0e0' : 'white' }, // Szare po naciśnięciu
                        ]}>
                        <View style={styles.iconBackground}>
                            <Ionicons name="camera" size={24} color="#777" />
                        </View>
                    </Pressable>
                    <MapView
                        style={styles.map}
                        ref={mapRef}
                        initialRegion={{
                            latitude: location?.latitude || 37.78825,
                            longitude: location?.longitude || -122.4324,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        scrollEnabled={false}
                        zoomEnabled={false}
                        rotateEnabled={false}
                        pitchEnabled={false}
                    >
                        {path.length > 1 && (
                            <Polyline
                                coordinates={path}
                                strokeColor="#1E90FF"
                                strokeWidth={4}
                            />
                        )}
                    </MapView>
                </View>

                <View style={styles.card}>
                    <View style={styles.header}>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>{t.time}</Text>
                            <Text style={styles.info}>{formatTime(timeElapsed)}</Text>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>{t.speed}</Text>
                            <Text style={styles.info}>{currentSpeed} km/h</Text>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>{t.distance}</Text>
                            <Text style={styles.info}>{distance.toFixed(2)} km</Text>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        {selectedDogIds.length > 0 ? (
                            <View style={styles.selectedDogsContainer}>
                                <FlatList
                                    horizontal
                                    data={dogsFromDB.filter(dogsFromDB => selectedDogIds.includes(dogsFromDB._id))}
                                    keyExtractor={(item) => item._id?.toString()}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.dogsListContent}
                                    renderItem={({ item }) => (
                                        <View style={styles.dogItem}>
                                            <Image
                                                source={item.dogImage ? { uri: item.dogImage } : noDog}
                                                style={styles.dogImage}
                                            />
                                            <Text style={styles.dogName}>{item.name}</Text>
                                        </View>
                                    )}
                                />
                                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                    <TouchableOpacity
                                        style={[styles.button, { marginHorizontal: 10, backgroundColor: isPaused ? '#90ee90' : '#FFD700' }]}
                                        onPress={togglePause}
                                    >
                                        <Text style={styles.buttonText}>
                                            {isPaused ? (t.resume) : (t.pause)}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.button, { backgroundColor: '#FF6347' }]}
                                        onPress={stopTracking}
                                    >
                                        <Text style={styles.buttonText}>{t.endWalk}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <View >
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => setIsDogModalVisible(true)}
                                >
                                    <Text style={styles.buttonText}>{t.startWalkPrompt}</Text>

                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>

                <Modal
                    visible={isDogModalVisible}
                    animationType="slide"
                    transparent={true}
                >
                    <TouchableWithoutFeedback
                        onPress={() => {
                            if (selectedDogIds.length === 0) {
                                setIsDogModalVisible(false);
                            }
                        }}
                    >
                        <View style={styles.ModalAroundBox}>
                            <TouchableWithoutFeedback onPress={() => { }}>
                                <View style={styles.ModalBox}>
                                    <Text style={styles.title}>{t.selectDog}</Text>
                                    <FlatList
                                        data={dogsFromDB}
                                        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={refreshing}
                                                onRefresh={handleRefresh}
                                                colors={[COLORS.primary]}
                                            />
                                        }
                                        renderItem={({ item }) => {
                                            const isSelected = selectedDogIds.includes(item._id);

                                            return (
                                                <Pressable
                                                    style={[
                                                        styles.pressableDogs,
                                                        { backgroundColor: isSelected ? '#d0f0d0' : '#f0f0f0' }
                                                    ]}
                                                    onPress={() => {
                                                        setSelectedDogIds(prevSelected => {
                                                            const isSelected = prevSelected.includes(item._id);
                                                            const updatedSelection = isSelected
                                                                ? prevSelected.filter(id => id !== item._id)
                                                                : [...prevSelected, item._id];

                                                            return updatedSelection;
                                                        });
                                                    }}
                                                >
                                                    <Text style={[styles.info, { fontSize: 16 }]}>{item.name}</Text>
                                                    <Text style={{ fontSize: 18, color: isSelected ? 'green' : '#ccc' }}>
                                                        {isSelected ? '✓' : '○'}
                                                    </Text>
                                                </Pressable>
                                            );
                                        }}
                                    />

                                    <View style={styles.buttonDone}>
                                        <TouchableOpacity
                                            onPress={async () => {
                                                if (selectedDogIds.length === 0) {
                                                    return;
                                                }
                                                const selectedDogs = dog.filter(d => selectedDogIds.includes(d.id));
                                                setDog(selectedDogs);
                                                setIsDogModalVisible(false);
                                                await startTracking();
                                            }}
                                            style={[styles.button, selectedDogIds.length === 0 && styles.buttonDisabled]}
                                            disabled={selectedDogIds.length === 0}
                                        >
                                            <Text style={styles.buttonText}>{t.done}</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View >
        </KeyboardAvoidingView >
    );
}
