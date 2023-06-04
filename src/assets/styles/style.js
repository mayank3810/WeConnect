import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

export const blueDark = "#5151C6";
export const blueLight = "#888BF4";
export const colorSecondary = "#BDBDBD";
export const iconColor = "#212121";
export const redColor = "#FA6650";

const text = StyleSheet.create({
  p: {
    fontSize: 14,
    color: "#586274",
  },
  title: {
    fontSize: 20,
    color: "#212121",
    textTransform: "uppercase",
    fontWeight: 700,
  },
  h3_blue: {
    fontSize: 16,
    fontWeight: 700,
    textTransform: "uppercase",
    color: blueDark,
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
  ml10: {
    marginLeft: 10,
  },
  mr10: {
    marginRight: 10,
  },
  mv5: {
    marginVertical: 5,
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
    // flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  footer: {
    backgroundColor: "#F6F7F9",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    // shadowColor: "#000000",
    // shadowOffset: {
    //   width: 18,
    //   height: 18,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 20.0,
    // elevation: 24,
    // borderTopLeftRadius: 50,
    // borderTopRightRadius: 50,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    paddingTop: 50,
    // backgroundColor: "#F6F7F9",
    // shadowColor: "#000000",
    // shadowOffset: {
    //   width: 0,
    //   height: 18,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 20.0,
    // elevation: 3,
  },
  imagePicker: {
    backgroundColor: "#F1F1FE",
    justifyContent: "center",
    alignItems: "center",
    // height: height / 2,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: colorSecondary,
    borderStyle: "dashed",
  },
  text_input_color: {
    backgroundColor: "#F1F1FE",
    // marginVertical: 15,
    // paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: "#303030",
    // fontWeight: "700",
    fontSize: 16,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 0,
  },
  profile_card: {
    position: "relative",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    // height: 130,
    backgroundColor: "#F3F5F7",
    // flexDirection: "row",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 3,
  },
  user_posts: {
    width: "31%",
    height: "31%",
    aspectRatio: 1,
    margin: 1,

    // marginTop: 20,
  },
});

export { text, view, styles };
