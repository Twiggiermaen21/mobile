import React, { useState } from 'react';
import { Modal, View, Text, Switch, TouchableOpacity, TextInput, TouchableWithoutFeedback, ScrollView, Alert } from 'react-native';


import COLORS from '@/constants/colorsApp';

import LogoutButton from '@/components/PetWalkComponents/LogoutButton';
import styles from '@/assets/styles/settings.styles';
import { useSettingsStore } from '@/store/settingStore';
import SettingsText from "@/constants/SettingsText"
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/store/authStore';
// Main Settings Screen
export default function SettingsScreen() {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState('');
    const { lang } = useSettingsStore();
    const t = SettingsText[lang];
    const [inputValue, setInputValue] = useState('');
    const { isLoading, updateUsername, token } = useAuthStore();
    const closeModal = () => {
        updateUsernameButton();
        setModalVisible(false);
        setSelectedLabel('');
        setInputValue('');

    };

    const openModal = (label) => {
        setSelectedLabel(label);
        setModalVisible(true);
    };

    const updateUsernameButton = async () => {
        const result = await updateUsername(token, inputValue);
        if (!result.success) Alert.alert("Error", result.error);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t.settingsTitle}</Text>

            <ScrollView contentContainerStyle={styles.scrollContainer}>

                <Text style={styles.sectionTitle}>{t.account}</Text>
                <SettingButton label={t.changeUsername} onPress={() => openModal(t.changeUsername)} />
                <SettingButton label={t.changeEmail} onPress={() => openModal(t.changeEmail)} />
                <SettingButton label={t.changePassword} onPress={() => openModal(t.changePassword)} />
                <SettingButton label={t.editProfilePicture} onPress={() => openModal(t.editProfilePicture)} />

                <Text style={styles.sectionTitle}>{t.notifications}</Text>
                <SettingButton label={t.emailSMSNotifications} onPress={() => openModal(t.emailSMSNotifications)} />

                <Text style={styles.sectionTitle}>{t.themeAppearance}</Text>
                {/* <SettingSwitch label={t.darkMode} value={darkMode} onValueChange={setDarkMode} />
                <SettingButton label={t.fontSize} onPress={() => openModal(t.fontSize)} /> */}
                <SettingButton label={t.colorScheme} onPress={() => openModal(t.colorScheme)} />

                <Text style={styles.sectionTitle}>{t.languageLocation}</Text>
                <SettingButton label={t.selectLanguage} onPress={() => openModal(t.selectLanguage)} />
                {/* <SettingButton label={t.dateFormat} onPress={() => openModal(t.dateFormat)} />
                <SettingButton label={t.timeZone} onPress={() => openModal(t.timeZone)} /> */}

                {/* 
            <Text style={styles.sectionTitle}>{t.privacySecurity}</Text>
            <SettingButton label={t.manageDevices} onPress={() => openModal(t.manageDevices)} />
            <SettingButton label={t.loginHistory} onPress={() => openModal(t.loginHistory)} />
            */}

                <Text style={styles.sectionTitle}>{t.helpOther}</Text>
                <SettingButton label={t.helpCenter} onPress={() => openModal(t.helpCenter)} />
                <SettingButton label={t.reportProblem} onPress={() => openModal(t.reportProblem)} />
                <SettingButton label={t.appVersion} onPress={() => openModal(t.appVersion)} />
                <SettingButton label={t.resetSettings} onPress={() => openModal(t.resetSettings)} />
                <SettingButton label={t.aboutApp} onPress={() => openModal(t.aboutApp)} />

                <LogoutButton />
            </ScrollView>

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
                                        <Text style={styles.label}>{t.nameLabel}</Text>
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


                                    <TouchableOpacity style={styles.button} onPress={() => {
                                        console.log("Wprowadzone:", inputValue); // np. API call
                                        closeModal();
                                    }}>
                                        <Text style={styles.buttonText}>{t.save}</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

// Setting Button Component
const SettingButton = ({ label, onPress }) => {
    // Call useRouter here to handle navigation
    return (
        <TouchableOpacity style={styles.settingButton} onPress={onPress}>
            <Text style={styles.settingText}>{label}</Text>
        </TouchableOpacity>
    );
};

// Setting Switch Component
const SettingSwitch = ({ label, value, onValueChange }) => (
    <View style={styles.settingSwitch}>
        <Text style={styles.settingText}>{label}</Text>
        <Switch value={value} onValueChange={onValueChange} />
    </View>
);
