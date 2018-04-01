import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import Expo, { SQLite } from 'expo';

import styles from './styles';

const db = SQLite.openDatabase('db.db');

export default class DaftarMutabaah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // mutabaahs: [{key: 'Dhuha'}, {key: 'Tilawah'}, {key: 'Qiyamulail'}],
      mutabaahs: []
    }
  }

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        `select * from mutabaah_yaumiyah`,
        null,
        (_, { rows: { _array } }) => this.setState({ mutabaahs: _array },() => console.log('*********',this.state.mutabaahs))
      );
      // tx.executeSql('select * from mutabaah_yaumiyah', [], (_, { rows }) =>
      //     console.log('************',JSON.stringify(rows))
      //   );
    });
  }

  // update() {
  //   db.transaction(tx => {
  //     tx.executeSql(
  //       `select * from mutabaah_yaumiyah`,
  //       (_, { rows: { _array } }) => this.setState({ items: _array })
  //     );
  //   });
  // }

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
          renderItem={({item}) => this.renderItem(item.nama)}
          keyExtractor={(item, index) => index}
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