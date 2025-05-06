import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export async function registerForPushNotificationsAsync() {
    let { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        status = newStatus;
    }

    if (status !== 'granted') {
        alert('Brak uprawnień do wyświetlania powiadomień!');
        return;
    }
}

export async function scheduleDailyReminder() {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.DEFAULT,
        });
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "🚶 Czas na spacer!",
            body: "Poranny spacer to świetny start dnia 🌞",
            sound: true,
        },
        trigger: { hour: 8, minute: 0, repeats: true },
    });

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "🌙 Jeszcze jeden spacer?",
            body: "Wieczorne przechadzki są dobre na sen 😴",
            sound: true,
        },
        trigger: { hour: 20, minute: 0, repeats: true },
    });
}
