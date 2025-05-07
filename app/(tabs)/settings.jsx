import React, { useState } from 'react';
import { View, Text,ScrollView, Alert, Linking } from 'react-native';
import texture from '@/constants/colorsApp';
import styles from '@/assets/styles/settings.styles';
import { useSettingsStore } from '@/store/settingStore';
import { useAuthStore } from '@/store/authStore';
import SettingsText from "@/assets/lang/Settings.text";
import LogoutButton from '@/components/PetWalkComponents/LogoutButton';
import SettingButton from '@/components/PetWalkComponents/SettingButton';
import ThemePickerButton from '@/components/PetWalkComponents/ThemePickerButton';
import SettingsModal from '@/components/PetWalkComponents/SettingsModal';
export default function SettingsScreen() {
    const [selectedFunction, setSelectedFunction] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState('');
    const [inputValue, setInputValue] = useState('');
    const { lang, color, setLang, setColor, resetSettings } = useSettingsStore();
    const { updateUser, token } = useAuthStore();
    const t = SettingsText[lang];
    const COLORS = texture[color];
    const dynamicStyles = styles(COLORS);
   
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
                <Text style={dynamicStyles.sectionTitle}>{t.account}</Text>
                <SettingButton label={t.changeUsername} onPress={() => openModal(t.changeUsername, 1)} />
                <SettingButton label={t.changeEmail} onPress={() => openModal(t.changeEmail, 2)} />
                <SettingButton label={t.changePassword} onPress={() => openModal(t.changePassword, 3)} />
                <SettingButton label={t.editProfilePicture} onPress={() => openModal(t.editProfilePicture, 4)} />

                <Text style={dynamicStyles.sectionTitle}>{t.themeAppearance}</Text>
                <ThemePickerButton
                    label={t.colorScheme}
                    typ={1}
                    onConfirm={(newColor) => { setColor(newColor) }}
                />
                <ThemePickerButton
                    label={t.selectLanguage}
                    typ={2}
                    onConfirm={(newLang) => { setLang(newLang) }}
                />
               
                <Text style={dynamicStyles.sectionTitle}>{t.helpOther}</Text>
                <SettingButton label={t.appVersion} onPress={() => openModal(t.appVersion, 5)} />
                <SettingButton label={t.resetSettings} onPress={() => confirmReset()} />
                <SettingButton label={t.aboutApp} onPress={() => openModal(t.aboutApp, 6)} />

                <LogoutButton />
            </ScrollView>
            <SettingsModal
            modalVisible={modalVisible}
            closeModal={closeModal}
            selectedFunction={selectedFunction}
            selectedLabel={selectedLabel}
            inputValue={inputValue}
            setInputValue={setInputValue}
            updateButton={updateButton}
            handleLinkPress={handleLinkPress}
        />
        </View >
    );
}