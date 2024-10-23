import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon, List } from "react-native-paper";
import CustomListItem from "../card/CustomListItem";

const DetailList = ({ onPress }: any) => {
  return (
    <List.Accordion
      id="1"
      title="Day 1"
      description="17/09/2024"
      style={styles.accordionStyle}
      titleStyle={styles.titleStyle}
      descriptionStyle={styles.descriptionStyle}
      right={({ isExpanded }) => (
        <Icon
          source={isExpanded ? "circle-slice-8" : "circle-outline"}
          size={24}
          color={isExpanded ? "#6750a4" : "#c3c3c3"}
        />
      )}
    >
      <View style={styles.line}>
        <CustomListItem
          title="Hotel Rest"
          description="Palm Springs Hotel"
          time="11:00 am"
          icon="map-marker-outline"
          onPress={onPress}
        />
      </View>
    </List.Accordion>
  );
};

export default DetailList;

const styles = StyleSheet.create({
  line: {
    marginLeft: 40,
    borderLeftWidth: 2,
    borderLeftColor: "#c3c3c3",
    borderStyle: "dashed",
  },
  accordionStyle: {
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#c3c3c3",
  },
  titleStyle: {
    fontFamily: "RC_Medium",
    fontSize: 18,
    lineHeight: 28,
  },
  descriptionStyle: {
    fontFamily: "RC_Regular",
  },
});
