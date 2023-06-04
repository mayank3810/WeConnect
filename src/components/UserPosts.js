import { View, Text } from "react-native";
import React from "react";
import { colorSecondary, styles, text } from "../assets/styles/style";
import PageTitle from "./PageTitle";
import { Image } from "react-native";

const UserPosts = ({ post }) => {
  return (
    <View style={styles.user_posts}>
      <Image
        source={{
          uri: post.imageUrl,
        }}
        style={{
          aspectRatio: 1,
          borderWidth: 1,
          borderColor: colorSecondary,
          //   margin: 2,
          //   height: 100,
        }}
      ></Image>
    </View>
  );
};

export default UserPosts;
