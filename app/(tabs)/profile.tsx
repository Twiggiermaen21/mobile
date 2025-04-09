import React from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


const user = {
    avatar: 'profil.jpg',
    Imie: 'Jan',
    Nazwisko: 'Piesowski',
    Rank: 'Opiekun PRO',

}
const dog = [{
    ImiePsa: 'Azor',
    Rasa: 'Golden Retriever',
    DogIMG: 'dogimg.jpeg'
}, {
    ImiePsa: 'Marcin',
    Rasa: 'Chihuahua',
    DogIMG: 'dogimg.jpeg'
}
]



export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            {/* Górna część - profil użytkownika */}
            <View style={styles.userSection}>
                <Image
                    source={require('@/assets/ImagesPetWalk/profil.jpg')}
                    style={styles.avatar}
                />
                <Text style={styles.name}>
                    {user.Imie} {user.Nazwisko}
                </Text>
                <Text style={styles.rank}>{user.Rank}</Text>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Edytuj profil</Text>
                </TouchableOpacity>
            </View>

            {/* Dolna część - lista psów */}
            <View style={styles.dogSection}>
                <Text style={styles.sectionTitle}>Psy pod opieką:</Text>
                <FlatList
                    data={dog}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.dogItem}>
                            <Image
                                source={require('@/assets/ImagesPetWalk/dogimg.jpg')}
                                style={styles.dogImage}
                            />
                            <View>
                                <Text style={styles.dogName}>{item.ImiePsa}</Text>
                                <Text style={styles.dogBreed}>{item.Rasa}</Text>

                            </View>
                            <TouchableOpacity style={styles.buttonEdit}>
                                <Text style={styles.buttonText}>Edytuj</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />

            </View>
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Dodaj psa</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        padding: 24,
    },
    userSection: {
        alignItems: 'center',
        marginBottom: 20,
        top: 60
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 12,
    },
    name: {
        fontSize: 24,
        fontWeight: '600',
    },
    rank: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
        fontStyle: 'italic',
    },
    button: {
        marginTop: 12,
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    }, buttonEdit: {
        marginTop: 12,
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        left: 60

    }, addButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#2196F3',
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    dogSection: {
        flex: 1,
        marginTop: 10,
        top: 100
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    dogItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    dogImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 12,
    },
    dogName: {
        fontSize: 16,
        fontWeight: '500',
    },
    dogBreed: {
        fontSize: 14,
        color: '#666',
    },
});
