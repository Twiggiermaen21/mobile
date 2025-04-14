import { View, Text, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from "expo-router"
import styles from '@/assets/styles/create.styles'

export default function addDog() {
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [weight, setWeight] = useState(0);
    const [age, setAge] = useState(0);
    const [height, setHeight] = useState(0);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const pickImage = async () => { };

    const handleSubmit = async () => { };


    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior="height">
            <View style={styles.container}>

                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            Add Dog to your app
                        </Text>
                    </View>



                </View>


            </View>
        </KeyboardAvoidingView>

    )
}