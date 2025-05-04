import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useSettingsStore } from '@/store/settingStore';
import texture from '@/constants/colorsApp';
import styles from '@/assets/styles/settings.styles';

import SettingsText from "@/assets/lang/Settings.text";

const languageNames = {
    en: "English",
    pl: "Polski",
    cs: "Čeština",
    es: "Español",
    fr: "Français",
    de: "Deutsch",
    it: "Italiano",
    ua: "Українська",
    ru: "Русский",
    zh: "中文 (Chinese)",
    ja: "日本語 (Japanese)",
    pt: "Português"
};

export default function ThemePickerButton({ label, onConfirm, typ }) {
    const { color, lang } = useSettingsStore();
    const [selectedColor, setSelectedColor] = useState(typ === 1 ? color : lang);
    let colorOptions;
    if (typ === 1) {
        colorOptions = Object.keys(texture);
    } else {
        colorOptions = Object.keys(SettingsText);
    }
    const [modalVisible, setModalVisible] = useState(false);
    const COLORS = texture[color];
    const dynamicStyles = styles(COLORS);
    const t = SettingsText[lang];

    const handleConfirm = () => {
        onConfirm(selectedColor);
        setModalVisible(false);
    };

    return (
        <>
            <TouchableOpacity style={dynamicStyles.settingButton} onPress={() => setModalVisible(true)}>
                <Text style={dynamicStyles.settingText}>{label}</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent animationType="fade">
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={dynamicStyles.ModalAroundBox}>
                        <TouchableWithoutFeedback>
                            <View style={dynamicStyles.card}>
                                <Text style={dynamicStyles.title}>{typ === 1 ? t.selectTheme : t.selectLanguage}</Text>

                                <ScrollView style={{ maxHeight: 200 }}>
                                    {colorOptions.map((option) => (
                                        <TouchableOpacity
                                            key={option}
                                            style={[
                                                dynamicStyles.settingButton,
                                                selectedColor === option && { backgroundColor: COLORS.primary + '33' } // podświetlenie wybranego
                                            ]}
                                            onPress={() => setSelectedColor(option)}
                                        >

                                            <Text style={dynamicStyles.settingText}>{typ === 1 ? option : languageNames[option] || option}</Text>

                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                                <TouchableOpacity style={dynamicStyles.button} onPress={handleConfirm}>

                                    <Text style={dynamicStyles.buttonText}>{t.save}</Text>

                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
}
