import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView, Image } from "react-native";
import styles from "../../assets/styles/create.styles";

// Przypisanie użytkowników do odpowiednich rang, dodając zdjęcia awatarów
const mockRanking = {
    Diament: Array(20).fill(null).map((_, index) => ({
        name: `User ${index + 1}`,
        walks: Math.floor(Math.random() * 100),
        profileImage: `https://api.dicebear.com/9.x/avataaars/svg?seed=User${index + 1}`, // Unikalne awatar na podstawie nazwy użytkownika
    })),
    Gold: Array(20).fill(null).map((_, index) => ({
        name: `User ${index + 21}`,
        walks: Math.floor(Math.random() * 100),
        profileImage: `https://api.dicebear.com/9.x/avataaars/svg?seed=User${index + 21}`,
    })),
    Silver: Array(20).fill(null).map((_, index) => ({
        name: `User ${index + 41}`,
        walks: Math.floor(Math.random() * 100),
        profileImage: `https://api.dicebear.com/9.x/avataaars/svg?seed=User${index + 41}`,
    })),
    Bronze: Array(20).fill(null).map((_, index) => ({
        name: `User ${index + 61}`,
        walks: Math.floor(Math.random() * 100),
        profileImage: `https://api.dicebear.com/9.x/avataaars/svg?seed=User${index + 61}`,
    })),
    Platinum: Array(20).fill(null).map((_, index) => ({
        name: `User ${index + 81}`,
        walks: Math.floor(Math.random() * 100),
        profileImage: `https://api.dicebear.com/9.x/avataaars/svg?seed=User${index + 81}`,
    })),
    Titanium: Array(20).fill(null).map((_, index) => ({
        name: `User ${index + 101}`,
        walks: Math.floor(Math.random() * 100),
        profileImage: `https://api.dicebear.com/9.x/avataaars/svg?seed=User${index + 101}`,
    })),
    Copper: Array(20).fill(null).map((_, index) => ({
        name: `User ${index + 121}`,
        walks: Math.floor(Math.random() * 100),
        profileImage: `https://api.dicebear.com/9.x/avataaars/svg?seed=User${index + 121}`,
    })),
    Steel: Array(20).fill(null).map((_, index) => ({
        name: `User ${index + 141}`,
        walks: Math.floor(Math.random() * 100),
        profileImage: `https://api.dicebear.com/9.x/avataaars/svg?seed=User${index + 141}`,
    })),
    Ruby: Array(20).fill(null).map((_, index) => ({
        name: `User ${index + 161}`,
        walks: Math.floor(Math.random() * 100),
        profileImage: `https://api.dicebear.com/9.x/avataaars/svg?seed=User${index + 161}`,
    })),
    Emerald: Array(20).fill(null).map((_, index) => ({
        name: `User ${index + 181}`,
        walks: Math.floor(Math.random() * 100),
        profileImage: `https://api.dicebear.com/9.x/avataaars/svg?seed=User${index + 181}`,
    })),
};

const tiers = [
    { name: "Diament", color: "#b9f2ff" },
    { name: "Gold", color: "#ffd700" },
    { name: "Silver", color: "#c0c0c0" },
    { name: "Bronze", color: "#cd7f32" },
    { name: "Platinum", color: "#e5e4e2" },
    { name: "Titanium", color: "#dcdcdc" },
    { name: "Copper", color: "#b66a34" },
    { name: "Steel", color: "#595959" },
    { name: "Ruby", color: "#9b111e" },
    { name: "Emerald", color: "#50c878" },
];

export default function LeagueScreen() {
    const [selectedTier, setSelectedTier] = useState("Diament");

    const handleTierPress = (tierName) => {
        setSelectedTier(tierName);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🏆 Liga spacerowiczów</Text>

            {/* Górna część – Tiers (poziomy ScrollView) */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {tiers.map((tier, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.tierBadge,
                            { backgroundColor: tier.color },
                            selectedTier === tier.name && styles.selectedTier,
                        ]}
                        onPress={() => handleTierPress(tier.name)}
                    >
                        <Text style={styles.tierText}>{tier.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Dolna część – Ranking (użytkownicy w zależności od wybranego tieru) */}
            <FlatList
                data={mockRanking[selectedTier]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.item}>
                        <Image
                            source={{ uri: item.profileImage }} // Wyświetlanie awatara użytkownika
                            style={styles.profileImage}
                        />
                        <Text style={styles.rank}>{index + 1}.</Text>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.walks}>{item.walks} spacerów</Text>
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}
