
import { StyleSheet } from "react-native";
import texture from "@/constants/colorsApp";
import { useSettingsStore } from "@/store/settingStore";

const { color } = useSettingsStore();
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: texture[color].background,
        padding: 16,
        paddingBottom: 0,
    },
    dogContainer: {
        alignItems: 'center',
        marginRight: 10,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        position: "absolute",
    },
    mapCard: {
        flex: 1,
        backgroundColor: texture[color].cardBackground,
        borderRadius: 16,
        flex: 1,
        padding: 0,
        marginBottom: 4,
        overflow: "hidden",
        shadowColor: texture[color].black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: texture[color].border,
    },
    loading: {
        textAlign: 'center',
        padding: 8
    },
    infoContainer: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    dogsContainer: {
        flexDirection: 'row',
    },
    dogImage: {
        width: 50,
        height: 50,
        borderRadius: 16,
        marginRight: 8,
    },
    email: {
        fontSize: 14,
        color: texture[color].textSecondary,
        marginBottom: 4,
    },
    bookItem: {
        flexDirection: "row",
        backgroundColor: texture[color].cardBackground,
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        shadowColor: texture[color].black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: texture[color].border,
    },
    //Dodać
    deleteButton: {
        padding: 8,
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: texture[color].textPrimary,
        marginBottom: 8,
    },
});

export default styles;
