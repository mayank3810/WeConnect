import { StyleSheet } from "react-native";

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
  text_input: {
    backgroundColor: "#F3F5F7",
    borderRadius: 30,
    padding: 10,
    paddingLeft: 20,
    width: "100%",
    marginBottom: 20,
  },
});

export { text, view, styles };
