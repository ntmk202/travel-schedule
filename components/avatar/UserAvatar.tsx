import { Image } from "react-native";
import React from "react";

export default function UserAvatar({customSource, uri}:any) {
  return (
    <Image
      source={customSource == undefined ? { uri: "../assets/images/default-user-icon.jpg" }:{uri: uri}}
      style={{
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: "center",
      }}
    />
  );
}
