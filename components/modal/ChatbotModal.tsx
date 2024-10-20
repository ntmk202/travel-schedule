import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon, Surface } from 'react-native-paper'

const ChatbotModal = ({ visible, onDismiss }: any) => {
  return (
    <Modal visible={visible} animationType='slide' transparent={true}>
      <View style={styles.container}>
        <Surface elevation={2} style={styles.surface}>
          <View style={[styles.row, styles.bar]}>
            <View style={[styles.row, {width: '80%'}]}>
              <Icon source='robot-outline' size={30} />
              <Text style={styles.title}>AI planner</Text>
            </View>
            <TouchableOpacity onPress={onDismiss}>
              <Icon source='close-circle-outline' size={24} />
            </TouchableOpacity>
          </View>
        </Surface>
      </View>
    </Modal>
  )
}

export default ChatbotModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  surface: { 
    height : Dimensions.get('screen').height * 0.9,
    backgroundColor: '#fff', 
    borderRadius: 10
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