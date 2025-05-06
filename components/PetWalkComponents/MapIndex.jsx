
import React from 'react'
import MapView, { Polyline } from 'react-native-maps';
import styles from '@/assets/styles/map.styles'
import texture from '@/constants/colorsApp'
import { useSettingsStore } from '@/store/settingStore'

export default function MapIndex({ mapRef, path, location }) {
    const { color } = useSettingsStore();
    const COLORS = texture[color];
    const dynamicStyles = styles(COLORS);
    return (
        <MapView
            style={dynamicStyles.map}
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
    )

}