import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import LogoutButton from '@/components/LogoutButton';
import COLORS from '@/constants/colorsApp';
import styles from '@/assets/styles/settings.styles';


export default function SettingsScreen() {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ustawienia</Text>

            <ScrollView contentContainerStyle={styles.scrollContainer}>

                {/* 1. Konto użytkownika */}
                <Text style={styles.sectionTitle}>Konto użytkownika</Text>
                <SettingButton label="Zmień username" />
                <SettingButton label="Zmień adres e-mail" />
                <SettingButton label="Zmień hasło" />
                <SettingButton label="Edytuj zdjęcie profilowe" />

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

                {/* <View style={{ height: 20 }} />  */}
                <LogoutButton />
            </ScrollView>

            {/* Przycisk wylogowania przyklejony na dole */}

        </View>
    );
};

const SettingButton = ({ label, onPress }) => (
    <TouchableOpacity style={styles.settingButton} onPress={onPress}>
        <Text style={styles.settingText}>{label}</Text>
    </TouchableOpacity>
);

const SettingSwitch = ({ label, value, onValueChange }) => (
    <View style={styles.settingSwitch}>
        <Text style={styles.settingText}>{label}</Text>
        <Switch value={value} onValueChange={onValueChange} />
    </View>
);


const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 60,
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 80,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 24,
        marginBottom: 8,
        color: COLORS.primary,
    },
    settingButton: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    settingText: {
        fontSize: 16,
    },
    settingSwitch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});