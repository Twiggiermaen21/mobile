/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  natural: {
    primary: '#4CAF50',     // Zieleń lasu
    secondary: '#F5F5DC',   // Beż piasku
    accent: '#2C3E50',      // Granat
    background: '#ECF0F1',  // Biała mgła
  },
  dogFriendly: {
    primary: '#DAB894',     // Karmelowy
    secondary: '#AEDFF7',   // Jasny błękit
    accent: '#FFF3B0',      // Pastelowy żółty
    background: '#888888',  // Szary
  },
  urbanWalk: {
    primary: '#D96C06',     // Ceglany czerwony
    secondary: '#264653',   // Głęboki błękit
    accent: '#81B29A',      // Jasna zieleń
    background: '#F4A261',  // Piaskowy beż
  },
};
