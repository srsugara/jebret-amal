import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>---------------- Jebret Amal ----------------</Text>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Hello,You have to increase your amal ok :)</Text>
        <Entypo name="500px" size={32} color="green" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
