import * as React from 'react';
import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';


async function save(key, value, options) {
  await SecureStore.setItemAsync(key, value, options);
}

async function get(key, options) {
  await SecureStore.getItemAsync(key, options);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert('No values stored under that key.');
  }
}

export default function App() {
  const [key, onChangeKey] = useState('');
  const [value, onChangeValue] = useState('');

  useEffect(() => {
    LocalAuthentication.isEnrolledAsync().then(res => console.log(res))
    LocalAuthentication.getEnrolledLevelAsync().then(res => console.log(res))
    LocalAuthentication.authenticateAsync({promptMessage: "Give me your face", cancelLabel: true }).then(res => console.log(res)).catch(err => console.log(err))
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Save an item, and grab it later!</Text>
      {/* {Add some TextInput components... } */}
      <TextInput
      style={{ height: 40, width:200, borderColor: 'gray', borderWidth: 1 }}
      placeholder="Value"
      onChangeText={key => onChangeKey(key)}
      value={key}
      />
      
      <TextInput
      style={{ height: 40, width:200, borderColor: 'gray', borderWidth: 1 }}
      placeholder="Value"
      onChangeText={value => onChangeValue(value)}
      value={value}
      />
      <Button
        title="Save this key/value pair"
        onPress={() => {
          save(key, value);
          // onChangeKey(key);
          // onChangeValue(value);
          console.log(key)
          console.log(value)
        }}
      />

      <Button
        title="Get this key/value pair"
        onPress={() => {
          get(key);
          // onChangeKey(key);
          // onChangeValue(value);
          console.log(key)
          console.log(value)
        }}
        />

      {/* <Text style={styles.paragraph}>🔐 Enter your key 🔐</Text>
      <TextInput
        style={styles.textInput}
        onSubmitEditing={event => {
          getValueFor(event.nativeEvent.text);
        }}
        placeholder="Enter the key for the value you want to get"
      /> */}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
