import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ChatBubble = ({role, text, time}: any) => {
  return (
    <View style={[styles.chatItem, role === 'user' ? styles.userChatItem: styles.guestChatItem]}>
      <Text style={styles.chatText}>{text}</Text>
      <Text style={[styles.chatTime, role === 'user' ? {alignSelf: 'flex-end'}: {alignSelf: 'flex-start'}]}>{time}</Text>
    </View>
  )
}

export default ChatBubble

const styles = StyleSheet.create({
    chatItem: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        maxWidth: "70%",
        position:'relative'
    },
    userChatItem: {
        alignSelf: 'flex-end',
        backgroundColor: '#e8def8',
    },
    guestChatItem: {
        alignSelf: 'flex-start',
        backgroundColor: '#f0f0f0',
    },
    chatText: {
        fontFamily: 'RC_Regular',
        fontSize: 16,
        color: '#000'
    },
    chatTime: {
        fontFamily: 'RC_Regular',
        fontSize: 13,
        color: '#adadad',
        marginTop: 3,
    },
    speakerIcon: {
        position: 'absolute',
        bottom: 5,
        right: 5
    }
})