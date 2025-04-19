
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colorsApp";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 16,
        paddingBottom: 0,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
    },

    item: {
        flexDirection: 'row',
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
        elevation: 2,
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
        backgroundColor: COLORS.cardBackground,
        borderRadius: 16,
        // marginHorizontal: 2,
        marginBottom: 4,
        overflow: "hidden",
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: COLORS.border,
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
    infoText: {
        fontSize: 14,
        marginBottom: 4,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
    },
    profileInfo: {
        flex: 1,
    },
    username: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },
    memberSince: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },

    booksHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    booksTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.textPrimary,
    },
    booksCount: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    booksList: {
        paddingBottom: 20,
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
    bookImage: {
        width: 70,
        height: 100,
        borderRadius: 8,
        marginRight: 12,
    },
    bookInfo: {
        flex: 1,
        justifyContent: "space-between",
    }, noDogsText: {
        textAlign: 'center',
        marginVertical: 20,
        color: COLORS.gray,
        fontSize: 16,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: "row",
        marginBottom: 4,
    },
    bookCaption: {
        fontSize: 14,
        color: COLORS.textDark,
        marginBottom: 4,
        flex: 1,
    },
    bookDate: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    deleteButton: {
        padding: 8,
        justifyContent: "center",
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        marginTop: 20,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.textPrimary,
        marginTop: 16,
        marginBottom: 20,
        textAlign: "center",
    },
    addButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 20,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    addButtonText: {
        color: COLORS.white,
        fontWeight: "600",
        fontSize: 14,
    }, title: {
        fontSize: 24,
        fontWeight: "700",
        color: COLORS.textPrimary,
        marginBottom: 8,
    },
});

export default styles;
