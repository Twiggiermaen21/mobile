import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

import styles from '../../assets/styles/login.styles';
import texture from '@/constants/colorsApp';
import LoginText from '@/constants/LoginText';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settingStore';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { isLoading, login } = useAuthStore();

    const { lang, color } = useSettingsStore();
    const t = LoginText[lang];
    const COLORS = texture[color];
    const dynamicStyles = styles(COLORS);

    const handleLogin = async () => {
        const result = await login(email, password);
        if (!result.success) Alert.alert("Error", result.error);
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
            <View style={dynamicStyles.container}>
                <View style={dynamicStyles.topIllustration}>
                    <Image source={require("../../assets/images/DogWalking-rafiki.png")}
                        style={dynamicStyles.illustrationImage}
                        resizeMode='contain' />
                </View>
                <View style={dynamicStyles.card}>
                    <View style={dynamicStyles.formContainer}>
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
                                    placeholder={t.email}
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                />
                            </View>
                        </View>

                        <View style={dynamicStyles.inputGroup}>
                            <Text style={dynamicStyles.label}>{t.labelPassword}</Text>
                            <View style={dynamicStyles.inputContainer}>
                                <Ionicons name='lock-closed-outline' size={20} color={COLORS.primary} style={dynamicStyles.inputIcon} />
                                <TextInput style={dynamicStyles.input}
                                    placeholder={t.password}
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={dynamicStyles.eyeIcon}>
                                    <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color={COLORS.primary} style={dynamicStyles.inputIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity onPress={handleLogin} style={dynamicStyles.button} disabled={isLoading}>
                            {isLoading ? (<ActivityIndicator color={COLORS.white} />) : (<Text style={dynamicStyles.buttonText}>{t.loginButton}</Text>)}
                        </TouchableOpacity>

                        <View style={dynamicStyles.footer}>
                            <Text style={dynamicStyles.footerText}>{t.footerText}</Text>
                            <Link href="/signup" asChild>
                                <TouchableOpacity>
                                    <Text style={dynamicStyles.link}>{t.signUpLink}</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}