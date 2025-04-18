import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Alert,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    Image,
    Platform,
    Modal,
    FlatList,
    Pressable, RefreshControl
} from 'react-native';
import { CheckBox } from 'react-native';
import { useAuthStore } from '@/store/authStore';
import MapView, { Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from '@/assets/styles/map.styles';
import { API_URL } from '@/constants/api';
import COLORS from "../../constants/colorsApp";
export default function Index() {
    const [refreshing, setRefreshing] = useState(false);
    const [dogs, setDogs] = useState([]);
    const [isTracking, setIsTracking] = useState(false);
    const [location, setLocation] = useState(null);
    const [path, setPath] = useState([]);
    const [distance, setDistance] = useState(0);
    const [currentSpeed, setCurrentSpeed] = useState(0);
    const [averageSpeed, setAverageSpeed] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isDogModalVisible, setIsDogModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dog, setDog] = useState([]);
    const { token } = useAuthStore();
    const [selectedDogIds, setSelectedDogIds] = useState([]);
    const fetchData = async () => {
        try {
            setIsLoading(true);

            const response = await fetch(`${API_URL}/dogs/get-dog`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch dogs");

            setDogs(data.dogs);
        } catch (error) {
            console.error("Error fetching data:", error);
            Alert.alert("Error", "Failed to load profile data. Pulldown to refresh.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const mapRef = useRef(null);
    const watchSubscription = useRef(null);
    const timerRef = useRef(null);

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

        timerRef.current = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);

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
                    setCurrentSpeed((speed * 3.6).toFixed(2)); // m/s -> km/h
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
    };

    useEffect(() => {
        return () => stopTracking();
    }, []);

    useEffect(() => {
        if (distance > 0 && timeElapsed > 0) {
            const avg = distance / (timeElapsed / 3600); // km/h
            setAverageSpeed(avg.toFixed(2));
        }
    }, [distance, timeElapsed]);

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

    const haversineDistance = (coord1, coord2) => {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371; // km

        const dLat = toRad(coord2.latitude - coord1.latitude);
        const dLon = toRad(coord2.longitude - coord1.longitude);
        const lat1 = toRad(coord1.latitude);
        const lat2 = toRad(coord2.latitude);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };
    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
            <View style={styles.container}>
                <View style={[styles.mapCard, { flex: 1, padding: 0, overflow: 'hidden' }]}>
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
                            <Text style={styles.label}>Time</Text>
                            <Text style={styles.info}>{formatTime(timeElapsed)}</Text>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Speed</Text>
                            <Text style={styles.info}>{currentSpeed} km/h</Text>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Distance</Text>
                            <Text style={styles.info}>{distance.toFixed(2)} km</Text>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        {dog.length > 0 ? (
                            <View style={{ alignItems: 'center' }}>

                                <Text style={{ marginBottom: 10 }}>Wybrane psy:</Text>
                                <FlatList
                                    data={dog}
                                    keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
                                    renderItem={({ item }) => (
                                        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                    )}
                                />
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={isTracking ? stopTracking : startTracking}
                                >
                                    <Text style={styles.buttonText}>
                                        {isTracking ? '⏹ Zakończ spacer' : `▶️ Zacznij spacer`}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View >
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => setIsDogModalVisible(true)}
                                >
                                    <Text style={styles.buttonText}>🐶 Wybierz psa, ruszamy na spacer!</Text>

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
                    <View style={styles.ModalAroundBox}>
                        <View style={styles.ModalBox}>
                            <Text style={styles.title}>Wybierz psa</Text>
                            <FlatList
                                data={dogs}
                                keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
                                renderItem={({ item }) => {
                                    const isSelected = selectedDogIds.includes(item.id);

                                    return (
                                        <Pressable
                                            style={{
                                                paddingVertical: 10,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                            onPress={() => {
                                                setSelectedDogIds(prev => {
                                                    if (prev.includes(item.id)) {
                                                        return prev.filter(id => id !== item.id);
                                                    } else {
                                                        return [...prev, item.id];
                                                    }
                                                });
                                            }}
                                        >
                                            <Text style={[styles.info, { backgroundColor: '#f0f0f0', paddingHorizontal: 10 }]}>
                                                {item.name}
                                            </Text>
                                            {isSelected && (
                                                <Text style={{ fontSize: 16, color: 'green' }}>✓</Text>
                                            )}
                                        </Pressable>
                                    );
                                }}
                            />
                            <View style={{
                                marginTop: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <TouchableOpacity onPress={() => setIsDogModalVisible(false)} style={styles.button} >
                                    <Text style={styles.buttonText}>Gotowe</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View >
        </KeyboardAvoidingView >
    );
}
