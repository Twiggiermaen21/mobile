import React from 'react';
import { View, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import COLORS from "../constants/colorsApp";


export default function SafeScreen({ children }: { children: React.ReactNode }) {
    const instes = useSafeAreaInsets();
    return (
        <View style={[styles.container, { paddingTop: instes.top }]}>
            {children}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    }
})