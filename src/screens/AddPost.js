import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Header from "../components/Header";
import { styles, text } from "../assets/styles/style";
import IconIonic from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Entypo";
import { ActivityIndicator } from "react-native";
import { Text } from "react-native";

import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useSelector } from "react-redux";
import {
  FieldValue,
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const AddPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageRef, setImageRef] = useState(null);
  const userId = useSelector((state) => state.currentUser[0]?.uid);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      const storage = getStorage();
      const storageRef = ref(
        storage,
        "posts/" + userId + "/" + Math.random().toString(36)
      );
      // console.log(result.assets[0].base64);
      console.log("Waiting to Upload");

      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        // console.log(.);
        setImageRef(snapshot.ref);
        // getDownloadURL(snapshot.ref);
      });
    }
  };

  const addPost = async () => {
    console.log("Add Post");
    const imageUrl = await getDownloadURL(imageRef);
    console.log("Image Caption ==> " + caption);
    console.log("Image Url ==> " + imageUrl);
    // setDoc(doc());
    // console.log(db);
    const date = Date.now().toString();
    addDoc(collection(db, "posts"), {
      imageUrl: imageUrl,
      caption: caption,
      date: serverTimestamp(),
      postedBy: {
        username: "test123",
        profileImg: "https://image/",
        name: "some",
        userUid: "some",
      },
      likes: 0,
      comments: [],
    }).then(async (resp) => {
      console.log(resp.id);
      const userPostsRef = doc(db, "users", userId);

      updateDoc(userPostsRef, {
        posts: arrayUnion(resp.id),
      }).then(() => {
        setImageRef(null);
        setImage(null);
        setCaption("");
        Alert.alert("Post Added");
      });
    });

    // if (resp) {
    //   console.log("postAdded");
    //   console.log(resp);
    // }
  };

  const resetUpload = async () => {
    deleteObject(imageRef).then(() => {
      console.log("File Deleted");
      setImageRef(null);
    });
    setImage(null);
    setCaption("");
  };

  return (
    <>
      <Header title={"Add Post"} />

      <ScrollView>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.contentContainer}
        >
          <View style={styles.imagePicker}>
            {image ? (
              <>
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", aspectRatio: 1 }}
                />
                <Icon
                  style={{ position: "absolute", top: 10, right: 10 }}
                  name="cross"
                  color={"#FA6650"}
                  size={28}
                  onPress={resetUpload}
                ></Icon>
              </>
            ) : (
              <TouchableOpacity
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
                onPress={pickImage}
              >
                <IconIonic color={"#BDBDBD"} name="add-a-photo" size={52} />
              </TouchableOpacity>
            )}
          </View>

          <TextInput
            style={styles.text_input_color}
            placeholder="Add Caption"
            multiline={true}
            numberOfLines={6}
            placeholderTextColor={"#303030"}
            value={caption}
            onChangeText={(text) => {
              setCaption(text);
            }}
          />
          {/* <TextInput
            style={styles.text_input_color}
            placeholder="Tags"
            placeholderTextColor={"#303030"}
            onChangeText={(text) => {}}
          /> */}
          <TouchableOpacity onPress={addPost} style={[styles.btn, styles.mt20]}>
            <Text style={text.white}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                "Post"
              )}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

export default AddPost;
