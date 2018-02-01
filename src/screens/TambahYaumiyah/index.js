import React, { Component } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'native-base'

import styles from './styles';

export default class TambahYaumiyah extends Component {

  constructor (props) {
    super(props)
    this.state = { amal: '', check: false };
  }

  onChanged(text,type){
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            // your call back function
            alert("Masukkan harus angka");
        }
    }
    if(type==1){
      this.setState({ jam: newText });
    } else {
      this.setState({ menit: newText });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapInput}>
          <Image style={styles.iconInput} source={require('../../../assets/icon/tag.png')} />
          <TextInput
            style={styles.textAmal}
            placeholder='yaumiyah'
            onChangeText={(text)=> this.setState({amal: text})}
            value={this.state.amal}
            maxLength={30}  //setting limit of input>
            underlineColorAndroid='transparent' 
          />
        </View>
        <View style={styles.wrapInput}>
          <Image style={styles.iconInput} source={require('../../../assets/icon/stopwatch.png')} />
          <TextInput
            style={styles.textAmal}
            keyboardType='numeric'
            placeholder='jam'
            onChangeText={(text)=> this.onChanged(text,1)}
            value={this.state.jam}
            maxLength={2}  //setting limit of input>
            underlineColorAndroid='transparent' 
          />
          <Text style={{fontSize: 20, color: 'gray'}}> : </Text>
          <TextInput
            style={styles.textAmal}
            keyboardType='numeric'
            placeholder='menit'
            onChangeText={(text)=> this.onChanged(text,2)}
            value={this.state.menit}
            maxLength={2}  //setting limit of input>
            underlineColorAndroid='transparent' 
          />
        </View>
        
        <View style={{flex: 1, marginTop: 20}}>
          <ScrollView>
          <View style={styles.wrapDay}>
            <Text style={styles.textAmal}>Senin</Text>
            <CheckBox color='#8B0000' checked={this.state.check} onPress={() => this.setState({check: !this.state.check})}/>
          </View>
          <View style={styles.wrapDay}>
            <Text style={styles.textAmal}>Selasa</Text>
            <CheckBox color='#8B0000' checked={this.state.check} onPress={() => this.setState({check: !this.state.check})}/>
          </View>
          <View style={styles.wrapDay}>
            <Text style={styles.textAmal}>Rabu</Text>
            <CheckBox color='#8B0000' checked={this.state.check} onPress={() => this.setState({check: !this.state.check})}/>
          </View>
          <View style={styles.wrapDay}>
            <Text style={styles.textAmal}>Kamis</Text>
            <CheckBox color='#8B0000' checked={this.state.check} onPress={() => this.setState({check: !this.state.check})}/>
          </View>
          <View style={styles.wrapDay}>
            <Text style={styles.textAmal}>Jumat</Text>
            <CheckBox color='#8B0000' checked={this.state.check} onPress={() => this.setState({check: !this.state.check})}/>
          </View>
          <View style={styles.wrapDay}>
            <Text style={styles.textAmal}>Sabtu</Text>
            <CheckBox color='#8B0000' checked={this.state.check} onPress={() => this.setState({check: !this.state.check})}/>
          </View>
          <View style={styles.wrapDay}>
            <Text style={styles.textAmal}>Minggu</Text>
            <CheckBox color='#8B0000' checked={this.state.check} onPress={() => this.setState({check: !this.state.check})}/>
          </View>
          </ScrollView>
        </View>
      <View style={{alignItems:'center',marginTop: 10}}>
        <TouchableOpacity style={styles.button} onPress={()=>alert('Data telah ditambahkan')} >
          <Text style={{fontSize: 15, color: 'white'}}>Tambah</Text>
        </TouchableOpacity>
      </View>
      </View>
      
    );
  }
}