import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, ScrollView, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import texture from '@/constants/colorsApp';
import styles from '@/assets/styles/settings.styles';
import { useSettingsStore } from '@/store/settingStore';
import { useAuthStore } from '@/store/authStore';
import SettingsText from "@/constants/SettingsText";
import LogoutButton from '@/components/PetWalkComponents/LogoutButton';
import SettingButton from '@/components/PetWalkComponents/SettingButton';

export default function SettingsScreen() {
    const [selectedFunction, setSelectedFunction] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState('');
    const [inputValue, setInputValue] = useState('');

    const { lang, color } = useSettingsStore();
    const { isLoading, updateUser, token } = useAuthStore();
    const t = SettingsText[lang];
    const COLORS = texture[color];
    const dynamicStyles = styles(COLORS);

    const openModal = (label, number) => {
        setSelectedLabel(label);
        setSelectedFunction(number);
        setModalVisible(true);
    };

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
                <SettingButton label={t.colorScheme} onPress={() => openModal(t.colorScheme)} />

                {/* Language  */}
                <Text style={dynamicStyles.sectionTitle}>{t.languageLocation}</Text>
                <SettingButton label={t.selectLanguage} onPress={() => openModal(t.selectLanguage)} />

                {/* Help & Other */}
                <Text style={dynamicStyles.sectionTitle}>{t.helpOther}</Text>
                <SettingButton label={t.helpCenter} onPress={() => openModal(t.helpCenter)} />
                <SettingButton label={t.reportProblem} onPress={() => openModal(t.reportProblem)} />
                <SettingButton label={t.appVersion} onPress={() => openModal(t.appVersion)} />
                <SettingButton label={t.resetSettings} onPress={() => openModal(t.resetSettings)} />
                <SettingButton label={t.aboutApp} onPress={() => openModal(t.aboutApp)} />

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
                                    <View style={dynamicStyles.formGroup}>
                                        <Text style={dynamicStyles.label}>{t.info[selectedFunction]}</Text>
                                        {selectedFunction === 4 ? (
                                            <Text style={dynamicStyles.link} onPress={handleLinkPress}>
                                                Kliknij tutaj, aby stworzyć awatara!
                                            </Text>
                                        ) : null}
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

                                    <TouchableOpacity style={dynamicStyles.button} onPress={updateButton}>
                                        <Text style={dynamicStyles.buttonText}>{t.save}</Text>
                                    </TouchableOpacity>
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


