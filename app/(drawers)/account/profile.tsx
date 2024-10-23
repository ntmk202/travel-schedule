import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonComponent, FormNewPasswordModal, TextInputComponent, UserAvatar } from "@/components";
import { auth, db, storage } from "@/configs/FirebaseConfig"; 
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { reload, sendEmailVerification, updateEmail } from "firebase/auth"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import * as ImagePicker from "expo-image-picker"; 
import { Icon } from "react-native-paper";

const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null) 
  const [visible, setVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        const docRef = doc(db, "accounts", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUsername(userData.username);
          setEmail(userData.email);
          setAvatar(userData.avatar); 
        }
      }
    };

    loadUserData();
  }, [user]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAvatar(result.assets[0].uri); 
    }
  };

  const uploadImage = async () => {
    if (!avatar) return null;

    const response = await fetch(avatar);
    const blob = await response.blob();
    const imageRef = ref(storage, `avatars/${user?.uid}`); 

    setUploading(true);
    try {
      await uploadBytes(imageRef, blob); 
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (user) {
      try {
        let avatarURL = avatar;
  
        // If avatar is a local URI, upload it
        if (avatar && avatar.startsWith("file://")) {
          avatarURL = await uploadImage();
        }
  
        // Update user data in Firestore
        const docRef = doc(db, "accounts", user.uid);
        await updateDoc(docRef, {
          username: username,
          email: email,
          avatar: avatarURL,
          updateAt: new Date(),
        });
  
        if (email !== user.email) {
          await updateDoc(docRef, { newEmail: email });
          
          await sendEmailVerification(user);
          alert("A verification email has been sent to your new email address.");
        }
  
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error)
      }
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <View>
        <View style={{ width: width * 0.8 }}>
          <View>
            <UserAvatar size={100} uri={avatar}/>
            <TouchableOpacity style={{position:'absolute', bottom: -10, backgroundColor: 'rgba(103, 80, 164,.5)', padding: 5, borderRadius: 10, alignSelf: 'center'}} onPress={pickImage}>
              <Icon source="camera" size={20} color="#f7f7f7"/>
            </TouchableOpacity>
          </View>
          <TextInputComponent
            label="Username"
            text={username}
            type="username"
            onChangeText={(value: string) => setUsername(value)}
          />
          <TextInputComponent
            label="Email Address"
            text={email}
            type="emailAddress"
            onChangeText={(value: string) => setEmail(value)}
          />
          <Text style={style.typoText} onPress={() => setVisible(true)}>
            Change Password
          </Text>
          <TextInputComponent
            label="Password"
            text="******"
            type="password"
            disable
          />
        </View>
        <ButtonComponent
          label="Save"
          mode="contained"
          onPress={handleSave}
          marginTop={20}
          disable={uploading}
        />
      </View>
      <FormNewPasswordModal visible={visible} onDismiss={() => setVisible(false)}  />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const style = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: "center", 
    alignItems: "center" 
  },
  typoText: {
    fontFamily: "RC_Regular",
    // height: 0,
    top: 35,
    marginEnd: 10,
    fontSize: 20,
    color: "#6750a4",
    alignSelf: "flex-end",
    zIndex: 999,
  },
});
