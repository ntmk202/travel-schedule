import { StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { TextInput } from 'react-native-paper'

const TextInputComponent = ({label, text, type, onChangeText, disable, onBlur}:any) => {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
      </Text>
      <View style={styles.field}>
        <TextInput
          outlineStyle={styles.input}
          contentStyle = {styles.label}
          outlineColor='#a6a6a6'
          mode='outlined'
          value={text}
          textContentType={type}
          onChangeText={onChangeText ? onChangeText:undefined}
          disabled = {disable? true : false}
          onBlur={onBlur ? onBlur : undefined}
        />
      </View>
    </View>
  )
}

export default TextInputComponent

const styles = StyleSheet.create({
  field: {
    marginTop: 10
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 15
  },
  label: {
    fontFamily: 'RC_Regular',
    fontSize: 20,
  }
})