import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import styles from '../../assets/styles/signup.styles';
import texture from '@/constants/colorsApp';
import SigninText from '@/assets/lang/Signin.text';

import { useAuthStore } from '../../store/authStore';
import { useSettingsStore } from '@/store/settingStore';
export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { isLoading, register } = useAuthStore();

    const { lang, color } = useSettingsStore();
    const t = SigninText[lang];
    const COLORS = texture[color];
    const router = useRouter();
    const dynamicStyles = styles(COLORS);
    const handleSignup = async () => {
        const result = await register(username, email, password);
        if (!result.success) Alert.alert("Error", result.error);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
            <View style={dynamicStyles.container}>
                <View style={dynamicStyles.card}>
                    <View style={dynamicStyles.header}>
                        <Text style={dynamicStyles.title}>PetWalk</Text>
                        <Text style={dynamicStyles.subtitle}>{t.subtitle}</Text>
                    </View>

                    <View style={dynamicStyles.formContainer}>
                        <View style={dynamicStyles.inputGroup}>
                            <Text style={dynamicStyles.label}>{t.username}</Text>
                            <View style={dynamicStyles.inputContainer}>
                                <Ionicons
                                    name='person-outline'
                                    size={20}
                                    color={COLORS.primary}
                                    style={dynamicStyles.inputIcon} />
                                <TextInput
                                    style={dynamicStyles.input}
                                    placeholder={t.placeholderUsername}
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={username}
                                    onChangeText={setUsername}
                                    autoCapitalize='none'
                                />
                            </View>
                        </View>
                        <View style={dynamicStyles.inputGroup}>
                            <Text style={dynamicStyles.label}>Email</Text>
                            <View style={dynamicStyles.inputContainer}>
                                <Ionicons
                                    name='mail-outline'
                                    size={20}
                                    color={COLORS.primary}
                                    style={dynamicStyles.inputIcon} />
                                <TextInput
                                    style={dynamicStyles.input}
                                    placeholder={t.placeholderEmail}
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        <View style={dynamicStyles.inputGroup}>
                            <Text style={dynamicStyles.label}>{t.password}</Text>
                            <View style={dynamicStyles.inputContainer}>
                                <Ionicons
                                    name='lock-closed-outline'
                                    size={20}
                                    color={COLORS.primary}
                                    style={dynamicStyles.inputIcon} />
                                <TextInput
                                    style={dynamicStyles.input}
                                    placeholder={t.placeholderPassword}
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={dynamicStyles.eyeIcon}>
                                    <Ionicons
                                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                        size={20}
                                        color={COLORS.primary}
                                        style={dynamicStyles.inputIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>



                        <TouchableOpacity onPress={handleSignup} style={dynamicStyles.button} disabled={isLoading}>
                            {isLoading ? (<ActivityIndicator color={COLORS.white} />) : (<Text style={dynamicStyles.buttonText}>{t.button}</Text>)}
                        </TouchableOpacity>

                        <View style={dynamicStyles.footer}>
                            <Text style={dynamicStyles.footerText}>{t.bottom}</Text>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Text style={dynamicStyles.link}>{t.login}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}