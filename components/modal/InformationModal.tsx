import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon, Surface } from 'react-native-paper'
import UserAvatar from '../avatar/UserAvatar'
import ButtonComponent from '../button/ButtonComponent'
import { deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '@/configs/FirebaseConfig'
import { useLocalSearchParams, useRouter } from 'expo-router'

const InformationModal = ({ visible, onDismiss, tripData, userTrips, setUserTrips }: any) => {
  const { id } = useLocalSearchParams();
  const user = auth.currentUser
  const route = useRouter()
  const currentTrip = userTrips.find((trip:any) => trip.tripId === (tripData || id))
  const handleDeletion = async () => {
    try {
      if (user?.uid && currentTrip?.id) {
        const tripRef = doc(db, 'users', user.uid, 'userTrip', currentTrip?.id);
        await deleteDoc(tripRef);

        const updatedTrips = userTrips.filter((trip: any) => trip.tripId !== currentTrip?.id);
        setUserTrips(updatedTrips);

        if (updatedTrips.length > 0) {
          const latestTrip:any = updatedTrips[updatedTrips.length - 1] 
          route.navigate(`/planner/${latestTrip.tripId}`);
        } else{
          route.navigate('/')
        }

        alert(`Delete schedule "Trip to ${currentTrip?.tripPlan?.trip?.destination}" successful`);
        onDismiss()
      }
    } catch (e: any) {
      console.log('Cannot delete this schedule !!!', e);
    }
  }
  
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
              <Text style={styles.subTitle}>Details about the person who created this schedule</Text>
              <View style={styles.row}>
                <UserAvatar size={40} uri={user?.photoURL}/>
                <View >
                  <Text style={styles.text}>{user?.displayName}</Text>
                  <Text style={styles.subText}>{user?.email}</Text>
                </View>
              </View>
            </View>
            <View style={styles.card}>
              <Text style={styles.title}>Member in schedule</Text>
              <Text style={styles.subTitle}>List of people who have access to this schedule</Text>
              <View style={[styles.row, {marginBottom: 15, justifyContent:'space-between'}]}>
                <View style={styles.row}>
                  <UserAvatar size={40} />
                  <View>
                    <Text style={styles.text}>John Doe</Text>
                    <Text style={styles.subText}>John Doe</Text>
                  </View>
                </View>
                <Icon source='delete-outline' size={30} color='#adadad'/>
              </View>
              <View style={[styles.row, {marginBottom: 15, justifyContent:'space-between'}]}>
                <View style={styles.row}>
                  <UserAvatar size={40} />
                  <View>
                    <Text style={styles.text}>John Doe</Text>
                    <Text style={styles.subText}>John Doe</Text>
                  </View>
                </View>
                <Icon source='delete-outline' size={30} color='#adadad'/>
              </View>
              <ButtonComponent label='Add member' mode='outlined' height={50} customstyle={{marginVertical: 15}}/>
            </View>
            <View style={styles.card}>
              <Text style={styles.title}>Delete the schedule</Text>
              <Text style={styles.subTitle}>Permanently remove this schedule from your list</Text>
              <ButtonComponent label='Delete' mode='outlined' height={50} customstyle={{marginVertical: 15}} onPress={handleDeletion}/>
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
    marginBottom: 5
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'RC_Regular',
    marginBottom: 10,
    color:'#5d5d5d'
  },
  text: {
    fontSize: 18,
    fontFamily: 'RC_Regular',
  },
  subText: {
    fontSize: 14,
    fontFamily: 'RC_Regular',
    color:'#adadad'
  },
})