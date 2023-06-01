import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

const [currentStack, setCurrentStack] = useState("auth");

const Navigation = () => {
  useEffect(() => {
    checkLogin();
  }, []);

  const dispatch = useDispatch();

  const checkLogin = async (user) => {
    AsyncStorage.getItem("user").then(() => {
      dispatch(
        userLogin({
          user: user,
        })
      );
      setCurrentStack("main");
    });
  };

  return (
    <NavigationContainer>
      {currentStack === "auth" ? (
        <AuthStack.Navigator>
          <AuthStack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </AuthStack.Navigator>
      ) : (
        <MainStack.Navigator>
          <AuthStack.Screen
            name="Home"
            component={Home}
            //   options={{ headerShown: false }}
          />
        </MainStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
