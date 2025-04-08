import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

export default function SettingsScreen() {
    const [notifications, setNotifications] = React.useState(true);
    const [darkMode, setDarkMode] = React.useState(false);

    return (

        <View style={styles.container}>
            <Text style={styles.title}>Ustawienia</Text>

            <View style={styles.setting}>
                <Text>Powiadomienia</Text>
                <Switch
                    value={notifications}
                    onValueChange={setNotifications}
                />
            </View>

            <View style={styles.setting}>
                <Text>Tryb ciemny</Text>
                <Switch
                    value={darkMode}
                    onValueChange={setDarkMode}
                />
            </View>

            <TouchableOpacity style={styles.button}
            // onPress={this.startTracking}
            >
                <Text style={styles.buttonText} >
                    Wyloguj
                </Text>
            </TouchableOpacity>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#F9F9F9',

    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 24,
        top: 60
    },
    setting: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        top: 60
    },
    button: {
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#238C23',
        justifyContent: 'center',
        marginInline: 'auto',
        top: 100


    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20
    }
});
