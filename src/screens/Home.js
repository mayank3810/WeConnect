import { View, Text } from "react-native";
import React from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutUser, userLogout } from "../redux/userSlice";
import { styles } from "../assets/styles/style";

const Home = ({ navigation }) => {
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const _logout = async () => {
    console.log("Logout");
    // await AsyncStorage.removeItem("user");
    dispatch(logoutUser());
  };

  return (
    <>
      <View style={styles.contentContainer}>
        <Text>Home{JSON.stringify(user)}</Text>
        <Button
          onPress={() => {
            _logout();
          }}
          title="Logout"
        >
          Logout
        </Button>
      </View>
    </>
  );
};

export default Home;
