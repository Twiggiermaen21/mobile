
import { StyleSheet } from "react-native";
import texture from "@/constants/colorsApp";
import { useSettingsStore } from "@/store/settingStore";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const imageSize = windowWidth / 3 - 20;
const { color } = useSettingsStore();
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: texture[color].background,
        padding: 16,
        paddingBottom: 0,
    },
    loading: {
        textAlign: 'center',
        padding: 8
    },
    modalWrapper: {
        flex: 1,
        backgroundColor: texture[color].background,
        justifyContent: 'space-between',
    },
    fullImage: {
        width: '90%',
        height: '80%',

    },
    ImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 15,
        // backgroundColor: texture[color].border,

        backgroundColor: texture[color].primary,
        borderRadius: 12,
        padding: 12,

        marginHorizontal: 24,
        shadowColor: texture[color].black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,

        bottom: 10,
        left: 0,
        right: 0,


    },
    iconContainer: {
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        paddingHorizontal: 40,
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        color: texture[color].textPrimary,
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
        color: texture[color].textSecondary,
        marginBottom: 4,
    },
});

export default styles;
