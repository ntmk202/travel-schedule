import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../button/ButtonComponent";
import { RadioButton, Surface } from "react-native-paper";
import TextInputComponent from "../input/TextInputComponent";
import * as Clipboard from 'expo-clipboard';
import AutocompleteComponent from "../input/AutoComplete";

const accessData = [
  { id:'1', title: 'Everyone can have this link', desc: 'Anyone with this link can access', icon: 'access-point-check' },
  { id:'2', title: 'Members of Travel Planner only', desc: 'Only members can access', icon: 'access-point-off' }
];

const ShareModal = ({ visible, onDismiss, onSubmit }: any) => {
  const [people, setPeople] = useState<any[]>([]); 
  const [personName, setPersonName] = useState('');
  const [access, setAccess] = useState('');
  const [url, setUrl] = useState('');
  const [role, setRole] = useState('read');
  const baseUrl = "http://localhost:8081/planner/schedule";
  const id = 1;  

  useEffect(() => {
    const newUrl = `${baseUrl}/${access}/${role}&&id?=${id}`;
    setUrl(newUrl);
  }, [role]);  

  const invitePerson = () => {
    if (people.length === 0) {
      alert("Please invite at least one person!");
      return;
    }
    if (personName) {
      const newPerson = { id: people.length + 1, name: personName };
      setPeople([...people, newPerson]); 
      setPersonName('');
    }
  };

  const handleSubmit = () => {  
    Clipboard.setString(url);
    onSubmit({ people, url, access, role });
    onDismiss();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <Surface elevation={2} style={styles.surface}>
          <Text style={styles.title}>Share your schedule</Text>
          <View>
            <View style={[styles.row, {alignItems: 'flex-end', justifyContent:'space-between', gap: 5}]}>
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
            <AutocompleteComponent query={access} onQueryChange={a => setAccess(a)} data={accessData} label="Everyone can have access for this url"/>
            <RadioButton.Group onValueChange={value => setRole(value)} value={role}>
              <View style={styles.row}>
                <RadioButton.Item label="Read only" value="read" />
                <RadioButton.Item label="Edit" value="edit" />
              </View>
            </RadioButton.Group>
            <View style={[styles.row, {justifyContent:'flex-end'}]}>
              <ButtonComponent
                label="Cancel"
                mode="elevated"
                onPress={onDismiss}
                marginTop={20}
              />
              <ButtonComponent
                label="Copy link"
                mode="contained"
                onPress={handleSubmit}
                marginTop={20}
              />
            </View>
          </View>
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
    padding: 20,
    backgroundColor: '#fff', 
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    gap: 40,
  },
  title: {
    fontSize: 20,
    fontFamily: 'RC_Bold',
  },
  personText: {
    fontFamily: 'RC_Regular',
    fontSize: 16,
    marginTop: 10,
  }
});
