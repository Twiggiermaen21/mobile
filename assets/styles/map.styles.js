// styles/create.styles.js
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colorsApp";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    // marginHorizontal: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
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
  bottomCard: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    borderRadius: 50,
    padding: 10
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  form: {

    alignItems: "center",
  },
  formGroup: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },


  label: {
    fontSize: 14,
    color: COLORS.textPrimary,
    textAlign: "center",
    fontWeight: "500",
  },
  info: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    color: COLORS.textDark,
  },
  textArea: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    height: 100,
    color: COLORS.textDark,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 8,
  },
  starButton: {
    padding: 8,
  },
  imagePicker: {
    width: "100%",
    height: 200,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  placeholderContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: COLORS.textSecondary,
    marginTop: 8,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 25, // bardziej zaokrąglony, przy połowie wysokości
    height: 100,
    // paddingHorizontal: 24, // żeby był dłuższy niezależnie od tekstu
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignSelf: "flex-start", // opcjonalnie, żeby nie rozciągał się na całą szerokość
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.border,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'flex-start',
  },

  footer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2, // tylko w nowszych wersjach React Native; alternatywa: użyj marginRight
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 16, // lub zamiast tego daj marginRight w button
    marginHorizontal: 20
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },

  // Styl do mapy
  map: {
    ...StyleSheet.absoluteFillObject,

    position: "absolute",
  },
});

export default styles;
