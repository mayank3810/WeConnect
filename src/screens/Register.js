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
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const Register = () => {
  const { height, width } = Dimensions.get("window");

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState(false);
  const [name, setName] = useState(false);
  const [password, setPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
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
        setLoading(false);
        const user = userCredential.user;
        await AsyncStorage.setItem("user", JSON.stringify(user.providerData));
        dispatch(
          userLogin({
            user: user.providerData,
          })
        );
        console.log(user.providerData);
        // navigation.navigate("Main", { screen: "Home" });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        console.log(error);
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      });
  };

  const loginWithGoogle = async () => {
    const database = db;
    // const batch = database.batch();

    setLoading(true);
    console.log("Registering");
    const auth = getAuth();

    let _username = name;

    const index = _username.indexOf(" ");
    _username = _username.toLowerCase();
    _username = _username.slice(0, index);
    _username = _username + Math.random().toString().slice(3, 7);

    const _user = {
      address: "",
      bio: "",
      createdAt: serverTimestamp(),
      email: email,
      followers: [],
      following: [],
      intrests: [],
      name: name,
      phone: "",
      posts: [],
      profileImg: "",
      username: _username,
    };

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        // console.log(userCredential.user.email);

        // const docRef = doc();

        const docRef = doc(db, "users", userCredential.user.email);
        setDoc(docRef, _user).then((resp) => {
          setLoading(false);
          console.log(resp);
          Alert.alert("Thank You for Registering");
          setTimeout(() => {
            navigation.navigate("Auth", { screen: "Login" });
          }, 200);
        });

        // console.log(userCredential);
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
              placeholder="Name"
              onChangeText={(text) => setName(text)}
            />
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

            <TouchableOpacity
              onPress={loginWithGoogle}
              style={[styles.btn, styles.mt20]}
            >
              <Text style={text.white}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  "Register"
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </>
    </Background>
  );
};

export default Register;
