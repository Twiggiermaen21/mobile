import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const mockRanking = [
    { name: 'Anna', walks: 42 },
    { name: 'Tomek', walks: 37 },
    { name: 'Ty', walks: 35 },
];

const tiers = [
    { name: 'Diament', color: '#b9f2ff' },
    { name: 'Gold', color: '#ffd700' },
    { name: 'Silver', color: '#c0c0c0' },
    { name: 'Bronze', color: '#cd7f32' },
];

export default function LeagueScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🏆 Liga spacerowiczów</Text>

            {/* Górna część – Tiers */}
            <View style={styles.tiersContainer}>
                {tiers.map((tier, index) => (
                    <View
                        key={index}
                        style={[styles.tierBadge, { backgroundColor: tier.color }]}
                    >
                        <Text style={styles.tierText}>{tier.name}</Text>
                    </View>
                ))}
            </View>

            {/* Dolna część – Ranking */}
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
                contentContainerStyle={styles.listContainer}
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
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
        top: 60
    },
    tiersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 24,
        top: 60
    },
    tierBadge: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        elevation: 2,
    },
    tierText: {
        fontWeight: '600',
        color: '#333',
    },
    listContainer: {
        paddingBottom: 16,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        marginBottom: 12,
        elevation: 1,
        top: 60
    },
    rank: {
        fontWeight: '700',
        fontSize: 16,
        width: 30,
    },
    name: {
        fontSize: 16,
        flex: 1,
    },
    walks: {
        fontSize: 16,
        color: '#4CAF50',
        fontWeight: '600',
    },
});
