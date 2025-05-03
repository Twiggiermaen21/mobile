// styles/signup.styles.js
import { StyleSheet } from "react-native";
import texture from "@/constants/colorsApp";
import { useSettingsStore } from "@/store/settingStore";

const { color } = useSettingsStore();
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: texture[color].background,
    padding: 20,
    justifyContent: "center",
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
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: "JetBrainsMono-Medium",
    color: texture[color].primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: texture[color].textSecondary,
    textAlign: "center",
  },
  formContainer: { marginBottom: 16 },
  inputGroup: { marginBottom: 20 },
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
  inputIcon: { marginRight: 10 },
  input: {
    flex: 1,
    height: 48,
    color: texture[color].textDark,
  },
  eyeIcon: { padding: 8 },
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
});

export default styles;
