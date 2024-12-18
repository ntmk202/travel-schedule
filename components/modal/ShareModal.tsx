import React, { useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Surface, IconButton, Icon } from 'react-native-paper';
import { auth, db } from '@/configs/FirebaseConfig';
import { collection, getDocs, doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';
import * as MailComposer from 'expo-mail-composer';
import ButtonComponent from '../button/ButtonComponent';
import TextInputComponent from '../input/TextInputComponent';

interface InviteFriendsModalProps {
  visible: boolean;
  onDismiss: () => void;
  tripData: string | any;
}

interface User {
  uid: string;
  email: string;
}

const ShareModal: React.FC<InviteFriendsModalProps> = ({ visible, onDismiss, tripData }) => {
  const user = auth.currentUser;
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const usersData = usersSnapshot.docs.map(doc => ({
      uid: doc.id,
      email: doc.data().email,
    }));
    setAllUsers(usersData);
  };

  useLayoutEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim()) {
      const filtered = allUsers.filter(user =>
        user.email.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(allUsers);
    }
  };

  const toggleUserSelection = (user: User) => {
    setSelectedUsers((prevSelected) => {
      const isAlreadySelected = prevSelected.some((u) => u.uid === user.uid);
      if (isAlreadySelected) {
        return prevSelected.filter((u) => u.uid !== user.uid);
      } else {
        return [...prevSelected, user];
      }
    });
  };

  const sendEmailsWithToken = async (selectedUsers: User[], token: string) => {
    try {
      // Extract all email addresses into an array
      const recipientEmails = selectedUsers.map(user => user.email);
  
      const emailBody = `You have been invited to join a trip. Use the following token: ${token}`;
  
      // Use MailComposer to send to multiple recipients
      await MailComposer.composeAsync({
        recipients: recipientEmails, // Pass array of emails
        subject: 'Invitation to Join Trip',
        body: emailBody,
        isHtml: false,
      });
  
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('Failed to send emails.');
    }
  };
  

  const handleInvite = async () => {
    try {
      if (user?.uid) {
        const chatRef = doc(db, 'users', user?.uid, 'channels', tripData);
        const chatSnapshot = await getDoc(chatRef);
        if (!chatSnapshot.exists()) {
          await setDoc(chatRef, {
            admin: user?.uid,
            participants: [],
            createdAt: new Date().toISOString(),
            groupId: tripData,
          });
          alert('A new chat group has been created.');
        }

        const uidsToAdd = selectedUsers.map(user => user.uid);
        await updateDoc(chatRef, {
          participants: arrayUnion(...uidsToAdd),
        });

        // Generate and send token via email for selected users
        const inviteToken = btoa(JSON.stringify({ code: tripData })); // Encode token with Base64
        await sendEmailsWithToken(selectedUsers, inviteToken);

        alert(`Invited and sent mail to ${selectedUsers.length} user(s) to the trip.`);
        setSelectedUsers([]);
        onDismiss();
      }
    } catch (error) {
      console.error('Error inviting users:', error);
      alert('Failed to invite users.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <Surface elevation={2} style={styles.surface}>
          <View style={[styles.row, styles.bar]}>
            <Text style={styles.title}>Invite Friends</Text>
            <IconButton icon="close-circle-outline" size={24} onPress={onDismiss} />
          </View>
          <View style={{ paddingHorizontal: 20, gap: 20 }}>
            <TextInputComponent
              label="Search by email"
              text={searchText}
              onChangeText={handleSearch}
              type="outlined"
            />
            <FlatList
              data={filteredUsers}
              keyExtractor={(item) => item.uid}
              renderItem={({ item }) => {
                const isSelected = selectedUsers.some((user) => user.uid === item.uid);
                return (
                  <TouchableOpacity
                    onPress={() => toggleUserSelection(item)}
                    style={[styles.userItem, isSelected && styles.selectedUserItem]}
                  >
                    <Text style={styles.userText}>{item.email}</Text>
                    {isSelected && <Icon source="check" size={20} color="green" />}
                  </TouchableOpacity>
                );
              }}
            />
            <ButtonComponent
              label={`Invite (${selectedUsers.length})`}
              mode="contained"
              onPress={handleInvite}
              disabled={selectedUsers.length === 0}
              height={50}
            />
          </View>
        </Surface>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  surface: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bar: {
    borderBottomWidth: 1,
    borderBottomColor: '#adadad',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'RC_Medium',
  },
  userItem: {
    padding: 15,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedUserItem: {
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
  },
  userText: {
    fontSize: 16,
    fontFamily: 'RC_Regular',
  },
});

export default ShareModal;
