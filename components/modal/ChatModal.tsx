import React, { useEffect, useState, useRef } from "react";
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Icon, Surface, TextInput } from "react-native-paper";
import { collection, addDoc, onSnapshot, query, orderBy, doc, getDoc, getDocs } from "firebase/firestore";
import { db, auth } from "@/configs/FirebaseConfig";
import GroupAvatar from "../avatar/GroupAvatar";
import ChatInput from "../input/ChatInput";
import { useAuth } from "@/configs/authConfig";
import UserAvatar from "../avatar/UserAvatar";

interface ChatModalProps {
  visible: boolean;
  onDismiss: () => void;
  tripData: string | any;
}

interface Message {
  id: string;
  text: string;
  createdAt: string;
  userId: string;
  userName: string;
  avatar: string;
}

const ChatModal: React.FC<ChatModalProps> = ({ visible, onDismiss, tripData }) => {
  const [message, setMessage] = useState<string | null>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [channelExists, setChannelExists] = useState<boolean>(false);
  const [channelId, setChannelId] = useState<string | null>(null);
  const [userData, setUserData] = useState<{ [key: string]: { avatar: string; userName: string } }>({});
  const scrollViewRef = useRef<ScrollView>(null);
  const userRef = auth.currentUser;

  useEffect(() => {
    // Check if the trip is shared and get the channel ID
    const checkSharedTrip = async () => {
      const sharedTripRef = query(collection(db, "users", userRef?.uid ?? "", "sharedTrips"));
      const sharedTripSnap = await getDocs(sharedTripRef);
      let foundSharedTrip = false;
      let ownerId = null;

      sharedTripSnap.forEach((doc) => {
        const sharedTripData = doc.data();
        if (sharedTripData.tripId === tripData) {
          ownerId = sharedTripData.ownerId;
          foundSharedTrip = true;
        }
      });

      if (foundSharedTrip && ownerId) {
        setChannelId(ownerId);  // Use the ownerId if it's a shared trip
      } else {
        setChannelId(userRef?.uid ?? "");  // Use the current user if it's not a shared trip
      }
    };

    checkSharedTrip();
  }, [tripData, userRef]);

  useEffect(() => {
    if (!channelId) return;

    const checkChannel = async () => {
      const channelRef = doc(db, "users", channelId, "channels", tripData);
      const channelSnapshot = await getDoc(channelRef);
      setChannelExists(channelSnapshot.exists());
    };

    checkChannel();
  }, [channelId, tripData]);

  useEffect(() => {
    if (!channelExists) return;

    const messagesRef = collection(db, "users", channelId ?? "", "channels", tripData, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(loadedMessages);
    });

    return unsubscribe; // Cleanup on unmount
  }, [channelExists, tripData, channelId]);

  // Fetch user data (avatar and username) in real-time
  useEffect(() => {
    const unsubscribeUserData = onSnapshot(collection(db, "users"), (snapshot) => {
      const userData: { [key: string]: { avatar: string; userName: string } } = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        userData[doc.id] = {
          avatar: data.avatar,
          userName: data.username,
        };
      });
      setUserData(userData);
    });

    return unsubscribeUserData;
  }, []);

  const sendMessage = async () => {
    if (message?.trim() && userRef?.uid && channelExists) {
      const messagesRef = collection(db, "users", channelId ?? "", "channels", tripData, "messages");
      await addDoc(messagesRef, {
        text: message,
        createdAt: new Date().toISOString(),
        userId: userRef.uid
      });
      setMessage("");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 10}
      >
        <Surface elevation={2} style={styles.surface}>
          <View style={[styles.row, styles.bar]}>
            <View style={[styles.row, { width: "80%" }]}>
              <GroupAvatar />
              <Text style={styles.title}>Chat</Text>
            </View>
            <TouchableOpacity onPress={onDismiss}>
              <Icon source="close-circle-outline" size={24} />
            </TouchableOpacity>
          </View>
          {channelExists ? (
            <>
              <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item: msg, index }) => {
                  const userInfo = userData[msg.userId] || { avatar: "", userName: "" };
                  const isFirstMessageFromUser =
                    index === 0 || messages[index - 1].userId !== msg.userId; // Check if it's the first message from this user
              
                  return (
                    <View
                      style={[
                        styles.messageContainer,
                        { alignSelf: msg.userId === userRef?.uid ? "flex-end" : "flex-start" },
                      ]}
                    >
                      <View style={{flexDirection: "row", gap: 5,}}>
                      { isFirstMessageFromUser && msg.userId !== userRef?.uid ? (
                          <UserAvatar uri={userInfo.avatar} size={30} />
                      ) : (<View style={{paddingLeft: 30}}/>)}
                          <View>
                            { isFirstMessageFromUser && msg.userId !== userRef?.uid && (
                              <Text style={styles.messageName}>{userInfo.userName}</Text>
                            )}
                            <Text
                              style={[
                                styles.messageText,
                                {
                                  backgroundColor: msg.userId !== userRef?.uid ? "#e8def8" : "#f0f0f0",
                                  padding: 10,
                                  borderRadius: 5,
                                },
                              ]}
                            >
                              {msg.text}
                            </Text>
                          </View>
                      </View>
                    </View>
                  );
                }}
                contentContainerStyle={{ padding: 20 }}
                onContentSizeChange={() => {
                  scrollViewRef.current?.scrollToEnd({ animated: true });
                }}
                style={{ marginBottom: "20%" }}
              />
              <ChatInput
                left={<TextInput.Icon icon="emoticon-happy-outline" />}
                value={message}
                onChangeText={(text: string) => setMessage(text)}
                onPress={sendMessage}
              />
            </>
          ) : (
            <View style={styles.noChannelContainer}>
              <Text style={styles.noChannelText}>
                No channel created. Please invite friends to start a chat.
              </Text>
            </View>
          )}
        </Surface>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ChatModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  surface: {
    height: Dimensions.get("screen").height * 0.9,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "space-between",
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
  title: {
    fontSize: 20,
    fontFamily: "RC_Medium",
  },
  messageContainer: {
    marginVertical: 5
  },
  messageText: {
    fontSize: 16,
    fontFamily:'RC_Regular'
  },
  messageName: {
    fontSize: 14,
    fontFamily:'RC_Regular',
    color: '#adadad',
  },
  noChannelContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noChannelText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
  },
});
