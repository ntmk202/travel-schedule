import { Image } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";

export default function UserAvatar({ uri, size }: any) {
  return (
    <Avatar.Image
      size={size}
      style={{ alignSelf: "center" }}
      source={
        uri == undefined
          ? require("@/assets/images/default-user-icon.jpg")
          : { uri: uri }
      }
    />
  );
}
