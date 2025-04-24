import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

export default function username() {
    const router = useRouter();
    return (
        <View>
            <Text>username</Text>
            <TouchableOpacity onPress={router.back}>
                <Text >back</Text>
            </TouchableOpacity>
        </View>
    )
}