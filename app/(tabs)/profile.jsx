import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';



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
    const [book, setBooks] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [redreshing, setRefreshing] = useState(true);

    const router = useRouter();

    // const response = await fetch(`${AAPI_URL}/books/user`, {
    //     headers: { Autorization: `Bearer:${token}` },
    // })

    return (
        <View >

        </View>
    );
}
