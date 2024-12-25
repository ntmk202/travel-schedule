import {
  Dimensions,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Avatar, Card, Icon, Surface } from "react-native-paper";
import ButtonComponent from "../button/ButtonComponent";

const DetailScheduleModal = ({ visible, onDismiss, data }: any) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <Surface elevation={2} style={styles.surface}>
          <View style={[styles.row, styles.bar]}>
            <View style={[styles.row, { width: "80%" }]}>
              {data?.imageUrl ? (
                <Avatar.Image source={{ uri: data?.imageUrl }} size={30} />
              ) : (
                <Icon source="car-convertible" size={30} color="#6750a4" />
              )}
              <Text style={styles.title}>{data?.title || data?.name}</Text>
            </View>
            <TouchableOpacity onPress={onDismiss}>
              <Icon source="close-circle-outline" size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper}>
            <View>
              <Card.Cover source={{ uri: data?.imageUrl || 'https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png' }} />
              <TouchableOpacity
                onPress={
                  data?.url
                    ? () => {
                        Linking.openURL(data?.url).catch((err: any) =>
                          alert("Error! Failed to open the link")
                        );
                      }
                    : () => alert("Error! Failed to open the link")
                }
                style={[
                  styles.row,
                  {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    padding: 10,
                    borderRadius: 10,
                  },
                ]}
              >
                <View
                  style={{
                    backgroundColor: "#6750a4",
                    padding: 10,
                    borderRadius: 30,
                  }}
                >
                  <Icon source="near-me" size={20} color="#fff" />
                </View>
                <Text style={[styles.text, { maxWidth: 250 }]}>
                  {data?.address || "No address yet"}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.row,
                { justifyContent: "space-between", marginTop: 5 },
              ]}
            >
              <View style={styles.row}>
                <Icon
                  source="ticket-confirmation-outline"
                  size={20}
                  color="#6750a4"
                />
                <Text style={styles.text}>
                  {data?.price || data?.price_per_day} VND
                </Text>
              </View>
              <View style={styles.row}>
                <Icon source="star" size={20} color="#6750a4" />
                <Text style={styles.text}>
                  {data?.totalScore ? data?.totalScore : "0"} stars
                </Text>
              </View>
            </View>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <View style={styles.row}>
                <Icon source="clock-outline" size={20} color="#6750a4" />
                <Text style={styles.text}>{data?.timeVisited}</Text>
              </View>
              <View style={styles.row}>
                <Icon source="car-hatchback" size={20} color="#6750a4" />
                <Text style={styles.text}>{data?.distance_km} km</Text>
              </View>
            </View>
            <Text
              style={[styles.text, { textAlign: "justify", marginTop: 10 }]}
            >
              {data?.note}
              {"\n"}
              {data?.description}
            </Text>
            <ButtonComponent
              mode="contained"
              label="Change location"
              labelStyle={{ fontSize: 18 }}
              height={50}
              customstyle={{
                position: "absolute",
                margin: 20,
                bottom: 0,
                left: 0,
                right: 0,
              }}
              onPress={() => console.log("press")}
            />
          </View>
        </Surface>
      </View>
    </Modal>
  );
};

export default DetailScheduleModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  surface: {
    height: Dimensions.get("screen").height * 0.8,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  bar: {
    borderBottomWidth: 1,
    borderBottomColor: "#adadad",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  wrapper: {
    flex: 1,
    padding: 20,
    marginBottom: 30,
    gap: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: "RC_Medium",
  },
  text: {
    fontSize: 16,
    fontFamily: "RC_Regular",
  },
});
