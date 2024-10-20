import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon, Surface } from 'react-native-paper'
import UserAvatar from '../avatar/UserAvatar'

const InformationModal = ({ visible, onDismiss }: any) => {
  return (
    <Modal visible={visible} animationType='slide' transparent={true}>
      <View style={styles.container}>
        <Surface elevation={2} style={styles.surface}>
          <View style={[styles.row, styles.bar]}>
            <Icon source='information-outline' size={30} />
            <TouchableOpacity onPress={onDismiss}>
              <Icon source='close-circle-outline' size={24} />
            </TouchableOpacity>
          </View>
          <View style={{paddingTop: 10, flex: 1}}>
            <View style={styles.card}>
              <Text style={styles.title}>Owner schedule</Text>
              <View style={styles.row}>
                <UserAvatar size={30} />
                <Text style={styles.text}>John Doe</Text>
              </View>
            </View>
            <View style={styles.card}>
              <Text style={styles.title}>Member in schedule</Text>
              <View style={[styles.row, {marginBottom: 15}]}>
                <UserAvatar size={30} />
                <Text style={styles.text}>John Doe</Text>
              </View>
              <View style={[styles.row, {marginBottom: 15}]}>
                <UserAvatar size={30} />
                <Text style={styles.text}>John Doe</Text>
              </View>
            </View>
            <View>

            </View>
          </View>
        </Surface>
      </View>
    </Modal>
  )
}

export default InformationModal

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
  card: {
    paddingHorizontal: 20, 
    paddingBottom: 15, 
    marginBottom: 10, 
    borderBottomWidth: .5, 
    borderColor: '#adadad'
  },
  title: {
    fontSize: 20,
    fontFamily: 'RC_Medium',
    marginBottom: 10
  },
  text: {
    fontSize: 18,
    fontFamily: 'RC_Regular',
  },
})