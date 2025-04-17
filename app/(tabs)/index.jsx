import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, KeyboardAvoidingView, Image } from 'react-native';
import MapView, { Region, Polyline, LatLng } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from '@/assets/styles/map.styles'
import { API_URL } from "../../constants/api"
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';
export default function index() {
    const [dog, setDog] = useState();
    const [region, setRegion] = useState();
    const [isTracking, setIsTracking] = useState(false);
    const [path, setPath] = useState([]);
    const [location, setLocation] = useState(null);
    const watchId = useRef(null);
    const mapRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [pausedTime, setPausedTime] = useState(null);
    const [speed, setSpeed] = useState(0);
    const [averageSpeed, setAverageSpeed] = useState(0);
    const [elevationGain, setElevationGain] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [distance, setDistance] = useState(0);
    const [speeds, setSpeeds] = useState([]);

    const watchSubscription = Location.LocationSubscription;


    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };

    const startTracking = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;

        watchId.current = Geolocation.watchPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const newLocation = { latitude, longitude };
                setLocation(newLocation);
                if (mapRef.current) {
                    mapRef.current.animateToRegion({
                        ...newLocation,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    });
                }
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                distanceFilter: 10,
                interval: 5000,
                fastestInterval: 2000,
            }
        );
    };

    const stopTracking = () => {
        if (watchId.current !== null) {
            Geolocation.clearWatch(watchId.current);
        }
    };

    useEffect(() => {
        return () => {
            stopTracking();
        };
    }, []);



    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
            <View style={styles.container}>

                {/* Środkowa karta z mapą */}
                <View style={[styles.mapCard, { flex: 1, padding: 0, overflow: 'hidden' }]}>
                    <MapView
                        style={styles.map}
                        ref={mapRef}
                        // region={region}
                        initialRegion={{
                            latitude: location?.latitude || 37.78825,
                            longitude: location?.longitude || -122.4324,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        showsUserLocation={true}
                        followsUserLocation={true}
                    >
                        {/* {this.state.path.length > 1 && (
                            <Polyline
                                coordinates={this.state.path}
                                strokeColor="#1E90FF"
                                strokeWidth={4}
                            />
                        )} */}
                    </MapView>
                </View>

                {/* Górna karta z informacjami */}
                <View style={styles.card}>
                    <View style={styles.header}>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Time</Text>
                            <Text style={styles.info}>
                                {/* {this.getTimeElapsed()} */}
                            </Text>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Speed</Text>
                            <Text style={styles.info}>
                                {/* {this.state.speed.toFixed(2)} km/h */}
                            </Text>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Distance</Text>
                            <Text style={styles.info}>
                                {/* {this.state.distance.toFixed(2)} km */}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.footer}>

                        {!dog ? (<View>
                            <Image style={styles.img} source={require("../../assets/ImagesPetWalk/dogimg.jpg")} />


                            <TouchableOpacity style={styles.button} onPress={startTracking}>
                                <Text style={styles.buttonText}>▶️ Start Tracking</Text>
                            </TouchableOpacity>
                        </View>
                        ) : (<View>
                            <Text> elo</Text>
                        </View>)}



                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}