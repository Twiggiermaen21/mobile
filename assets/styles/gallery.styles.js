
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colorsApp";
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const imageSize = windowWidth / 3 - 20;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 16,
        paddingBottom: 0,
    },
    loading: {
        textAlign: 'center',
        padding: 8
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: '90%',
        height: '80%',
    },

    bookItem: {
        flexDirection: "row",
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
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: COLORS.textPrimary,
        marginBottom: 8,
    },
    image: {
        width: imageSize,
        height: imageSize,
        margin: 5,
        borderRadius: 5,
    },
    noPhotosContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noPhotosText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },
});

export default styles;
