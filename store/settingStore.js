import { create } from 'zustand';

// Tworzymy store do zarządzania językiem
const useSettingsStore = create((set) => ({
    lang: 'pl', // Domyślnie ustawiamy język na polski
    setLang: (newLang) => set({ lang: newLang }), // Funkcja zmieniająca język
}));

export { useSettingsStore };