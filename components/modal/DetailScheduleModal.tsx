import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar, Card, Icon, Surface } from 'react-native-paper'

const DetailScheduleModal = ({ visible, onDismiss, data }: any) => {
  return (
    <Modal visible={visible} animationType='slide' transparent={true}>
      <View style={styles.container}>
        <Surface elevation={2} style={styles.surface}>
          <View style={[styles.row, styles.bar]}>
            <View style={[styles.row, {width: '80%'}]}>
              {/* <Avatar.Image source={data?.image_url} size={30}/> */}
              <Icon source='car-convertible' size={30} color='#6750a4'/>
              <Text style={styles.title}>{data?.location}</Text>
            </View>
            <TouchableOpacity onPress={onDismiss}>
              <Icon source='close-circle-outline' size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper}>
            <View>
              <Card.Cover source={{uri: data?.image_url}} />
              <View style={[styles.row,{position:'absolute', bottom:10, left: 10}]}>
                <View style={{backgroundColor:'#6750a4', padding: 10, borderRadius: 30}}>
                  <Icon source='map-marker-outline' size={20} color='#fff'/>
                </View>
                <Text style={[styles.text,{maxWidth: 250}]}>{data?.address}</Text>
              </View>
            </View>
            <Text>Ticket: {data?.ticket_price}</Text>
            <Text>Time visited: {data?.time}</Text>
            <Text>Travel: {data?.travel_time}</Text>
            <Text>Rate: {data?.rating ? data?.rating : '0 stars'}</Text>
            <Text>{data?.details}</Text>
            <Text>comments</Text>
            <Text>Change location</Text>
          </View>
        </Surface>
      </View>
    </Modal>
  )
}

export default DetailScheduleModal

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
  wrapper:{
    padding: 20,
    marginBottom: 30
  },
  title: {
    fontSize: 20,
    fontFamily: 'RC_Medium',
  },
  text: {
    fontSize: 16,
    fontFamily: 'RC_Regular',
  },
})