// styles/create.styles.js
import { StyleSheet } from "react-native";
import texture from "@/constants/colorsApp";
import { useSettingsStore } from "@/store/settingStore";

const { color } = useSettingsStore();
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: texture[color].background,
    padding: 16,
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor: texture[color].background,
  },
  card: {
    backgroundColor: texture[color].cardBackground,
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    shadowColor: texture[color].black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: texture[color].border,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: texture[color].textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: texture[color].textSecondary,
    textAlign: "center",
  },
  slider: {
    width: '100%', height: 40
  },
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

  imagePicker: {
    width: "100%",
    height: 200,
    backgroundColor: texture[color].inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: texture[color].border,
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
    color: texture[color].textSecondary,
    marginTop: 8,
  },
  button: {
    backgroundColor: texture[color].primary,
    borderRadius: 12,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    shadowColor: texture[color].black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  backButton: {
    backgroundColor: texture[color].primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    flexDirection: "row",
    shadowColor: texture[color].black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: 100
  },

  buttonText: {
    color: texture[color].white,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonIcon: {
    marginRight: 8,
  },
});

export default styles;
