import { View, Text } from "react-native";
import React from "react";
import { blueDark, text } from "../assets/styles/style";
import Icon from "react-native-vector-icons/Octicons";

const PageTitle = ({ title }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Icon
        style={{ alignSelf: "center", paddingHorizontal: 20 }}
        name="dot-fill"
        color={blueDark}
        size={14}
      />
      <Text style={text.title}>{title}</Text>
      <Icon
        style={{ alignSelf: "center", paddingHorizontal: 20 }}
        name="dot-fill"
        color={blueDark}
        size={14}
      />
    </View>
  );
};

export default PageTitle;
