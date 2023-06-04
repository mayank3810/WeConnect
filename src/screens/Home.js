import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutUser, userLogout } from "../redux/userSlice";
import { styles } from "../assets/styles/style";
import Post from "../components/Post";
import Header from "../components/Header";
import IconIonic from "react-native-vector-icons/Ionicons";
import { db } from "../../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { ActivityIndicator } from "react-native";

const Home = ({ navigation }) => {
  const user = useSelector((state) => state.currentUser);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const _logout = async () => {
    console.log("Logout");
    // await AsyncStorage.removeItem("user");
    dispatch(logoutUser());
  };

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    console.log("Getting Posts");
    const q = query(collection(db, "posts"), orderBy("date", "desc"));

    const querySnapshot = await getDocs(q);
    if (querySnapshot) {
      setLoading(false);
      // setPosts(querySnapshot);
    }
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());

      setPosts((posts) => [...posts, doc.data()]);
    });
  };

  return (
    <>
      <Header>
        <IconIonic
          name="chatbox-ellipses-outline"
          color={"#212121"}
          size={28}
        />
      </Header>
      <ScrollView style={styles.contentContainer}>
        {posts.length ? (
          posts.map((post) => <Post key={Math.random()} post={post} />)
        ) : (
          // <Text>{JSON.stringify(posts)}</Text>
          <ActivityIndicator
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
            size={"large"}
            color={"#212121"}
          />
        )}

        <Button
          onPress={() => {
            _logout();
          }}
          title="Logout"
        >
          Logout
        </Button>
      </ScrollView>
    </>
  );
};

export default Home;
