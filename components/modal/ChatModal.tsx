import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Surface } from 'react-native-paper'

const ChatModal = ({ visible, onDismiss }: any) => {
  return (
    <Modal visible={visible} animationType='slide' transparent={true}>
      <View style={styles.container}>
        <Surface elevation={2} style={styles.surface}>
          <Text onPress={onDismiss} >ChatModal</Text>
        </Surface>
      </View>
    </Modal>
  )
}

export default ChatModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  surface: { 
    padding: 30,
    backgroundColor: '#fff', 
    borderRadius: 10
  },
  row: {
    flexDirection: "row",
    gap: 40,
  },
  title: {
    fontSize: 20,
    fontFamily: 'RC_Bold',
  },
})