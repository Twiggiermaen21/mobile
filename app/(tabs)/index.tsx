import React, { Component } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import MapView, { Region, Polyline, LatLng } from 'react-native-maps';
import * as Location from 'expo-location';

interface State {
  region: Region;
  path: LatLng[];
  isTracking: boolean;
  startTime: number | null; // Time when tracking starts
  speed: number;            // Current speed
  elevationGain: number;    // Elevation gain
  timeElapsed: number;      // Time elapsed since tracking started
}

export default class map extends Component<{}, State> {
  watchSubscription: Location.LocationSubscription | null = null;
  timeInterval: NodeJS.Timeout | null = null; // To store the interval reference

  constructor(props: {}) {
    super(props);
    this.state = {
      region: {
        latitude: 0, // Default values until location is found
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      path: [],
      isTracking: false,
      startTime: null,
      speed: 0,
      elevationGain: 0,
      timeElapsed: 0, // Initially, no time elapsed
    };
  }

  async componentDidMount() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Cannot access location');
      return;
    }
    // Get the current location when the component is mounted
    this.getLocation();
  }

  getLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      this.setState({
        region: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
      });
    } catch (error) {
      Alert.alert('Error', 'Could not fetch location');
    }
  };

  startTracking = async () => {
    if (this.state.isTracking) {
      // stop tracking
      this.watchSubscription?.remove();
      this.watchSubscription = null;
      if (this.timeInterval) clearInterval(this.timeInterval); // Stop the interval
      this.setState({ isTracking: false });
      return;
    }

    // start tracking
    this.setState({
      path: [],
      isTracking: true,
      startTime: Date.now(),
      speed: 0,
      elevationGain: 0,
      timeElapsed: 0,
    });

    // Start the interval to update elapsed time
    this.timeInterval = setInterval(() => {
      // Check if startTime is not null before calculating elapsed time
      if (this.state.startTime) {
        this.setState(prevState => {
          if (prevState.startTime != null) {
            // Calculate elapsed time if startTime is not null
            return { timeElapsed: Math.floor((Date.now() - prevState.startTime) / 1000) };
          } else {
            // If startTime is null, handle accordingly (e.g., set timeElapsed to 0 or any other fallback behavior)
            return { timeElapsed: 0 }; // or any fallback value you want
          }
        });

      }
    }, 1000);

    this.watchSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 5,
      },
      (location) => {
        const newCoord = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        const newPath = [...this.state.path, newCoord];

        let elevationGain = this.state.elevationGain;
        if (this.state.path.length > 0) {
          const prevCoord = this.state.path[this.state.path.length - 1];
          const elevationDiff = location.coords.altitude ? location.coords.altitude - (prevCoord.latitude || 0) : 0;
          if (elevationDiff > 0) {
            elevationGain += elevationDiff;  // Adding only the positive elevation difference
          }
        }

        const speed = location.coords.speed ? location.coords.speed * 3.6 : 0; // Speed in km/h

        this.setState({
          region: {
            ...this.state.region,
            latitude: newCoord.latitude,
            longitude: newCoord.longitude,
          },
          path: newPath,
          speed,
          elevationGain,
        });
      }
    );
  };

  getTimeElapsed = () => {
    const seconds = this.state.timeElapsed % 60;
    const minutes = Math.floor(this.state.timeElapsed / 60) % 60;
    const hours = Math.floor(this.state.timeElapsed / 3600);
    return `${hours}:${minutes}:${seconds}`;
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          {this.state.path.length > 1 && (
            <Polyline
              coordinates={this.state.path}
              strokeColor="#1E90FF"
              strokeWidth={4}
            />
          )}

          <Polyline
            coordinates={[
              { latitude: 49.991408, longitude: 18.876801 },
              { latitude: 49.989145, longitude: 18.877015 },

            ]}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              '#7F0000',
              '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
              '#B24112',
              '#E5845C',
              '#238C23',
              '#7F0000',
            ]}
            strokeWidth={6}
          />



        </MapView>

        <View style={styles.menu}>
          <TouchableOpacity style={styles.button} onPress={this.startTracking}>
            <Text style={styles.buttonText}>
              {this.state.isTracking ? '⏹ Stop' : '▶️ Start Tracking'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.statusText}>
            <Text style={styles.boldText}>Time: </Text>{this.getTimeElapsed()}
          </Text>
          <Text style={styles.statusText}>
            <Text style={styles.boldText}>Speed: </Text>{this.state.speed.toFixed(2)} km/h
          </Text>
          <Text style={styles.statusText}>
            <Text style={styles.boldText}>Distance: </Text>{(this.state.path.length * 5).toFixed(2)} meters
          </Text>
          <Text style={styles.statusText}>
            <Text style={styles.boldText}>Elevation Gain: </Text>{this.state.elevationGain.toFixed(2)} m
          </Text>
        </View>
      </View>
    );
  }

  componentWillUnmount() {
    // Clean up the subscription and interval when the component unmounts
    this.watchSubscription?.remove();
    if (this.timeInterval) clearInterval(this.timeInterval);
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
});
