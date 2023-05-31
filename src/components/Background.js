import { View, Text, ImageBackground, SafeAreaView } from "react-native";
import React from "react";
import backImgSrc from "../assets/images/dark-background.png";
import { view } from "../assets/styles/style";

const Background = ({ children }) => {
  return (
    <View>
      <ImageBackground source={backImgSrc} style={{ height: "100%" }} />
      <SafeAreaView style={view.center}>{children}</SafeAreaView>
    </View>
  );
};

export default Background;
