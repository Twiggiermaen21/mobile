import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const mockRanking = [
    { name: 'Anna', walks: 42 },
    { name: 'Tomek', walks: 37 },
    { name: 'Ty', walks: 35 },
];

export default function LeagueScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Liga spacerowiczów</Text>
            <FlatList
                data={mockRanking}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.item}>
                        <Text style={styles.rank}>{index + 1}.</Text>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.walks}>{item.walks} spacerów</Text>
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
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 16,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    rank: {
        fontWeight: '700',
        fontSize: 16,
    },
    name: {
        fontSize: 16,
    },
    walks: {
        fontSize: 16,
        color: '#4CAF50',
    },
});
