import { StyleSheet, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

const ChatInput = ({value, onChangeText, onPress, left}: any) => {
  return (
    <View
      style={{
        bottom: 0,
        right: 0,
        left: 0,
        position: "absolute",
        padding: 20,
        backgroundColor: '#fff'
      }}
    >
      <TextInput
        mode="flat"
        placeholder="Write something ..."
        contentStyle={{fontFamily: 'RC_Regular'}}
        right={<TextInput.Icon icon="send" onPress={onPress}/>}
        left={left? left : undefined}
        value={value}
        onChangeText={onChangeText}
        style={{
          borderRadius: 5,
          backgroundColor: "#fff",
          borderWidth: 0.5,
          borderColor: '#adadad'
        }}
        underlineStyle={{ display: "none" }}
        multiline={true}
      />
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({});
