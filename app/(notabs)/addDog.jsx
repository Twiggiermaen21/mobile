import { View, Text, KeyboardAvoidingView, TextInput, ScrollView, TouchableOpacity, Platform, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from "expo-router"
import styles from '@/assets/styles/addDog.styles'
import { Ionicons } from '@expo/vector-icons';
import texture from '@/constants/colorsApp';
import Slider from '@react-native-community/slider';
import { Image } from 'expo-image';
import * as   ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { useAuthStore } from '@/store/authStore';
import { useDogStore } from "@/store/dogStore"
import AddDogText from "@/assets/lang/AddDog.text"
import { useSettingsStore } from '@/store/settingStore';
export default function AddDog() {
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [weight, setWeight] = useState(0);
    const [age, setAge] = useState(0);
    const [height, setHeight] = useState(0);
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);

    const router = useRouter();
    const { token } = useAuthStore();
    const { addDog, isLoading } = useDogStore()
    const { lang, color } = useSettingsStore();
    const t = AddDogText[lang];
    const COLORS = texture[color];
    const dynamicStyles = styles(COLORS);
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
                quality: 0.5,
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

            const result = await addDog(token, name, age, breed, image, height, weight, imageBase64);
            if (!result.success) Alert.alert("Error", result.error);
            else Alert.alert("Succes", "Your dog has been added");

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
        }

    };


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView
                contentContainerStyle={dynamicStyles.container}
                style={dynamicStyles.scrollViewStyle}
                keyboardShouldPersistTaps="handled"
            >
                <TouchableOpacity onPress={() => router.back()} style={dynamicStyles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.white} />
                    <Text style={dynamicStyles.buttonText} >{t.backButton}</Text>
                </TouchableOpacity>
                <View style={dynamicStyles.card}>

                    <View style={dynamicStyles.header}>
                        <Text style={dynamicStyles.title}>{t.title}</Text>
                        <Text style={dynamicStyles.subtitle}>{t.subtitle}</Text>
                    </View>

                    <View style={dynamicStyles.form}>

                        <View style={dynamicStyles.formGroup}>
                            <Text style={dynamicStyles.label}>{t.nameLabel}</Text>
                            <View style={dynamicStyles.inputContainer}>
                                <Ionicons name="chevron-forward" style={dynamicStyles.inputIcon} size={20} color={COLORS.textSecondary} />
                                <TextInput
                                    style={dynamicStyles.input}
                                    placeholder={t.namePlaceholder}
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>
                        </View>

                        <View style={dynamicStyles.formGroup}>
                            <Text style={dynamicStyles.label}>{t.breedLabel}</Text>
                            <View style={dynamicStyles.inputContainer}>
                                <Ionicons name="chevron-forward" style={dynamicStyles.inputIcon} size={20} color={COLORS.textSecondary} />
                                <TextInput
                                    style={dynamicStyles.input}
                                    placeholder={t.breedPlaceholder}
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={breed}
                                    onChangeText={setBreed}
                                />
                            </View>
                        </View>

                        <View style={dynamicStyles.formGroup}>
                            <Text style={dynamicStyles.label}>{t.weightLabel(weight)}</Text>
                            <Slider
                                style={dynamicStyles.slider}
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

                        <View style={dynamicStyles.formGroup}>
                            <Text style={dynamicStyles.label}>{t.ageLabel(age)}</Text>
                            <Slider
                                style={dynamicStyles.slider}
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

                        <View style={dynamicStyles.formGroup}>
                            <Text style={dynamicStyles.label}>{t.heightLabel(height)}</Text>
                            <Slider
                                style={dynamicStyles.slider}
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

                        <View style={dynamicStyles.formGroup}>
                            <Text style={dynamicStyles.label}>{t.imageLabel}</Text>
                            <TouchableOpacity style={dynamicStyles.imagePicker} onPress={pickImage}>
                                {image ? (
                                    <Image source={{ uri: image }} style={dynamicStyles.previewImage} />
                                ) : (
                                    <View style={dynamicStyles.placeholderContainer}>
                                        <Ionicons name="image-outline" style={dynamicStyles.inputIcon} size={40} color={COLORS.textSecondary} />
                                        <Text style={dynamicStyles.placeholderText}>{t.imagePlaceholder}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={dynamicStyles.button} onPress={handleSubmit} disabled={isLoading}>
                            {isLoading ? (
                                <ActivityIndicator color={COLORS.white} />
                            ) : (
                                <>
                                    <Ionicons name="add-circle-outline" size={20} color={COLORS.white} style={dynamicStyles.buttonIcon} />
                                    <Text style={dynamicStyles.buttonText}>{t.uploadButton}</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}