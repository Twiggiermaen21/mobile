import { StyleSheet } from "react-native";

const styles = (COLORS) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 16,
        paddingBottom: 0,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 16,
        textAlign: "center",
    },
    tiersContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 24,
    },
    tierBadge: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 8,
        alignItems: "center",
        textAlign: "center",
    },
    selectedIconWrapper: {
        backgroundColor: 'white',
        borderRadius: 30, 
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileHeader: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.cardBackground,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    tierText: {
        fontWeight: "600",
        color: "#333",
    },
    selectedTier: {
        borderWidth: 2,
        borderColor: "#000",
    },
    listContainer: {
        paddingBottom: 16,
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: COLORS.cardBackground,
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    rank: {
        fontWeight: "700",
        fontSize: 16,
        width: 30,
    },
    name: {
        fontSize: 16,
        flex: 1,
    },
    walks: {
        fontSize: 16,
        color: "#4CAF50",
        fontWeight: "600",
    },
});

export default styles;
