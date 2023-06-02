import { View, Text, Button } from "react-native";
import React, { useEffect } from "react";
import { TabBar } from "react-native-tab-view";
import { styles } from "../assets/styles/style";
import IconAnt from "react-native-vector-icons/AntDesign";
import IconIonic from "react-native-vector-icons/Ionicons";
import IconFeather from "react-native-vector-icons/Feather";

const BottomTabBar = (props) => {
  useEffect(() => {
    console.log(props);
  }, []);

  const iconSize = 28;
  const iconPrimaryColor = "#BDBDBD";
  const blueDark = "#5151C6";

  return (
    <View style={styles.footer}>
      <IconAnt
        onPress={() => {
          props.jumpTo("home");
        }}
        color={props.navigationState.index === 1 ? blueDark : iconPrimaryColor}
        name="home"
        size={iconSize}
      />
      <IconAnt color={iconPrimaryColor} name="appstore-o" size={iconSize} />
      <IconIonic
        color={"#fff"}
        style={[styles.add_btn]}
        name="add-circle"
        size={iconSize + 10}
        onPress={() => {
          props.jumpTo("addPost");
        }}
      />
      <IconIonic
        onPress={() => {
          props.jumpTo("profile");
        }}
        color={props.navigationState.index === 3 ? blueDark : iconPrimaryColor}
        name="person-outline"
        size={iconSize}
      />
      <IconFeather color={iconPrimaryColor} name="bell" size={iconSize} />
    </View>
  );
};

export default BottomTabBar;
