import React from 'react'
import styles from '@/assets/styles/map.styles'
import texture from '@/constants/colorsApp'
import { useSettingsStore } from '@/store/settingStore'
import formatTime from '@/constants/timeUtils';
import IndexText from '@/assets/lang/Index.text';
import { Text, View } from 'react-native';

export default function HeaderIndexPanel({ timeElapsed, currentSpeed, distance }) {
    const { lang, color } = useSettingsStore();
    const t = IndexText[lang];
    const COLORS = texture[color];
    const dynamicStyles = styles(COLORS);
    return (
        <View style={dynamicStyles.header}>
            <View style={dynamicStyles.formGroup}>
                <Text style={dynamicStyles.label}>{t.time}</Text>
                <Text style={dynamicStyles.info}>{formatTime(timeElapsed)}</Text>
            </View>
            <View style={dynamicStyles.formGroup}>
                <Text style={dynamicStyles.label}>{t.speed}</Text>
                <Text style={dynamicStyles.info}>{currentSpeed} km/h</Text>
            </View>
            <View style={dynamicStyles.formGroup}>
                <Text style={dynamicStyles.label}>{t.distance}</Text>
                <Text style={dynamicStyles.info}>{distance.toFixed(2)} km</Text>
            </View>
        </View>
    )

}