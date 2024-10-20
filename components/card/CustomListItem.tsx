import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Icon, Surface } from "react-native-paper";

const CustomListItem = ({ title, description, time, icon, onPress }: any) => {
  return (
    <Surface style={styles.container}>
      <TouchableOpacity style={styles.touch} onPress={onPress}>
        <View style={styles.leftIcon}>
          <Icon source={icon} size={20} color="white" />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Text style={styles.time}>{time}</Text>
      </TouchableOpacity>
    </Surface>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginLeft: -30,
    marginRight: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  touch: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10
  },
  leftIcon: {
    backgroundColor: "#6750a4",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    fontSize: 12,
    color: "gray",
  },
  time: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
});
