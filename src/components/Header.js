import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import IconIonic from "react-native-vector-icons/Ionicons";
import { styles, text } from "../assets/styles/style";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
const Header = ({ title, children }) => {
  //   const navigation = useNavigation();
  return (
    <View style={styles.header}>
      {/* <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <IconIonic name={"arrow-back"} size={24} color={"#BDBDBD"} />
      </TouchableOpacity> */}
      {!title ? (
        <Image
          source={require("../assets/images/logo/dark.png")}
          style={{ resizeMode: "contain", width: "55%", height: 30 }}
        />
      ) : (
        <Text style={[text.title, { width: "100%", height: 25 }]}>{title}</Text>
      )}
      {children}
    </View>
  );
};

export default Header;
