// styles/login.styles.js
import { StyleSheet, Dimensions } from "react-native";
import texture from "@/constants/colorsApp";
import { useSettingsStore } from "@/store/settingStore";

const { color } = useSettingsStore();
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: texture[color].background,
        padding: 20,
        justifyContent: "center",
    },
    scrollViewStyle: {
        flex: 1,
        backgroundColor: texture[color].background,
    },
    topIllustration: {
        alignItems: "center",
        width: "100%",
    },
    illustrationImage: {
        width: width * 0.75,
        height: width * 0.75,
    },

    logoutButton: {
        backgroundColor: texture[color].primary,
        borderRadius: 12,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 24,
        shadowColor: texture[color].black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
    },
    logoutText: {
        color: texture[color].white,
        fontWeight: "600",
        marginLeft: 8,
    },

    card: {
        backgroundColor: texture[color].cardBackground,
        borderRadius: 16,
        padding: 24,
        shadowColor: texture[color].black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 2,
        borderColor: texture[color].border,
        marginTop: -24,
    },
    header: {
        alignItems: "center",
        marginBottom: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        color: texture[color].textPrimary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: texture[color].textSecondary,
        textAlign: "center",
    },
    formContainer: {
        marginBottom: 16,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        color: texture[color].textPrimary,
        fontWeight: "500",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: texture[color].inputBackground,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: texture[color].border,
        paddingHorizontal: 12,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 48,
        color: texture[color].textDark,
    },
    eyeIcon: {
        padding: 8,
    },
    button: {
        backgroundColor: texture[color].primary,
        borderRadius: 12,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        shadowColor: texture[color].black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonText: {
        color: texture[color].white,
        fontSize: 16,
        fontWeight: "600",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
    },
    footerText: {
        color: texture[color].textSecondary,
        marginRight: 5,
    },
    link: {
        color: texture[color].primary,
        fontWeight: "600",
    },
    settingSwitch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    }, settingButton: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    settingText: {
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 24,
        marginBottom: 8,
        color: texture[color].primary,
    }, scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 80,
    }, scrollContainer: {

        paddingBottom: 80,
    },
    ModalAroundBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    ModalBox: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    // button: {
    //     marginTop: 20,
    //     padding: 10,
    //     backgroundColor: '#007AFF',
    //     borderRadius: 8,
    // },
    // buttonText: {
    //     color: '#fff',
    //     fontWeight: 'bold',
    // },


    form: {
        marginBottom: 16,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        color: texture[color].textPrimary,
        fontWeight: "500",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: texture[color].inputBackground,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: texture[color].border,
        paddingHorizontal: 12,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 48,
        color: texture[color].textDark,
    },

});

export default styles;
