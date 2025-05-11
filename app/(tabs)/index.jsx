import React, { useRef, useState, useEffect } from 'react';
import { View, Alert, TouchableOpacity, Text, KeyboardAvoidingView, Image, FlatList } from 'react-native';
import { useAuthStore } from '@/store/authStore';
import * as Location from 'expo-location';
import styles from '@/assets/styles/map.styles';
import texture from "../../constants/colorsApp";
import noDog from "../../assets/ImagesPetWalk/noDog.jpeg";
import { useDogStore } from "@/store/dogStore"
import IndexText from "@/assets/lang/Index.text";
import { useSettingsStore } from '@/store/settingStore';
import { useWalkStore } from "@/store/walkStore"
import { usePhotoStore } from "@/store/photoStore"
import { openNativeCamera } from "@/constants/camera"
import * as TaskManager from 'expo-task-manager';
import MapIndex from '@/components/PetWalkComponents/MapIndex';
import DogSelectionModal from '@/components/PetWalkComponents/DogSelectionModal';
import CameraIndex from '@/components/PetWalkComponents/CameraIndex';
import calculateTotalDistance from '@/constants/haversineDistance';
import HeaderIndexPanel from '@/components/PetWalkComponents/HeaderIndexPanel';
import { savePathToStorage, getPathFromStorage, clearPathStorage } from '@/store/locationStore';

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
    const { token, user } = useAuthStore();
    const [selectedDogIds, setSelectedDogIds] = useState([]);
    const [isPaused, setIsPaused] = useState(false);
    const { dogsFromDB, getDogs } = useDogStore()
    const { saveWalk, } = useWalkStore();
    const { uploadImage } = usePhotoStore();
    const { lang, color } = useSettingsStore();
    const t = IndexText[lang];
    const COLORS = texture[color];
    const dynamicStyles = styles(COLORS);
    const mapRef = useRef(null);
    const timeStartRef = useRef(null);
    const timeIntervalRef = useRef(null);
    TaskManager.defineTask("location-tracking", async ({ data, error }) => {
        if (error) {
            console.error("Background task error:", error);
            return;
        }

        if (data) {
            const { locations } = data;
            const loc = locations[0];

            if (loc) {
                const { latitude, longitude, speed } = loc.coords;
                const newLoc = { latitude, longitude };
                setLocation(newLoc);
                try {
                    const currentPath = await getPathFromStorage();
                    const updatedPath = [...currentPath, newLoc];
                    await savePathToStorage(updatedPath);

                } catch (e) {
                    console.error('Error updating path:', e);
                }

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

                const avg = distance / (timeElapsed / 3600);
                if (!isNaN(avg) && isFinite(avg)) {
                    setAverageSpeed(avg.toFixed(2));
                } else {
                    setAverageSpeed(0);
                }

            }
        }
    });


    useEffect(() => {
        const loadPath = async () => {
            const savedPath = await getPathFromStorage();
            setPath(savedPath);
            setDistance(calculateTotalDistance(savedPath));
        };
        loadPath();
    });


    useEffect(() => {
        if (token) {
            fetchData();
        }
        return () => {
            if (timeIntervalRef.current) {
                clearInterval(timeIntervalRef.current);
            }
        };
    }, [token]);



    const startBackgroundUpdates = async () => {
        try {
            const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
            const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();

            if (foregroundStatus !== 'granted' || backgroundStatus !== 'granted') {
                console.log('Location permissions not granted');
                return;
            }

            const hasStarted = await Location.hasStartedLocationUpdatesAsync("location-tracking");
            if (!hasStarted) {
                await Location.startLocationUpdatesAsync("location-tracking", {
                    accuracy: Location.Accuracy.Highest,
                    timeInterval: 3000,
                    distanceInterval: 1,
                    showsBackgroundLocationIndicator: true,
                    foregroundService: {
                        notificationTitle: 'Spacer trwa 🐾',
                        notificationBody: 'Śledzimy Twój spacer w tle!',
                    },
                });
            }
            console.log('Background location updates started');
        } catch (e) {
            console.error("Error starting background updates:", e);
        }
    };

    const startTracking = async () => {

        setIsTracking(true);
        setTimeElapsed(0);
        setDistance(0);
        startBackgroundUpdates();

        timeStartRef.current = Date.now();
        timeIntervalFunction();

    };
    const stopTracking = async () => {
        setIsTracking(false);
        await savePath();
        setPath([]);
        setCurrentSpeed(0);
        setTimeElapsed(0);
        await clearPathStorage();
        if (timeIntervalRef.current) {
            clearInterval(timeIntervalRef.current);
        }

        const hasStarted = await Location.hasStartedLocationUpdatesAsync("location-tracking");
        if (hasStarted) {
            await Location.stopLocationUpdatesAsync("location-tracking");
        }
    };

    const timeIntervalFunction = async () => {

        timeIntervalRef.current = setInterval(() => {
            const elapsedMs = Date.now() - timeStartRef.current;
            setTimeElapsed(Math.floor(elapsedMs / 1000));
        }, 1000);
    };

    const togglePause = () => {
        setIsPaused(prev => !prev);
        if (!isPaused) {
            if (timeIntervalRef.current) {
                clearInterval(timeIntervalRef.current);
                timeIntervalRef.current = null;
            }
        } else {
            timeStartRef.current = Date.now() - timeElapsed * 1000;
            timeIntervalFunction();
        }
    }
    const savePath = async () => {
        const result = await saveWalk(token, timeElapsed, averageSpeed, distance, path, selectedDogIds,);
        if (!result.success) Alert.alert("Error", result.error);
        else Alert.alert("Sukces", "Spacer został zapisany!");

    };
    const fetchData = async () => {
        const result = await getDogs(token);
        if (!result.success) Alert.alert("Error", result.error);
    };

    const savePhoto = async (res) => {
        const result = await uploadImage(token, res, user);
        if (!result.success) Alert.alert("Error", result.error);
        else Alert.alert("Sukces", "Zdjecie zostało zapisane!");
    }

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
            <View style={dynamicStyles.container}>
                <View style={dynamicStyles.mapCard}>
                    {isTracking ? (
                        <CameraIndex
                            savePhoto={savePhoto}
                            openNativeCamera={openNativeCamera} />
                    ) : null}
                    <MapIndex mapRef={mapRef} path={path} location={location} />
                </View>
                <View style={dynamicStyles.card}>
                    <HeaderIndexPanel currentSpeed={currentSpeed} distance={distance} timeElapsed={timeElapsed} />
                    <View style={dynamicStyles.footer}>
                        {isTracking && selectedDogIds.length > 0 ? (
                            <View style={dynamicStyles.selectedDogsContainer}>
                                <FlatList
                                    horizontal
                                    data={dogsFromDB.filter(dogsFromDB => selectedDogIds.includes(dogsFromDB._id))}
                                    keyExtractor={(item) => item._id?.toString()}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={dynamicStyles.dogsListContent}
                                    renderItem={({ item }) => (
                                        <View style={dynamicStyles.dogItem}>
                                            <Image
                                                source={item.dogImage ? { uri: item.dogImage } : noDog}
                                                style={dynamicStyles.dogImage}
                                            />
                                            <Text style={dynamicStyles.dogName}>{item.name}</Text>
                                        </View>
                                    )}
                                />
                                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                    <TouchableOpacity
                                        style={[dynamicStyles.button, { marginHorizontal: 10, backgroundColor: isPaused ? '#90ee90' : '#FFD700' }]}
                                        onPress={togglePause}
                                    >
                                        <Text style={dynamicStyles.buttonText}>
                                            {isPaused ? (t.resume) : (t.pause)}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[dynamicStyles.button, { backgroundColor: '#FF6347' }]}
                                        onPress={async () => { stopTracking() }}
                                    >
                                        <Text style={dynamicStyles.buttonText}>{t.endWalk}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <View >
                                <TouchableOpacity
                                    style={dynamicStyles.button}
                                    onPress={() => setIsDogModalVisible(true)} >
                                    <Text style={dynamicStyles.buttonText}>{t.startWalkPrompt}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
                <DogSelectionModal
                    isDogModalVisible={isDogModalVisible}
                    setIsDogModalVisible={setIsDogModalVisible}
                    dogsFromDB={dogsFromDB}
                    selectedDogIds={selectedDogIds}
                    setSelectedDogIds={setSelectedDogIds}
                    refreshing={refreshing}
                    handleRefresh={handleRefresh}
                    startTracking={startTracking}
                    setDog={setDog}
                />
            </View >
        </KeyboardAvoidingView >
    );
}
