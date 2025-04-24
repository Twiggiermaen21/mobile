import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import LogoutButton from '@/components/PetWalkComponents/LogoutButton';
import styles from '@/assets/styles/settings.styles';

// Main Settings Screen
export default function SettingsScreen() {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ustawienia</Text>

            <ScrollView contentContainerStyle={styles.scrollContainer}>

                {/* 1. Konto użytkownika */}
                <Text style={styles.sectionTitle}>Konto użytkownika</Text>
                <SettingButton label="Zmień username" destination="../(notabs)/username" />
                <SettingButton label="Zmień adres e-mail" destination="/notabs/email" />
                <SettingButton label="Zmień hasło" destination="/notabs/password" />
                <SettingButton label="Edytuj zdjęcie profilowe" destination="/notabs/profile-picture" />

                {/* 2. Powiadomienia */}
                <Text style={styles.sectionTitle}>Powiadomienia</Text>
                <SettingButton label="Powiadomienia e-mail/SMS" />

                {/* 3. Motyw i wygląd */}
                <Text style={styles.sectionTitle}>Motyw i wygląd</Text>
                <SettingSwitch label="Tryb ciemny" value={darkMode} onValueChange={setDarkMode} />
                <SettingButton label="Rozmiar czcionki" />
                <SettingButton label="Kolorystyka" />

                {/* 4. Język i lokalizacja */}
                <Text style={styles.sectionTitle}>Język i lokalizacja</Text>
                <SettingButton label="Wybór języka" />
                <SettingButton label="Format daty i godziny" />
                <SettingButton label="Strefa czasowa" />

                {/* 5. Prywatność i bezpieczeństwo */}
                <Text style={styles.sectionTitle}>Prywatność i bezpieczeństwo</Text>
                <SettingButton label="Zarządzaj urządzeniami" />
                <SettingButton label="Historia logowania" />

                {/* 6. Dane i synchronizacja */}
                <Text style={styles.sectionTitle}>Dane i synchronizacja</Text>
                <SettingButton label="Użycie danych komórkowych vs Wi-Fi" />

                {/* 7. Pomoc i Inne */}
                <Text style={styles.sectionTitle}>Pomoc i Inne</Text>
                <SettingButton label="Centrum pomocy / FAQ" />
                <SettingButton label="Zgłoś problem" />
                <SettingButton label="Wersja aplikacji" />
                <SettingButton label="Resetuj ustawienia" />
                <SettingButton label="O aplikacji" />

                <LogoutButton />
            </ScrollView>
        </View>
    );
};

// Setting Button Component
const SettingButton = ({ label, destination }) => {
    const router = useRouter();  // Call useRouter here to handle navigation

    const handleNavigate = () => {
        router.push(destination);  // Navigate to the provided destination
    };

    return (
        <TouchableOpacity style={styles.settingButton} onPress={handleNavigate}>
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
