import { StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

const ButtonComponent = ({icon, mode, onPress, label, marginTop, height, labelStyle, customstyle, disabled}:any) => {
  return (
    <Button
      style={[marginTop !== undefined ? { marginTop } : {}, customstyle]}
      contentStyle = {height !== undefined ? {height} : styles.content}
      labelStyle = {[styles.label, labelStyle]}
      icon={icon? icon : undefined}
      mode={mode}
      onPress={onPress}
      disabled={disabled? disabled : undefined}
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
