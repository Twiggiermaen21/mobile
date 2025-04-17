import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, KeyboardAvoidingView, Image, Platform } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from '@/assets/styles/map.styles';
import { API_URL } from "../../constants/api";
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';

export default function Index() {
    const [dog, setDog] = useState(null); // możesz zmienić logikę wczytywania psa
    const [isTracking, setIsTracking] = useState(false);
    const [location, setLocation] = useState(null);
    const [path, setPath] = useState([]);
    const watchSubscription = useRef(null);
    const mapRef = useRef(null);

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
        const subscription = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.Highest,
                timeInterval: 3000,
                distanceInterval: 5,
            },
            (loc) => {
                const { latitude, longitude } = loc.coords;
                const newLoc = { latitude, longitude };
                setLocation(newLoc);
                setPath(prev => [...prev, newLoc]);

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
        setIsTracking(false);
    };

    useEffect(() => {
        return () => {
            stopTracking();
        };
    }, []);

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
                            <Text style={styles.info}>--:--</Text>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Speed</Text>
                            <Text style={styles.info}>-- km/h</Text>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Distance</Text>
                            <Text style={styles.info}>-- km</Text>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        {!dog ? (
                            <View>
                                <Image style={styles.img} source={require("../../assets/ImagesPetWalk/dogimg.jpg")} />
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={isTracking ? stopTracking : startTracking}
                                >
                                    <Text style={styles.buttonText}>
                                        {isTracking ? '⏹ Stop Tracking' : '▶️ Start Tracking'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <Text>elo</Text>
                        )}
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
