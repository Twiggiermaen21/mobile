const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#fff",
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
        elevation: 2,
        marginRight: 8,
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
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#f9f9f9",
        borderRadius: 12,
        marginBottom: 12,
        elevation: 1,
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
