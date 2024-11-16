import { View, Text, Modal, StyleSheet, TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../button/ButtonComponent";
import { Icon, RadioButton, Snackbar, Surface } from "react-native-paper";
import TextInputComponent from "../input/TextInputComponent";
import * as Clipboard from 'expo-clipboard';
import { auth, db } from "@/configs/FirebaseConfig";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import AutocompleteComponent from "../input/AutoComplete";
import { useLocalSearchParams } from "expo-router";

const accessData = [
  { id:'erne1chtsl', title: 'Everyone can have this link', desc: 'Anyone with this link can access', icon: 'access-point-check' },
  { id:'mbs2otvpnol', title: 'Just who have this link', desc: 'Only members can access', icon: 'access-point-off' }
];


const ShareModal = ({ visible, onDismiss, onSubmit, tripData }: any) => {
  const userRef = auth.currentUser
  
  // const [people, setPeople] = useState<any[]>([]); 
  // const [personName, setPersonName] = useState('');
  const { id } = useLocalSearchParams();
  const [access, setAccess] = useState('');
  const [url, setUrl] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [role, setRole] = useState('read');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const currentId = (tripData || id)
  const baseUrl = "http://localhost:8081/planner";
  
  // const updateUrlAndRole = async (newRole:any) => {
  //   const accessId = `${Date.now()}_${currentId || ''}`
  //   const tripRole = newRole === "edit"; // true for edit, false for read-only
  //   const newUrl = `${baseUrl}/${accessId}/${newRole}/${userRef?.uid}?id=${currentId}`;
    
  //   setUrl(newUrl);
  //   setRole(newRole);
    
  //   // Update tripRole in Firestore
  //   if (userRef?.uid&&currentId) {
  //     const tripDocRef = doc(db, "users", userRef?.uid, "userTrip", currentId);
  //     await updateDoc(tripDocRef, { tripRole }); // tripRole: true/false based on role
  //   }
  // };

  const checkOwnership = async () => {
    const tripAccessRef = doc(db, 'groups', tripData);

    // Fetch the trip data to check owner
    const tripSnapshot = await getDoc(tripAccessRef);
    if (tripSnapshot.exists()) {
      const tripInfo = tripSnapshot.data();
      setIsOwner(tripInfo.owner === userRef?.uid); 
    }
  };

  useEffect(() => {
    if (visible) {
      checkOwnership();
    }
  }, [role, tripData, visible, userRef]);

  const handleSubmit = async () => {
    const tripAccessRef = doc(db, 'groups', currentId);

    try {
      if(tripAccessRef){
        await updateDoc(tripAccessRef, {
          tripRole: role,
          members: arrayUnion({
            userId: userRef?.uid,
            email: userRef?.email,
            username: userRef?.displayName || 'Guest',
            role: 'guest',
            joinAt: new Date().toISOString(),
          }),
        });
        console.log('update success')
      } else{ 
        console.log('update failed')
      }

      const shareLink = `${baseUrl}/trip/${currentId}?role=${role}`;
      await Clipboard.setStringAsync(shareLink);

      setSnackbarVisible(true);
    } catch (error) {
      console.error("Error sharing trip:", error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <Surface elevation={2} style={styles.surface}>
          <View style={[styles.row, styles.bar]}>
            <Text style={styles.title}>Share your schedule</Text>
            <View style={[styles.row, {gap: 10}]}>
              <TouchableOpacity onPress={handleSubmit}>
                <Icon source='content-copy' size={24} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onDismiss}>
                <Icon source='close-circle-outline' size={24} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{padding: 20}}>
            {/* <View style={[styles.row, {alignItems: 'flex-end', justifyContent:'space-between', gap: 5}]}>
              <View style={{width: '65%'}}>
                <TextInputComponent 
                  label="Invite people" 
                  text={personName} 
                  onChangeText={(name: string) => setPersonName(name)} 
                />
                {people.map(person => (
                  <Text key={person.id} style={styles.personText}>{person.name}</Text>
                ))}
              </View>
              <ButtonComponent
                label="Invite"
                mode="contained"
                onPress={invitePerson}
                marginTop={20}
              />
            </View>
            <AutocompleteComponent query={access} onQueryChange={a => setAccess(a)} data={accessData} label="Everyone can have access for this url"/> */}
            <RadioButton.Group onValueChange={value => setRole(value)} value={role}>
              <View style={styles.row}>
                <RadioButton.Item label="Read only" value="read" />
                <RadioButton.Item label="Edit" value="edit" />
              </View>
            </RadioButton.Group>
          </View>
          <Snackbar
            style={styles.snackbar}
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)} 
            duration={3000}
          >
            Copied!
          </Snackbar>
        </Surface>
      </View>
    </Modal>
  );
};

export default ShareModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  surface: { 
    backgroundColor: '#fff', 
    borderRadius: 10,
    paddingBottom: 20
  },
  row: {
    flexDirection: "row",
    gap: 40,
  },
  bar:{
    borderBottomWidth: 1,
    borderBottomColor: '#adadad',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    fontFamily: 'RC_Medium',
  },
  personText: {
    fontFamily: 'RC_Regular',
    fontSize: 16,
    marginTop: 10,
  }, 
  snackbar: {
    width: 90,
    alignSelf: 'center'
  },
  label: {
    fontFamily: 'RC_Regular',
    fontSize: 20,
    marginVertical: 10
  }
});
