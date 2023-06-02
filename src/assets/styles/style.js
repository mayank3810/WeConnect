import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

const blueDark = "#5151C6";
const blueLight = "#888BF4";

const text = StyleSheet.create({
  p: {
    fontSize: 14,
    color: "#586274",
  },
  title: {
    fontSize: 20,
    color: "#212121",
  },
  h3_blue: {
    fontSize: 16,
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#888BF4",
  },
  subtitle: {
    fontSize: 18,
    color: "#242424",
  },
  white: {
    color: "#fff",
  },
});

const view = StyleSheet.create({
  center: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

const styles = StyleSheet.create({
  m10: {
    margin: 10,
  },
  mt20: {
    marginTop: 20,
  },
  mt40: {
    marginTop: 40,
  },
  button_round: {
    alignItems: "center",
    backgroundColor: "rgba(208, 208, 208, 0.3)",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 38,
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#5151C6",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 38,
    color: "#fff",
  },
  close_btn: {
    alignItems: "flex-end",
    backgroundColor: "rgba(208, 208, 208, 0.3)",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 38,
  },
  add_btn: {
    // position: "absolute",
    // bottom: 10,
    backgroundColor: blueDark,
    padding: 10,
    paddingTop: 9,
    paddingLeft: 11,
    height: 58,
    width: 58,
    borderRadius: 200,
    transform: [{ translateY: -20 }],
  },
  text_input: {
    backgroundColor: "#F3F5F7",
    borderRadius: 30,
    padding: 10,
    paddingLeft: 20,
    width: "100%",
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1, // pushes the footer to the end of the screen
  },
  footer: {
    flex: 0,
    backgroundColor: "#F6F7F9",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 18,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
  },
});

export { text, view, styles };
