// Import React
import React, { useState } from "react";
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

// Import Image Picker
// import { launchImageLibrary } from "react-native-image-picker";
import ImagePicker from "react-native-image-picker";

const AddPost = () => {
  const [filePath, setFilePath] = useState({});

  const chooseFile = async () => {
    console.log("Cmaer clicked");

    ImagePicker.launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        console.log(response);
        this.setState({
          resourcePath: response,
        });
      }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.buttonStyle}
        onPress={chooseFile}
      >
        <Text style={styles.textStyle}>Choose Image</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: "black",
  },
  buttonStyle: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#DDDDDD",
    padding: 5,
    marginVertical: 50,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});
