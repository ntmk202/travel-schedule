import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon, Surface } from 'react-native-paper';

const CustomListItem = ({ title, description, time, icon }: any) => {
    return (
        <Surface style={styles.container}>
          <View style={styles.leftIcon}>
            <Icon source={icon} size={20} color="white" />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <Text style={styles.time}>{time}</Text>
        </Surface>
    );
  };

export default CustomListItem

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
      marginLeft: -30,
      marginRight: 20,
      padding: 10,
      borderRadius: 10,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 10,
    },
    leftIcon: {
      backgroundColor: '#6750a4', 
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
    },
    description: {
      fontSize: 12,
      color: 'gray',
    },
    time: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#000',
    },
  });