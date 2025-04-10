import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import styles from '../../assets/styles/login.styles'
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constants/colorsApp';
import { Link } from 'expo-router';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleLogin = () => { }

    return (
        <View style={styles.container}>
            <View style={styles.topIllustration}>
                <Image source={require("../../assets/images/DogWalking-rafiki.png")}
                    style={styles.illustrationImage}
                    resizeMode='contain' />
            </View>
            <View style={styles.card}>
                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}> Email</Text>
                        <View style={styles.inputContainer} >
                            <Ionicons
                                name='mail-outline'
                                size={20}
                                color={COLORS.primary}
                                style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder='Enter your email'
                                placeholderTextColor={COLORS.placeholderText}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType='email-address'
                                autoCapitalize='none'
                            />


                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name='lock-closed-outline' size={20} color={COLORS.primary} style={styles.inputIcon} />
                            <TextInput style={styles.input}
                                placeholder='Enter your password'
                                placeholderTextColor={COLORS.placeholderText}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color={COLORS.primary} style={styles.inputIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={isLoading}>
                        {isLoading ? (<ActivityIndicator color="fff" />) : (<Text style={styles.buttonText}>Login</Text>)
                        }
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}> Don't have an account?</Text>
                        <Link href="/singup" asChild>
                            <Text style={styles.link}> Sing Up</Text>
                        </Link>
                    </View>


                </View>
            </View>
        </View>
    )
}