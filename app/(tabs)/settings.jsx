import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, ScrollView, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import texture from '@/constants/colorsApp';
import styles from '@/assets/styles/settings.styles';
import { useSettingsStore } from '@/store/settingStore';
import { useAuthStore } from '@/store/authStore';
import SettingsText from "@/assets/lang/Settings.text";
import LogoutButton from '@/components/PetWalkComponents/LogoutButton';
import SettingButton from '@/components/PetWalkComponents/SettingButton';
import ThemePickerButton from '@/components/PetWalkComponents/ThemePickerButton';
export default function SettingsScreen() {
    const [selectedFunction, setSelectedFunction] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState('');
    const [inputValue, setInputValue] = useState('');



    const { lang, color, setLang, setColor, resetSettings } = useSettingsStore();
    const { isLoading, updateUser, token } = useAuthStore();
    const t = SettingsText[lang];
    const COLORS = texture[color];
    const dynamicStyles = styles(COLORS);
    const textMap = {
        7: t.about,
        5: t.version,
    };
    const openModal = (label, number) => {
        setSelectedLabel(label);
        setSelectedFunction(number);
        setModalVisible(true);
    };
    const confirmReset = () => {
        Alert.alert("Reset app", "Are you sure you want to reset app?", [
            { text: "Cancel", style: "cancel" },
            { text: "Reset", onPress: () => resetSettings(), style: "destructive" }
        ])
    }

    const closeModal = () => {
        setModalVisible(false);
        setSelectedLabel('');
        setInputValue('');
        setSelectedFunction(null);
    };
    const handleLinkPress = () => {
        const url = 'https://www.dicebear.com/styles/avataaars/';
        Linking.openURL(url).catch((err) => console.error('Failed to open URL', err));
    };
    const fieldMap = {
        1: { username: inputValue },
        2: { email: inputValue },
        3: { password: inputValue },
        4: { profileImage: inputValue }
    };

    const updateButton = async () => {
        if (!fieldMap[selectedFunction]) {
            Alert.alert("Error", "Invalid selection");
            return;
        }

        const result = await updateUser(token, fieldMap[selectedFunction]);

        if (!result.success) {
            Alert.alert("Error", result.error);
        } else {
            Alert.alert("Success", "Profile updated successfully!");
            closeModal();
        }
    };

    return (
        <View style={dynamicStyles.container}>
            <Text style={dynamicStyles.title}>{t.settingsTitle}</Text>

            <ScrollView contentContainerStyle={dynamicStyles.scrollContainer}>
                {/* Account Section */}
                <Text style={dynamicStyles.sectionTitle}>{t.account}</Text>
                <SettingButton label={t.changeUsername} onPress={() => openModal(t.changeUsername, 1)} />
                <SettingButton label={t.changeEmail} onPress={() => openModal(t.changeEmail, 2)} />
                <SettingButton label={t.changePassword} onPress={() => openModal(t.changePassword, 3)} />
                <SettingButton label={t.editProfilePicture} onPress={() => openModal(t.editProfilePicture, 4)} />

                {/* Notifications */}
                {/* <Text style={dynamicStyles.sectionTitle}>{t.notifications}</Text>
                <SettingButton label={t.emailSMSNotifications} onPress={() => openModal(t.emailSMSNotifications)} /> */}

                {/* Appearance */}
                <Text style={dynamicStyles.sectionTitle}>{t.themeAppearance}</Text>
                <ThemePickerButton
                    label={t.colorScheme}
                    typ={1}
                    onConfirm={(newColor) => {

                        setColor(newColor);
                    }}
                />
                <ThemePickerButton
                    label={t.selectLanguage}
                    typ={2}
                    onConfirm={(newLang) => {

                        setLang(newLang);
                    }}
                />


                {/* Help & Other */}
                <Text style={dynamicStyles.sectionTitle}>{t.helpOther}</Text>

                <SettingButton label={t.appVersion} onPress={() => openModal(t.appVersion, 5)} />
                <SettingButton label={t.resetSettings} onPress={() => confirmReset()} />
                <SettingButton label={t.aboutApp} onPress={() => openModal(t.aboutApp, 7)} />

                {/* Logout */}
                <LogoutButton />
            </ScrollView>

            {/* Modal */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
            >
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={dynamicStyles.ModalAroundBox}>
                        <TouchableWithoutFeedback>
                            <View style={dynamicStyles.card}>
                                <Text style={dynamicStyles.title}>{selectedLabel}</Text>
                                <View style={dynamicStyles.form}>
                                    {selectedFunction < 5 ? (
                                        // Form content for `selectedFunction === 0`
                                        <View style={dynamicStyles.formGroup}>
                                            <Text style={dynamicStyles.label}>{t.info[selectedFunction]}</Text>

                                            {/* Avatar link only for `selectedFunction === 4` */}
                                            {selectedFunction === 4 && (
                                                <Text style={dynamicStyles.link} onPress={handleLinkPress}>
                                                    Kliknij tutaj, aby stworzyć awatara!
                                                </Text>
                                            )}

                                            <View style={dynamicStyles.inputContainer}>
                                                <Ionicons name="chevron-forward" style={dynamicStyles.inputIcon} size={20} color={COLORS.textSecondary} />
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
                                        // Display this when selectedFunction !== 0
                                        <Text>{textMap[selectedFunction] || null}</Text>
                                    )}

                                    {/* Save Button */}
                                    {selectedFunction < 5 && (
                                        <TouchableOpacity style={dynamicStyles.button} onPress={updateButton}>
                                            <Text style={dynamicStyles.buttonText}>{t.save}</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>

                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback >
            </Modal >
        </View >
    );
}

// Setting Button Component


