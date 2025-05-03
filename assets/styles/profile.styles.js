// styles/profile.styles.js
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
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: texture[color].cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: texture[color].black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: texture[color].border,
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
    color: texture[color].textPrimary,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: texture[color].textSecondary,
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 12,
    color: texture[color].textSecondary,
  },
  booksHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  booksList: {
    paddingBottom: 20,
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
    color: texture[color].gray,
    fontSize: 16,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: texture[color].textPrimary,
    marginBottom: 4,
  },
  bookCaption: {
    fontSize: 14,
    color: texture[color].textDark,
    marginBottom: 4,
    flex: 1,
  },
  deleteButton: {
    padding: 8,
    justifyContent: "center",
  },
  addButton: {
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
  addButtonText: {
    color: texture[color].white,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default styles;
