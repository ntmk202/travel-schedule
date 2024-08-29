import { StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

const ButtonComponent = ({icon, mode, onPress, label, marginTop}:any) => {
  return (
    <Button
      style={marginTop !== undefined ? { marginTop } : {}}
      contentStyle = {styles.content}
      labelStyle = {styles.label}
      icon={icon? icon : undefined}
      mode={mode}
      onPress={onPress}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
    content: {
      height: 60,
    },
    label: {
      fontFamily: 'RC_SemiBold',
      fontSize: 20
    }
});
