import React from 'react';
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSettingsStore } from '@/store/settingStore';
import texture from '@/constants/colorsApp';
type TextureColor = 'FOREST' | 'RETRO' | 'OCEAN' | 'BLOSSOM';

export default function SafeScreen({ children }: { children: React.ReactNode }) {
    const instes = useSafeAreaInsets();
    const { color } = useSettingsStore();
    const COLORS = texture[color as TextureColor];

    return (
        <View style={[{ flex: 1, backgroundColor: COLORS.background }, { paddingTop: instes.top }]}>
            {children}
        </View>
    )
}
