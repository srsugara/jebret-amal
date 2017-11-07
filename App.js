import React from 'react';
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';
let {width, height} = Dimensions.get('window')

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>---------------- Jebret Amal ----------------</Text>
        <Text>Hello,You have to increase your amal ok :)</Text>
        <Entypo name="500px-with-circle" size={50} color="green" />
        
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:30,
    paddingBottom:10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
