import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Switch } from 'react-native-paper'

const ToggleComponent = ({label, description, value, onValueChange}: any) => {
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  )
}

export default ToggleComponent

const styles = StyleSheet.create({
    row:{
        width: 'auto',
        flexDirection: 'row',
        justifyContent: "space-between",
        marginVertical: 30
    },
    label: {
        fontSize: 24,
        fontFamily: 'RC_SemiBold',
        lineHeight: 48,
        letterSpacing: .14
    },
    desc: {
        fontSize: 14,
        fontFamily: 'RC_Light',
        maxWidth: '70%'
    }
})