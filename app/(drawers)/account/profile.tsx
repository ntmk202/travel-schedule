import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonComponent, FormNewPasswordModal, TextInputComponent, UserAvatar } from "@/components";
import { auth, db, storage } from "@/configs/FirebaseConfig"; 
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { sendEmailVerification, updateEmail, updateProfile } from "firebase/auth"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import * as ImagePicker from "expo-image-picker"; 
import { Icon } from "react-native-paper";
import { useAuth } from "@/configs/authConfig";

const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const userRef = auth.currentUser;
  const { user, updateUserData } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user?.username ?? '');
      setEmail(user?.email ?? '');
      setAvatar(user?.avatar ?? null);
    }
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
    const imageRef = ref(storage, `avatars/${userRef?.uid}`); 

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
    if (userRef) {
      try {
        let avatarURL = avatar;
        if (avatar && avatar.startsWith("file://")) {
          avatarURL = await uploadImage();
        }
        
        const docRef = doc(db, "users", userRef.uid);
        await updateDoc(docRef, {
          username: username,
          email: email,
          avatar: avatarURL,
          updatedAt: new Date(),
        });
      
        await updateUserData(userRef.uid)

        if (email !== userRef.email) {
          await updateEmail(userRef, email);
          await sendEmailVerification(userRef);
          alert("A verification email has been sent to your new email address.");
        }
        
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  }; 

  return (
    <SafeAreaView style={style.container}>
      <View>
        <View style={{ width: width * 0.8 }}>
          <View>
            <UserAvatar size={100} uri={avatar} />
            <TouchableOpacity style={{ position: 'absolute', bottom: -10, backgroundColor: 'rgba(103, 80, 164,.5)', padding: 5, borderRadius: 10, alignSelf: 'center' }} onPress={pickImage}>
              <Icon source="camera" size={20} color="#f7f7f7"/>
            </TouchableOpacity>
          </View>
          <TextInputComponent
            label="Username"
            text={username}
            type="username"
            onChangeText={setUsername}
          />
          <TextInputComponent
            label="Email Address"
            text={email}
            type="emailAddress"
            onChangeText={setEmail}
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
      <FormNewPasswordModal visible={visible} onDismiss={() => setVisible(false)} />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const style = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center" 
  },
  typoText: {
    fontFamily: "RC_Regular",
    top: 35,
    marginEnd: 10,
    fontSize: 20,
    color: "#6750a4",
    alignSelf: "flex-end",
    zIndex: 999,
  },
});
