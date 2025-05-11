# 🐾 PetWalk – Frontend mobilny

To jest frontend mobilnej aplikacji **PetWalk**, stworzonej przy użyciu [Expo](https://expo.dev) oraz React Native. Aplikacja umożliwia użytkownikom organizowanie i umawianie spacerów z psami w łatwy i intuicyjny sposób.

## 🧩 Funkcje aplikacji

- 🔐 **Logowanie i rejestracja użytkowników**
- 🐶 **Dodawanie psów** do swojego profilu
- 🚶 **Wybieranie psów na spacer**
- 🗺️ **Śledzenie spaceru** w czasie rzeczywistym:
  - Trasa na mapie
  - Czas trwania
  - Prędkość
  - Dystans
- 📖 **Historia spacerów**:
  - Lista poprzednich spacerów
  - Szczegóły spaceru (data, trasa, czas itd.)
- 📸 **Dodawanie zdjęć ze spaceru** – możliwość robienia zdjęć w trakcie spaceru i zapisywania ich w historii
- 🎨 **Ustawienia aplikacji** – zmiana koloru motywu, języka i innych preferencji

## 🛠️ Planowane funkcje

- ✅ **Weryfikacja e-mailowa po rejestracji** – dodatkowa warstwa bezpieczeństwa i potwierdzenie tożsamości użytkownika
- 🧩 ** Tryb Offline** - korzystanie z aplikacji bez łączności z internetem.

## 🚀 Jak zacząć?

1. Sklonuj repozytorium:

   ```bash
   git clone https://github.com/twoj-login/PetWalk-frontend.git
   cd PetWalk-frontend
   ```

2. Zainstaluj zależności:

   ```bash
   npm install
   ```

3. Dodaj klucz API Google Maps do pliku `app.json`:

   ```json
   "googleMaps": {
     "apiKey": "TWOJ_KLUCZ_API"
   }
   ```

4. Uruchom aplikację:

   ```bash
   npx expo start
   ```

5. Wybierz platformę:

   - [Development Build](https://docs.expo.dev/develop/development-builds/introduction/)
   - [Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)
   - [Expo Go](https://expo.dev/go)
