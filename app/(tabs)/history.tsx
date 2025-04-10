import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import MapView, { Region, Polyline, LatLng } from 'react-native-maps';

const mockHistory = [
    {
        date: '2025-04-07', duration: '35 min', distance: '2.1 km',
        path: [
            { latitude: 52.2297, longitude: 21.0122 },
            { latitude: 52.2301, longitude: 21.0131 },
            { latitude: 52.2312, longitude: 21.0150 }
        ]
    },
    {
        date: '2025-04-07', duration: '35 min', distance: '2.1 km',
        path: [
            { latitude: 52.2297, longitude: 21.0122 },
            { latitude: 52.2301, longitude: 21.0131 },
            { latitude: 52.2312, longitude: 21.0150 }
        ]
    },
    {
        date: '2025-04-07', duration: '35 min', distance: '2.1 km',
        path: [
            { latitude: 52.2297, longitude: 21.0122 },
            { latitude: 52.2301, longitude: 21.0131 },
            { latitude: 52.2312, longitude: 21.0150 }
        ]
    },

];


export default function HistoryScreen() {
    return (
        <View style={styles.container}>


            <Text style={styles.title}>Historia spacerów</Text>

            <FlatList
                data={mockHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <MapView
                            style={styles.map}
                            scrollEnabled={false}
                            zoomEnabled={false}
                            rotateEnabled={false}
                            pitchEnabled={false}
                            toolbarEnabled={false}
                            initialRegion={{
                                latitude: item.path[0].latitude,
                                longitude: item.path[0].longitude,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005,

                            }}
                        >
                            <Polyline
                                coordinates={item.path}
                                strokeColor="#000"
                                strokeWidth={3}
                            />
                        </MapView>

                        <Text style={styles.date}>{item.date}</Text>
                        <Text>{item.duration} • {item.distance}</Text>
                    </View>
                )}
            />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 16,
        marginTop: 30,
        textAlign: 'center'
    },
    item: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: Colors.natural.accent,
        backgroundColor: Colors.natural.background,
        borderRadius: 10,
        padding: 10,



    },
    date: {
        fontWeight: '500',
    },
    map: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 24,
    }
});
