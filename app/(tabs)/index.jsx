import React, { Component, useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, KeyboardAvoidingView, Image } from 'react-native';
import MapView, { Region, Polyline, LatLng } from 'react-native-maps';
import * as Location from 'expo-location';

// import styles from '@/assets/styles/create.styles'
// import { API_URL } from "../../constants/api"
// import { useAuthStore } from '@/store/authStore';
// import { useRouter } from 'expo-router';

// interface State {
//     region: Region;
//     path: LatLng[];
//     isTracking: boolean;
//     isPaused: boolean; // Dodano flagę do pauzy
//     startTime: number | null; // Time when tracking starts
//     pausedTime: number | null; // Time when tracking is paused
//     speed: number;            // Current speed
//     averageSpeed: number;     // Average speed for the entire route
//     elevationGain: number;    // Elevation gain
//     timeElapsed: number;      // Time elapsed since tracking started
//     distance: number;         // Total distance in km
//     speeds: number[];         // Array to store speeds for average calculation
// }
// const { token } = useAuthStore();
// const [loading, setLoading] = useState(false);
// const router = useRouter();
// export default class map extends Component<{}, State> {
//     watchSubscription: Location.LocationSubscription | null = null;
//     timeInterval: NodeJS.Timeout | null = null; // To store the interval reference



//     constructor(props: {}) {
//         super(props);

//         this.state = {
//             region: {
//                 latitude: 0, // Default values until location is found
//                 longitude: 0,
//                 latitudeDelta: 0.01,
//                 longitudeDelta: 0.01,
//             },
//             path: [],
//             isTracking: false,
//             isPaused: false, // Inicjalizacja isPaused
//             startTime: null,
//             pausedTime: null, // Inicjalizacja pausedTime
//             speed: 0,
//             averageSpeed: 0,    // Initial average speed
//             elevationGain: 0,
//             timeElapsed: 0, // Initially, no time elapsed
//             distance: 0,     // Initial distance
//             speeds: [],      // Initialize the speeds array
//         };
//     }

//     // Funkcja do obliczania odległości między dwoma punktami na podstawie wzoru Haversine
//     calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
//         const R = 6371; // promień Ziemi w kilometrach
//         const dLat = (lat2 - lat1) * (Math.PI / 180);
//         const dLon = (lon2 - lon1) * (Math.PI / 180);
//         const a =
//             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//             Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
//             Math.sin(dLon / 2) * Math.sin(dLon / 2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         const distance = R * c; // Wartość w kilometrach
//         return distance;
//     };

//     async componentDidMount() {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//             Alert.alert('Permission Denied', 'Cannot access location');
//             return;
//         }
//         // Get the current location when the component is mounted
//         this.getLocation();
//     }

//     getLocation = async () => {
//         try {
//             const location = await Location.getCurrentPositionAsync({});
//             this.setState({
//                 region: {
//                     latitude: location.coords.latitude,
//                     longitude: location.coords.longitude,
//                     latitudeDelta: 0.01,
//                     longitudeDelta: 0.01,
//                 },
//             });
//         } catch (error) {
//             Alert.alert('Error', 'Could not fetch location');
//         }
//     };

//     startTracking = async () => {
//         if (this.state.isTracking) {
//             // Stop tracking (when it's already tracking)
//             this.watchSubscription?.remove();
//             this.watchSubscription = null;
//             if (this.timeInterval) clearInterval(this.timeInterval); // Stop the interval
//             this.setState({ isTracking: false });
//             return;
//         }

//         if (this.state.isPaused) {
//             // Wznawiamy po pauzie
//             this.setState({
//                 isTracking: true,
//                 isPaused: false,
//                 startTime: Date.now() - (this.state.pausedTime || 0), // Adjust start time based on paused time
//             });
//         } else {
//             // Nowe śledzenie
//             this.setState({
//                 path: [],
//                 isTracking: true,
//                 isPaused: false,
//                 startTime: Date.now(),
//                 pausedTime: null, // Resetujemy pausedTime przy nowym śledzeniu
//                 speed: 0,
//                 averageSpeed: 0,    // Reset average speed
//                 elevationGain: 0,
//                 timeElapsed: 0,
//                 distance: 0, // Resetujemy dystans przy nowym śledzeniu
//                 speeds: [],      // Reset the speeds array
//             });
//         }

//         // Start the interval to update elapsed time
//         this.timeInterval = setInterval(() => {
//             if (this.state.startTime) {
//                 this.setState(prevState => {
//                     if (prevState.startTime != null) {
//                         return { timeElapsed: Math.floor((Date.now() - prevState.startTime) / 1000) };
//                     } else {
//                         return { timeElapsed: 0 };
//                     }
//                 });
//             }
//         }, 1000);

//         this.watchSubscription = await Location.watchPositionAsync(
//             {
//                 accuracy: Location.Accuracy.High,
//                 timeInterval: 1000,
//                 distanceInterval: 5,
//             },
//             (location) => {
//                 const newCoord = {
//                     latitude: location.coords.latitude,
//                     longitude: location.coords.longitude,
//                 };

//                 const newPath = [...this.state.path, newCoord];

//                 // Calculate the distance between the last point and the current point
//                 let totalDistance = this.state.path.reduce((distance, point, index) => {
//                     if (index === 0) return distance; // skip the first point (no previous point to compare)
//                     const lastPoint = this.state.path[index - 1];
//                     return distance + this.calculateDistance(lastPoint.latitude, lastPoint.longitude, point.latitude, point.longitude);
//                 }, 0);

//                 // Update speed in km/h
//                 const speed = location.coords.speed ? location.coords.speed * 3.6 : 0; // Speed in km/h

//                 // Add speed to speeds array
//                 const speeds = [...this.state.speeds, speed];

//                 // Calculate average speed
//                 const totalSpeed = speeds.reduce((acc, curr) => acc + curr, 0);
//                 const averageSpeed = speeds.length > 0 ? totalSpeed / speeds.length : 0;

//                 this.setState({
//                     region: {
//                         ...this.state.region,
//                         latitude: newCoord.latitude,
//                         longitude: newCoord.longitude,
//                     },
//                     path: newPath,
//                     speed,
//                     speeds, // Save the updated speeds array
//                     averageSpeed, // Update average speed
//                     distance: totalDistance, // Zaktualizowana odległość
//                 });
//             }
//         );
//     };

//     pauseTracking = () => {
//         // Zatrzymanie śledzenia, zatrzymanie liczenia czasu i trasy
//         this.watchSubscription?.remove();
//         this.watchSubscription = null;

//         if (this.timeInterval) {
//             clearInterval(this.timeInterval);
//             this.timeInterval = null;
//         }

//         // Obliczanie czasu pauzy
//         const pausedDuration = Date.now() - (this.state.startTime || 0);
//         this.setState({
//             isTracking: false,
//             isPaused: true,
//             pausedTime: pausedDuration, // Zapisanie czasu pauzy
//         });
//     };

//     stopTracking = async () => {
//         // Całkowite zatrzymanie śledzenia i czyszczenie danych
//         this.watchSubscription?.remove();
//         this.watchSubscription = null;

//         if (this.timeInterval) {
//             clearInterval(this.timeInterval);
//             this.timeInterval = null;
//         }

//         try {

//             const response = await fetch(`${API_URL}/walks`, {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 }, body: JSON.stringify({


//                 })
//             })



//         } catch (error) {

//         }


//         this.setState({
//             isTracking: false,
//             isPaused: false, // Resetowanie pauzy
//             path: [],
//             startTime: null,
//             pausedTime: null, // Resetowanie czasu pauzy
//             speed: 0,
//             averageSpeed: 0,  // Reset average speed
//             elevationGain: 0,
//             timeElapsed: 0,
//             distance: 0, // Resetowanie dystansu
//             speeds: [], // Resetting speeds array
//         });
//     };

//     getTimeElapsed = () => {
//         const seconds = this.state.timeElapsed % 60;
//         const minutes = Math.floor(this.state.timeElapsed / 60) % 60;
//         const hours = Math.floor(this.state.timeElapsed / 3600);
//         return `${hours}:${minutes}:${seconds}`;
//     };

//     render() {
//         return (
//             <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
//                 <View style={styles.container}>

//                     {/* Środkowa karta z mapą */}
//                     <View style={[styles.mapCard, { flex: 1, padding: 0, overflow: 'hidden' }]}>
//                         <MapView
//                             style={styles.map}
//                             region={this.state.region}
//                             showsUserLocation={true}
//                             followsUserLocation={true}
//                         >
//                             {this.state.path.length > 1 && (
//                                 <Polyline
//                                     coordinates={this.state.path}
//                                     strokeColor="#1E90FF"
//                                     strokeWidth={4}
//                                 />
//                             )}
//                         </MapView>
//                     </View>

//                     {/* Górna karta z informacjami */}
//                     <View style={styles.card}>
//                         <View style={styles.header}>
//                             <View style={styles.formGroup}>
//                                 <Text style={styles.label}>Time</Text>
//                                 <Text style={styles.info}>{this.getTimeElapsed()}</Text>
//                             </View>
//                             <View style={styles.formGroup}>
//                                 <Text style={styles.label}>Speed</Text>
//                                 <Text style={styles.info}>{this.state.speed.toFixed(2)} km/h</Text>
//                             </View>

//                             <View style={styles.formGroup}>
//                                 <Text style={styles.label}>Distance</Text>
//                                 <Text style={styles.info}>{this.state.distance.toFixed(2)} km</Text>
//                             </View>
//                         </View>

//                         <View style={styles.footer}>
//                             <Image style={styles.img} source={require("../../assets/ImagesPetWalk/dogimg.jpg")} />

//                             {!this.state.isTracking ? (
//                                 <TouchableOpacity style={styles.button} onPress={this.startTracking}>
//                                     <Text style={styles.buttonText}>▶️ Start Tracking</Text>
//                                 </TouchableOpacity>
//                             ) : (
//                                 <View style={styles.buttonGroup}>
//                                     <TouchableOpacity style={styles.button} onPress={this.pauseTracking}>
//                                         <Text style={styles.buttonText}>⏸ Pauza</Text>
//                                     </TouchableOpacity>

//                                     <TouchableOpacity style={styles.button} onPress={this.stopTracking}>
//                                         <Text style={styles.buttonText}>⏹ Koniec</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             )}
//                         </View>
//                     </View>
//                 </View>
//             </KeyboardAvoidingView>
//         );
//     }

//     componentWillUnmount() {
//         // Clean up the subscription and interval when the component unmounts
//         this.watchSubscription?.remove();
//         if (this.timeInterval) clearInterval(this.timeInterval);
//     }
// }


export default function map() {
    return (
        <View>
            <Text>index</Text>
        </View>
    )
}
