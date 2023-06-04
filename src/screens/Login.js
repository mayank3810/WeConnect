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
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import { image, styles, text, view } from "../assets/styles/style";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  FadeOutUp,
  SlideInUp,
} from "react-native-reanimated";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const Login = () => {
  const { height, width } = Dimensions.get("window");

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const backAction = () => {
      setShow(false);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const navigation = useNavigation();

  const loginIn = () => {
    setLoading(true);
    console.log("Login");
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const docRef = doc(db, "users", userCredential.user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          await AsyncStorage.setItem("user", JSON.stringify(docSnap.data()));
          dispatch(
            userLogin({
              user: docSnap.data(),
            })
          );
          setLoading(false);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
          ToastAndroid.show("User Not Found", ToastAndroid.SHORT);
          setLoading(false);
        }

        // const user = userCredential.user;

        // console.log(user.providerData);
        // navigation.navigate("Main", { screen: "Home" });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        console.log(error);
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      });
  };

  const loginWithGoogle = () => {
    // const auth = getAuth();
    // const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     // // This gives you a Google Access Token. You can use it to access the Google API.
    //     // const credential = GoogleAuthProvider.credentialFromResult(result);
    //     // const token = credential.accessToken;
    //     // // The signed-in user info.
    //     const user = result.user;
    //     console.log(user.email);
    //     // IdP data available using getAdditionalUserInfo(result)
    //     // ...
    //   })
    //   .catch((error) => {
    //     // // Handle Errors here.
    //     // const errorCode = error.code;
    //     // const errorMessage = error.message;
    //     // // The email of the user's account used.
    //     // const email = error.customData.email;
    //     // // The AuthCredential type that was used.
    //     // const credential = GoogleAuthProvider.credentialFromError(error);
    //     // // ...
    //     console.log("Something Went Wrong");
    //   });

    setLoading(true);
    console.log("Login");
    const auth = getAuth();

    const user = {
      address: "",
      bio: "",
      createdAt: serverTimestamp(),
      email: email,
      followers: [],
      following: [],
      intrests: [],
      name: "",
      phone: "",
      posts: [],
      profileImg: "",
      username: "",
    };

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        const user = userCredential.user;

        console.log(user);
        navigation.navigate("RootStack", { screen: "Home" });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        console.log(error);
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      });
  };

  return (
    <Background>
      {!show && (
        <Animated.View
          style={view.center}
          exiting={FadeOutUp}
          entering={FadeInUp}
        >
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
        <>
          <Animated.Image
            source={require("../assets/images/login-bg.png")}
            style={{
              width: "115%",
              resizeMode: "contain",
              top: -height / 3.4,
            }}
            exiting={FadeOutDown}
            entering={FadeInDown}
          />
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
              <TextInput
                style={styles.text_input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                style={styles.text_input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
              />
              {/* <TouchableOpacity>
              <Text style={text.h3_blue}>Forgot Password ?</Text>
            </TouchableOpacity> */}
              <TouchableOpacity onPress={loginIn} style={[styles.btn]}>
                <Text style={text.white}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    "Login"
                  )}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setShow(true);
                  navigation.navigate("Auth", { screen: "Register" });
                }}
                style={[styles.btn, styles.mt20]}
              >
                <Text style={text.white}>Register</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </>
      )}
    </Background>
  );
};

export default Login;
