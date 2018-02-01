import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';

import styles from './styles';

export default class DaftarMutabaah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mutabaahs: [{key: 'Dhuha'}, {key: 'Tilawah'}, {key: 'Qiyamulail'}]
    }
  }

  renderItem(item) {
    return (
      <View style={styles.wrapItem}>
          <Text style={styles.textAmal}>{item}</Text>
          <TouchableOpacity onPress={() => null}>
            <Image source={require('../../../assets/icon/x-button.png')} />
          </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.mutabaahs}
          renderItem={({item}) => this.renderItem(item.key)}
        />
        <TouchableOpacity
            activeOpacity={0.7} style={styles.floatingBtn}
            onPress={() => this.props.navigation.navigate("TambahYaumiyah")}
          >
            <Text style={{ color: '#FFF', fontSize: 47, textAlign: 'center' }}>+</Text>
          </TouchableOpacity>
      </View>
    );
  }
}