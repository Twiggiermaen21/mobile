import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSettingsStore } from '@/store/settingStore';
import SettingsText from '@/assets/lang/Settings.text';
import texture from '@/constants/colorsApp';
import styles from '@/assets/styles/settings.styles';

export default function SettingsModal({ modalVisible, closeModal, selectedFunction, selectedLabel, inputValue, setInputValue, updateButton, handleLinkPress }) {
    const { lang, color } = useSettingsStore();
    const t = SettingsText[lang];
    const COLORS = texture[color];
    const dynamicStyles = styles(COLORS);
    const textMap = {
        6: t.about,
        5: t.version,
    };

    return (
        <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade">
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={dynamicStyles.ModalAroundBox}>
                    <TouchableWithoutFeedback>
                        <View style={dynamicStyles.card}>
                            <Text style={dynamicStyles.title}>{selectedLabel}</Text>
                            <View style={dynamicStyles.form}>
                                {selectedFunction < 5 ? (
                                    <View style={dynamicStyles.formGroup}>
                                        <Text style={dynamicStyles.label}>{t.info[selectedFunction]}</Text>

                                        {selectedFunction === 4 && (
                                            <Text style={dynamicStyles.link} onPress={handleLinkPress}>
                                                Kliknij tutaj, aby stworzyć awatara!
                                            </Text>
                                        )}

                                        <View style={dynamicStyles.inputContainer}>
                                            <Ionicons
                                                name="chevron-forward"
                                                style={dynamicStyles.inputIcon}
                                                size={20}
                                                color={COLORS.textSecondary}
                                            />
                                            <TextInput
                                                style={dynamicStyles.input}
                                                placeholder={t.namePlaceholder}
                                                placeholderTextColor={COLORS.placeholderText}
                                                value={inputValue}
                                                onChangeText={setInputValue}
                                            />
                                        </View>
                                    </View>
                                ) : (
                                    <Text>
                                        {textMap[selectedFunction] || null}
                                    </Text>
                                )}

                                {selectedFunction < 5 && (
                                    <TouchableOpacity style={dynamicStyles.button} onPress={updateButton}>
                                        <Text style={dynamicStyles.buttonText}>{t.save}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
