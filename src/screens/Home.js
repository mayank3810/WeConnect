import { View, Text } from "react-native";
import React from "react";
import { useSelector, useStore } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.currentUser);
  return (
    <View>
      <Text>Home{JSON.stringify(user)}</Text>
    </View>
  );
};

export default Home;
