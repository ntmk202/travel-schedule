import { Dimensions, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon, Surface, TextInput } from 'react-native-paper'
import GroupAvatar from '../avatar/GroupAvatar'

const ChatModal = ({ visible, onDismiss }: any) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
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
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/* Your chat content goes here */}
          </ScrollView>
          <View
            style={{
              bottom: 0,
              right: 0,
              left: 0,
              position: "absolute",
              padding: 20,
            }}
          >
            <TextInput
              mode="flat"
              placeholder="Write something ..."
              right={<TextInput.Icon icon="send" />}
              style={{
                borderRadius: 5,
                backgroundColor: "#fff",
                borderWidth: 0.5,
              }}
              underlineStyle={{ display: "none" }}
              multiline={true}
            />
          </View>
        </Surface>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default ChatModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  surface: { 
    height : Dimensions.get('screen').height * 0.9,
    backgroundColor: '#fff', 
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent:'space-between'
  },
  bar:{
    borderBottomWidth: 1,
    borderBottomColor: '#adadad',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontFamily: 'RC_Medium',
    
  },
})