const AddDogText = {
    en: {
        backButton: "Back",
        title: "Tell Us About Your Doggo",
        subtitle: "Because every good boy deserves a profile 🐶",
        nameLabel: "Dog Name",
        namePlaceholder: "Enter the name",
        breedLabel: "Breed",
        breedPlaceholder: "Enter the breed",
        weightLabel: (weight) => `Weight: ${weight} kg`,
        ageLabel: (age) => `Age: ${age} years`,
        heightLabel: (height) => `Height: ${height} cm`,
        imageLabel: "Dog Image",
        imagePlaceholder: "Tap to select image",
        uploadButton: "Upload",
    },

    pl: {
        backButton: "Wstecz",
        title: "Opowiedz nam o swoim piesku",
        subtitle: "Bo każdy dobry piesek zasługuje na profil 🐶",
        nameLabel: "Imię psa",
        namePlaceholder: "Wpisz imię",
        breedLabel: "Rasa",
        breedPlaceholder: "Wpisz rasę",
        weightLabel: (weight) => `Waga: ${weight} kg`,
        ageLabel: (age) => `Wiek: ${age} lat`,
        heightLabel: (height) => `Wzrost: ${height} cm`,
        imageLabel: "Zdjęcie psa",
        imagePlaceholder: "Kliknij, aby dodać zdjęcie",
        uploadButton: "Wyślij",
    },
};

export default AddDogText;
