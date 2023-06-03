import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin, userLogin } from "../redux/userSlice";
import { TabView, SceneMap } from "react-native-tab-view";
import { useWindowDimensions } from "react-native";
import Camera from "../screens/Camera";
import Profile from "../screens/Profile";
import BottomTabBar from "../components/BottomTabBar";
import AddPost from "../screens/AddPost";

const AuthStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

const Navigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    // dispatch(checkLogin());
    console.log("User Email ==> " + currentUser);
  }, []);

  //   const dispatch = useDispatch();
  //   const [currentStack, setCurrentStack] = useState("auth");

  //   const checkLogin = async (user) => {
  //     AsyncStorage.getItem("user").then((currentUser) => {
  //       console.log("User Fetched");
  //       console.log(currentUser);
  //       if (currentUser) {
  //         dispatch(
  //           userLogin({
  //             user: JSON.parse(currentUser),
  //           })
  //         );
  //         setCurrentStack("Main");
  //       }
  //     });
  //   };

  function Auth() {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(1);
  const [routes] = useState([
    { key: "camera", title: "Camera" },
    { key: "home", title: "Home" },
    { key: "addPost", title: "AddPost" },
    { key: "profile", title: "Profile" },
  ]);

  const renderScene = SceneMap({
    camera: Camera,
    home: Home,
    addPost: AddPost,
    profile: Profile,
  });

  function Main() {
    return (
      // <MainStack.Navigator>
      //   <MainStack.Screen
      //     name="Home"
      //     component={Home}
      //     //   options={{ headerShown: false }}
      //   />
      // </MainStack.Navigator>
      <TabView
        sceneContainerStyle={{ backgroundColor: "#fff" }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={BottomTabBar}
        tabBarPosition="bottom"
      ></TabView>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          cardStyle: { backgroundColor: "#fff" },
        }}
      >
        {currentUser ? (
          <RootStack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          ></RootStack.Screen>
        ) : (
          <RootStack.Screen
            name="Auth"
            component={Auth}
            options={{ headerShown: false }}
          ></RootStack.Screen>
        )}
        {/* <RootStack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        ></RootStack.Screen> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
