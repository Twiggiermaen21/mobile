import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, ScrollView, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import texture from '@/constants/colorsApp';
import styles from '@/assets/styles/settings.styles';
import { useSettingsStore } from '@/store/settingStore';
import { useAuthStore } from '@/store/authStore';
import SettingsText from "@/constants/SettingsText";
import LogoutButton from '@/components/PetWalkComponents/LogoutButton';

export default function SettingsScreen() {
    const [selectedFunction, setSelectedFunction] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState('');
    const [inputValue, setInputValue] = useState('');

    const { lang, color } = useSettingsStore();
    const { isLoading, updateUser, token } = useAuthStore();
    const t = SettingsText[lang];
    const COLORS = texture[color];
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
        <View style={styles.container}>
            <Text style={styles.title}>{t.settingsTitle}</Text>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Account Section */}
                <Text style={styles.sectionTitle}>{t.account}</Text>
                <SettingButton label={t.changeUsername} onPress={() => openModal(t.changeUsername, 1)} />
                <SettingButton label={t.changeEmail} onPress={() => openModal(t.changeEmail, 2)} />
                <SettingButton label={t.changePassword} onPress={() => openModal(t.changePassword, 3)} />
                <SettingButton label={t.editProfilePicture} onPress={() => openModal(t.editProfilePicture, 4)} />

                {/* Notifications */}
                {/* <Text style={styles.sectionTitle}>{t.notifications}</Text>
                <SettingButton label={t.emailSMSNotifications} onPress={() => openModal(t.emailSMSNotifications)} /> */}

                {/* Appearance */}
                <Text style={styles.sectionTitle}>{t.themeAppearance}</Text>
                <SettingButton label={t.colorScheme} onPress={() => openModal(t.colorScheme)} />

                {/* Language  */}
                <Text style={styles.sectionTitle}>{t.languageLocation}</Text>
                <SettingButton label={t.selectLanguage} onPress={() => openModal(t.selectLanguage)} />

                {/* Help & Other */}
                <Text style={styles.sectionTitle}>{t.helpOther}</Text>
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
                    <View style={styles.ModalAroundBox}>
                        <TouchableWithoutFeedback>
                            <View style={styles.card}>
                                <Text style={styles.title}>{selectedLabel}</Text>
                                <View style={styles.form}>
                                    <View style={styles.formGroup}>
                                        <Text style={styles.label}>{t.info[selectedFunction]}</Text>
                                        {selectedFunction === 4 ? (
                                            <Text style={styles.link} onPress={handleLinkPress}>
                                                Kliknij tutaj, aby stworzyć awatara!
                                            </Text>
                                        ) : null}
                                        <View style={styles.inputContainer}>
                                            <Ionicons name="chevron-forward" style={styles.inputIcon} size={20} color={COLORS.textSecondary} />
                                            <TextInput
                                                style={styles.input}
                                                placeholder={t.namePlaceholder}
                                                placeholderTextColor={COLORS.placeholderText}
                                                value={inputValue}
                                                onChangeText={setInputValue}
                                            />
                                        </View>
                                    </View>

                                    <TouchableOpacity style={styles.button} onPress={updateButton}>
                                        <Text style={styles.buttonText}>{t.save}</Text>
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
const SettingButton = ({ label, onPress }) => (
    <TouchableOpacity style={styles.settingButton} onPress={onPress}>
        <Text style={styles.settingText}>{label}</Text>
    </TouchableOpacity>
);

