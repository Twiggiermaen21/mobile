import { create } from 'zustand';

// Tworzymy store do zarządzania językiem
const useSettingsStore = create((set) => ({
    lang: 'pl', // Domyślnie ustawiamy język na polski
    color: 'FOREST',
    setLang: (newLang) => set({ lang: newLang }), // Funkcja zmieniająca język
    setColor: (newColor) => set({ color: newColor }),

}));

export { useSettingsStore };