import { View, Text, KeyboardAvoidingView, TextInput, ScrollView, TouchableOpacity, Platform, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from "expo-router"
import styles from '@/assets/styles/create.styles'
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constants/colorsApp';
import Slider from '@react-native-community/slider';
import { Image } from 'expo-image';
import * as   ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { useAuthStore } from '@/store/authStore';
import { API_URL, URL_API } from "@/constants/api"
import { useNavigation } from '@react-navigation/native'; // Importowanie hooka do nawigacji

export default function addDog() {
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [weight, setWeight] = useState(0);
    const [age, setAge] = useState(0);
    const [height, setHeight] = useState(0);
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation(); // Hook do nawigacji
    const router = useRouter();
    const { token, user } = useAuthStore();
    const pickImage = async () => {
        try {
            if (Platform.OS !== "web") {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    Alert.alert("Permission Denied", "We need roll permissions to upload an image");
                    return;
                }
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: "images",
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.5, //zmiana jakosci zdjecia dla base64
                base64: true
            })

            if (!result.canceled) {
                setImage(result.assets[0].uri)

                if (result.assets[0].base64) {
                    setImageBase64(result.assets[0].base64);
                } else {
                    const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                        encoding: FileSystem.EncodingType.base64
                    });
                    setImageBase64(base64);
                }
            }

        } catch (error) {
            console.error("Error picking image:", error);
            Alert.alert("Error", "There was a problem selecting your image");
        }
    };

    const handleSubmit = async () => {
        if (!name) {
            Alert.alert("Error", "Please fill the name field");
            return;
        }
        try {
            setLoading(true);

            let imageDataUrl = null;

            if (image && imageBase64) {
                const uriParts = image.split(".");
                const fileType = uriParts[uriParts.length - 1];
                const imageType = fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg";
                imageDataUrl = `data:${imageType};base64,${imageBase64}`;
            }

            const response = await fetch(`${API_URL}/dogs/add-dog`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({

                    name,
                    breed,
                    weight,
                    age,
                    height,
                    image: imageDataUrl
                })

            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Something went wrong");
            Alert.alert("Succes", "Your dog has been added");

            setName("");
            setAge(0);
            setBreed("");
            setImage(null);
            setHeight(0);
            setWeight(0);
            setImageBase64(null);
            router.push("/");
        } catch (error) {
            console.error("Error adding dog:", error);
            Alert.alert("Error", error.message || "Something went wrong");

        } finally {
            setLoading(false);
        }
    };


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView
                contentContainerStyle={styles.container}
                style={styles.scrollViewStyle}
                keyboardShouldPersistTaps="handled" // Aby kliknąć w inne pola, gdy klawiatura jest otwarta
            >
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.white} />
                    <Text style={styles.buttonText} >Back</Text>
                </TouchableOpacity>
                <View style={styles.card}>
                    {/* Przyciski nawigacji */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Tell Us About Your Doggo</Text>
                        <Text style={styles.subtitle}>Because every good boy deserves a profile 🐶</Text>
                    </View>

                    <View style={styles.form}>
                        {/* Dog Name */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Dog Name</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="chevron-forward" style={styles.inputIcon} size={20} color={COLORS.textSecondary} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter the name"
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>
                        </View>

                        {/* Breed */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Breed</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="chevron-forward" style={styles.inputIcon} size={20} color={COLORS.textSecondary} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter the breed"
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={breed}
                                    onChangeText={setBreed}
                                />
                            </View>
                        </View>

                        {/* Weight Slider */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Weight: {weight} kg</Text>
                            <Slider
                                style={{ width: '100%', height: 40 }}
                                minimumValue={0}
                                maximumValue={100}
                                step={1}
                                value={weight}
                                onValueChange={setWeight}
                                minimumTrackTintColor={COLORS.primary}
                                maximumTrackTintColor={COLORS.textSecondary}
                                thumbTintColor={COLORS.primary}
                            />
                        </View>

                        {/* Age Slider */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Age: {age} years</Text>
                            <Slider
                                style={{ width: '100%', height: 40 }}
                                minimumValue={0}
                                maximumValue={20}
                                step={1}
                                value={age}
                                onValueChange={setAge}
                                minimumTrackTintColor={COLORS.primary}
                                maximumTrackTintColor={COLORS.textSecondary}
                                thumbTintColor={COLORS.primary}
                            />
                        </View>

                        {/* Height Slider */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Height: {height} cm</Text>
                            <Slider
                                style={{ width: '100%', height: 40 }}
                                minimumValue={0}
                                maximumValue={100}
                                step={1}
                                value={height}
                                onValueChange={setHeight}
                                minimumTrackTintColor={COLORS.primary}
                                maximumTrackTintColor={COLORS.textSecondary}
                                thumbTintColor={COLORS.primary}
                            />
                        </View>

                        {/* Dog Image Picker */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Dog Image</Text>
                            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                                {image ? (
                                    <Image source={{ uri: image }} style={styles.previewImage} />
                                ) : (
                                    <View style={styles.placeholderContainer}>
                                        <Ionicons name="image-outline" style={styles.inputIcon} size={40} color={COLORS.textSecondary} />
                                        <Text style={styles.placeholderText}>Tap to select image</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color={COLORS.white} />
                            ) : (
                                <>
                                    <Ionicons name="add-circle-outline" size={20} color={COLORS.white} style={styles.buttonIcon} />
                                    <Text style={styles.buttonText}>Upload</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}