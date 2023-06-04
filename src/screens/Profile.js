import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  colorSecondary,
  iconColor,
  styles,
  text,
} from "../assets/styles/style";
import Header from "../components/Header";
import IconIonic from "react-native-vector-icons/MaterialCommunityIcons";
import UserPosts from "../components/UserPosts";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  FieldPath,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLogin } from "../redux/userSlice";
import { db } from "../../firebase";
import { ActivityIndicator } from "react-native";

const Profile = () => {
  const { height, width } = Dimensions.get("window");
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Current User ==> ");
    console.log(currentUser);
    // refreshProfile();
    userPosts();
  }, []);

  const userPosts = async () => {
    console.log(currentUser.posts);
    setLoading(true);

    const q = query(
      collection(db, "posts"),
      where(documentId(), "in", currentUser.posts)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setPosts((posts) => [...posts, doc.data()]);
    });
    setLoading(false);
  };

  const refreshProfile = async () => {
    const docRef = doc(db, "users", currentUser.email.toLowerCase());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      await AsyncStorage.setItem("user", JSON.stringify(docSnap.data()));
      dispatch(
        userLogin({
          user: docSnap.data(),
        })
      );
    }
  };

  return (
    <>
      <Header />

      <ScrollView style={styles.contentContainer}>
        <View style={styles.profile_card}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={
                currentUser.profileImg.length > 0
                  ? { uri: currentUser.profileImg }
                  : {
                      uri: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
                    }
              }
              style={{
                aspectRatio: 1,
                borderRadius: 100,
                height: 70,
                borderWidth: 1,
                alignSelf: "center",
                borderColor: colorSecondary,
              }}
            />
            <IconIonic
              style={{ position: "absolute", top: -15, right: 0 }}
              name="account-edit-outline"
              color={iconColor}
              size={28}
            />
            <View
              style={{
                flexDirection: "column",
                alignSelf: "center",
                marginLeft: 20,
              }}
            >
              <Text style={[text.h3_blue, { marginBottom: 5 }]}>
                {currentUser.username}
              </Text>
              <Text style={[text.p, { width: "35%", overflow: "hidden" }]}>
                {currentUser.bio}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 25,
              justifyContent: "space-between",
              paddingHorizontal: 20,
            }}
          >
            <View style={{ paddingHorizontal: 20 }}>
              <Text style={[text.title, { textAlign: "center" }]}>
                {currentUser.posts.length.toString()}
              </Text>
              <Text style={text.p}>Posts</Text>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
              <Text style={[text.title, { textAlign: "center" }]}>
                {currentUser.followers.length.toString()}
              </Text>
              <Text style={text.p}>Followers</Text>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
              <Text style={[text.title, { textAlign: "center" }]}>
                {currentUser.following.length.toString()}
              </Text>
              <Text style={text.p}>Following</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <PageTitle title={"posts"} />
          <View
            style={{
              marginTop: 20,
              width: width,
              flexDirection: "row",
              flexWrap: "wrap",

              // paddingRight: 10,
            }}
          >
            {posts.length ? (
              posts.map((post) => <UserPosts key={Math.random()} post={post} />)
            ) : (
              // <Text>{JSON.stringify(posts)}</Text>
              <ActivityIndicator
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                }}
                size={"large"}
                color={"#212121"}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Profile;
