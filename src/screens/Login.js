import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
  TextInput,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import { image, styles, text, view } from "../assets/styles/style";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutUp,
  SlideInUp,
} from "react-native-reanimated";

const Login = () => {
  const { height, width } = Dimensions.get("window");

  const [show, setShow] = useState(false);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Background>
      {!show && (
        <Animated.View style={view.center} exiting={FadeOutUp}>
          <Image
            source={require("../assets/images/logo/light.png")}
            style={{ resizeMode: "contain", width: "70%", height: 70 }}
          />

          <Image
            source={require("../assets/images/home-image.png")}
            style={[{ resizeMode: "contain" }]}
          />

          <Text style={[text.h3_blue, styles.mt20]}>
            SHARE . INSPIRE . CONNECT
          </Text>

          <TouchableOpacity
            style={[styles.button_round, styles.mt40]}
            onPress={() => {
              setShow(!show);
            }}
          >
            <Text style={text.white}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {show && (
        <Animated.View
          style={{
            height: height / 1.6,
            width: width,
            backgroundColor: "#fff",
            position: "absolute",
            bottom: 0,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            alignSelf: "center",
          }}
          entering={FadeIn}
        >
          <Image
            source={require("../assets/images/logo/dark.png")}
            style={{
              resizeMode: "contain",
              width: "70%",
              height: 70,
              alignSelf: "center",
              marginTop: 20,
            }}
          />
          <View style={[styles.mt40, styles.m10]}>
            <TextInput style={styles.text_input} placeholder="Email" />
            <TextInput
              style={styles.text_input}
              placeholder="Password"
              textContentType="password"
            />
            {/* <TouchableOpacity>
              <Text style={text.h3_blue}>Forgot Password ?</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                setShow(!show);
              }}
              style={[styles.btn]}
            >
              <Text style={text.white}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setShow(!show);
              }}
              style={[styles.btn, styles.mt20]}
            >
              <Text style={text.white}>Login with google</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </Background>
  );
};

export default Login;
