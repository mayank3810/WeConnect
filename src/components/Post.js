import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import {
  colorSecondary,
  iconColor,
  redColor,
  styles,
  text,
} from "../assets/styles/style";
import IconIonic from "react-native-vector-icons/Ionicons";
import IconFont from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";
import { useState } from "react";

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);

  const { height, width } = Dimensions.get("window");

  return (
    <View style={{ marginBottom: 25 }}>
      <View style={{ marginLeft: 5, marginBottom: 10, flexDirection: "row" }}>
        <Image
          source={
            post.postedBy.profileImg.length > 0
              ? { uri: post.postedBy.profileImg }
              : {
                  uri: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
                }
          }
          style={{
            aspectRatio: 1,
            borderRadius: 100,
            height: 40,
            borderWidth: 1,
            borderColor: colorSecondary,
          }}
        />

        <Text style={[{ alignSelf: "center", marginLeft: 10 }, text.h3_blue]}>
          {post.postedBy.username}
        </Text>
      </View>
      <Image
        source={{ uri: post.imageUrl }}
        style={{ aspectRatio: 1, borderWidth: 1, borderColor: colorSecondary }}
      ></Image>
      {/* <Text>{post.imageUrl}</Text> */}
      <View
        style={{
          flexDirection: "row",
          marginTop: 5,
          //   justifyContent: "space-between",
        }}
      >
        {liked ? (
          <TouchableOpacity
            style={[styles.m10, styles.mv5]}
            onPress={() => setLiked(!liked)}
          >
            <IconFont name="heart" size={28} color={redColor} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.m10, styles.mv5]}
            onPress={() => setLiked(!liked)}
          >
            <IconFont size={28} color={iconColor} name="heart-o" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.m10, styles.mv5]}
          onPress={() => setLiked(!liked)}
        >
          <IconFont size={28} color={iconColor} name="comment-o" />
        </TouchableOpacity>
        <View
          style={{
            alignSelf: "center",
            marginLeft: width - 200,
          }}
        >
          <Text style={text.p}>
            {new Date(post.date.toDate()).toLocaleDateString("en-us", {
              //   weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Text>
        </View>
      </View>
      <Text style={[text.p, { marginLeft: 10 }]}>{post.likes + " likes"}</Text>
      <Text style={[text.p, { marginLeft: 10 }]}>{post.caption}</Text>
    </View>
  );
};

export default Post;
