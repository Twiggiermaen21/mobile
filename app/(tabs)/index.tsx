import React, { Component } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import MapView, { Region, Marker, Polyline, LatLng } from 'react-native-maps';
import * as Location from 'expo-location';

interface State {
  region: Region;
  path: LatLng[];
  isTracking: boolean;
}

export default class map extends Component<{}, State> {
  watchSubscription: Location.LocationSubscription | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      region: {
        latitude: 0, // Domyślnie ustawiamy na wartości 0,0
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      path: [],
      isTracking: false,
    };
  }

  async componentDidMount() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Cannot access location');
      return;
    }

    // Po uzyskaniu uprawnień próbujemy pobrać lokalizację
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
      this.setState({ isTracking: false });
      return;
    }

    // start tracking
    this.setState({ path: [], isTracking: true });

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

        this.setState((prevState) => ({
          region: {
            ...prevState.region,
            latitude: newCoord.latitude,
            longitude: newCoord.longitude,
          },
          path: [...prevState.path, newCoord],
        }));
      }
    );
  };

  onRegionChange = (region: Region) => {
    this.setState({ region });
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={false}
          onRegionChange={this.onRegionChange}
          zoomControlEnabled={false}
          zoomEnabled={false}
        >
          {this.state.path.length > 1 && (
            <Polyline
              coordinates={this.state.path}
              strokeColor="#1E90FF"
              strokeWidth={4}
            />
          )}
        </MapView>
        <View style={styles.menu} >
          <TouchableOpacity style={styles.button} onPress={this.startTracking}>
            <Text style={styles.buttonText}>
              {this.state.isTracking ? '⏹ Stop' : '▶️ Track'}
            </Text>
          </TouchableOpacity>
        </View>


      </View>
    );
  }

  componentWillUnmount() {
    this.watchSubscription?.remove();
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
    position: 'relative',
    bottom: 50,  // Ustawia menu na dole ekranu
    left: 0,    // Ustawia lewy brzeg menu na 0 (pełna szerokość)
    right: 0,   // Ustawia prawy brzeg menu na 0 (pełna szerokość)
    paddingBottom: 20,  // Dodaje przestrzeń od dołu ekranu
    justifyContent: 'center', // Centruje elementy w pionie
    alignItems: 'center',     // Centruje elementy w poziomie
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Opcjonalne tło
    zIndex: 1,
  },
  button: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
