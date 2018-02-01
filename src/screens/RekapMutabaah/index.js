import React, { Component } from 'react';
import { View, Text, Picker, PickerIOS, Platform } from 'react-native';

import styles from './styles';

export default class RekapMutabaah extends Component {

  constructor (props) {
    super(props)
    this.state = { 
      months: ['Pilih Bulan','Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
      month:''
    };
  }

  render() {
    if (Platform.OS === 'android') {
      return (
      <View style={styles.container} >
        <Picker
          style={styles.wrapDay}
          selectedValue={this.state.month}
          onValueChange={(itemValue, itemIndex) => this.setState({month: itemValue})}>
          {this.state.months.map((data,index) => 
            <Picker.Item key={index} label={data} value={data} />
          )}
        </Picker>
        <View><Text>Grafik Android Coming Soon</Text></View>
      </View>
      )
      
    } else {
      return (
      <View style={{flex: 1, backgroundColor: '#FFFFF0'}} >
        <PickerIOS
          selectedValue={this.state.month}
          onValueChange={(itemValue, itemIndex) => this.setState({month: itemValue})}>
          {this.state.months.map((data,index) => 
            <PickerIOS.Item key={index} label={data} value={data} />
          )}
        </PickerIOS>
        <View><Text>Grafik IOS Coming Soon</Text></View>
      </View>
      )
    }
   
  }
}