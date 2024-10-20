import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'

const GroupAvatar = () => {
  return (
    <Avatar.Image size={35} source={require('@/assets/images/default-user-icon.jpg')} />

  )
}

export default GroupAvatar

const styles = StyleSheet.create({})