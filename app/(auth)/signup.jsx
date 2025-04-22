import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState } from 'react'
import styles from '../../assets/styles/login.styles'
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constants/colorsApp';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore'
import SigninText from "@/constants/SigninText"
import { useSettingsStore } from '@/store/settingStore';
export default function signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { isLoading, register } = useAuthStore();

    const { lang } = useSettingsStore();
    const t = SigninText[lang];

    const router = useRouter();

    const handleSingup = async () => {
        const result = await register(username, email, password);
        if (!result.success) Alert.alert("Error", result.error);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>PetWalk</Text>
                        <Text style={styles.subtitle}>{t.subtitle}</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>{t.username}</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name='person-outline'
                                    size={20}
                                    color={COLORS.primary}
                                    style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder={t.placeholderUsername}
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={username}
                                    onChangeText={setUsername}
                                    autoCapitalize='none'
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>{t.password}</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name='lock-closed-outline'
                                    size={20}
                                    color={COLORS.primary}
                                    style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder={t.placeholderPassword}
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                    <Ionicons
                                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                        size={20}
                                        color={COLORS.primary}
                                        style={styles.inputIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>{t.password}</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name='mail-outline'
                                    size={20}
                                    color={COLORS.primary}
                                    style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder={t.placeholderEmail}
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        <TouchableOpacity onPress={handleSingup} style={styles.button} disabled={isLoading}>
                            {isLoading ? (<ActivityIndicator color="#fff" />) : (<Text style={styles.buttonText}>{t.button}</Text>)}
                        </TouchableOpacity>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>{t.bottom}</Text>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Text style={styles.link}>{t.login}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}