import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const mockHistory = [
    { date: '2025-04-07', duration: '35 min', distance: '2.1 km' },
    { date: '2025-04-06', duration: '28 min', distance: '1.8 km' },
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
    },
    item: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    date: {
        fontWeight: '500',
    },
});
