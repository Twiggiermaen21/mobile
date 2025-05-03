import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useSettingsStore } from '@/store/settingStore';
import texture from '@/constants/colorsApp';
import styles from '@/assets/styles/settings.styles';

const colorOptions = ['default', 'dark', 'light', 'blue', 'green']; // Dodaj tutaj swoje nazwy styli

export default function ThemePickerButton({ label = "Wybierz motyw", onConfirm }) {
    const { color } = useSettingsStore();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState(color);
    const COLORS = texture[color];
    const dynamicStyles = styles(COLORS);

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
                                <Text style={dynamicStyles.title}>Wybierz motyw</Text>
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
                                            <Text style={dynamicStyles.settingText}>{option}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                                <TouchableOpacity style={dynamicStyles.button} onPress={handleConfirm}>
                                    <Text style={dynamicStyles.buttonText}>Zatwierdź</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
}
