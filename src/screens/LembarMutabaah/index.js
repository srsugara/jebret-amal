import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import { CheckBox } from 'native-base'

import { Notifications } from "expo";

import styles from './styles';
let current = new Date();
let date = current.getDate();
let month = current.getMonth() + 1;
let year = current.getFullYear();
let weekday = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"]
let day = weekday[current.getDay()];
let hour = current.getHours();
let minute = current.getMinutes();

export default class LembarMutabaah extends Component {

  constructor (props) {
    super(props)
    this.state = { 
      hari: day,
      tanggal: date + '/' + month + '/' + year,
      check: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapDay}>
          <Text style={{flex: 2, fontSize: 20, color: 'white'}}>Hari</Text>
          <Text style={{flex: 1, fontSize: 20, color: 'white'}}>:</Text>
          <Text style={{flex: 3, fontSize: 20, color: 'white'}}> {this.state.hari} </Text>
        </View>
        <View style={styles.wrapDay}>
          <Text style={{flex: 2, fontSize: 20, color: 'white'}}>Tanggal</Text>
          <Text style={{flex: 1, fontSize: 20, color: 'white'}}>:</Text>
          <Text style={{flex: 3, fontSize: 20, color: 'white'}}>{this.state.tanggal}</Text>
        </View>
        <View style={{flex: 1, marginTop: 20}}>
          <ScrollView>
            <View style={styles.wrapYaumiyah}>
              <Text style={styles.textAmal}>Dhuha</Text>
              <CheckBox color='#8B0000' checked={this.state.check} onPress={() => this.setState({check: !this.state.check})}/>
            </View>
            <View style={styles.wrapYaumiyah}>
              <Text style={styles.textAmal}>Tilawah</Text>
              <CheckBox color='#8B0000' checked={this.state.check} onPress={() => this.setState({check: !this.state.check})}/>
            </View>
            <View style={styles.wrapYaumiyah}>
              <Text style={styles.textAmal}>Qiyamulail</Text>
              <CheckBox color='#8B0000' checked={this.state.check} onPress={() => this.setState({check: !this.state.check})}/>
            </View>
          </ScrollView>
        </View>
        <View style={{alignItems:'center',marginTop: 10}}>
          <TouchableOpacity style={styles.button} onPress={()=>this.submitReminder()} >
            <Text style={{fontSize: 15, color: 'white'}}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}