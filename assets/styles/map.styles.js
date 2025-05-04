
import { StyleSheet } from "react-native";
const styles = (COLORS) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cameraButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 40,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2, 
    zIndex: 10,
  },
  mapCard: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    marginBottom: 4,
    overflow: "hidden",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
    flex: 1, padding: 0, overflow: 'hidden'
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
  formGroup: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },
  buttonDisabled: {
    backgroundColor: 'gray',
    opacity: 0.5,
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
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignSelf: "flex-start",
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    justifyContent: 'center',
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 16,
  },
  ModalAroundBox: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ModalBox: {
    borderRadius: 10,
    width: '80%',
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    marginVertical: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pressableDogs: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 4,
  },
  buttonDone: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDogsContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  dogsListContent: {
    paddingHorizontal: 10,
  },

  dogItem: {
    alignItems: 'center',
    marginRight: 10,
  },
  dogImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },

  dogName: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
  },
});

export default styles;
