import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://placekitten.com/200/200' }} style={styles.avatar} />
            <Text style={styles.name}>Jan Piesowski</Text>
            <Text style={styles.info}>Opiekun: Azor (Golden Retriever)</Text>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Edytuj profil</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9F9F9',
        padding: 24,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: '600',
    },
    info: {
        fontSize: 16,
        color: '#555',
        marginVertical: 8,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
