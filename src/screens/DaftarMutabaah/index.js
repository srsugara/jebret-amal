import React, { Component } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import Expo, { SQLite } from "expo";

import styles from "./styles";

const db = SQLite.openDatabase("db.db");
// const db = SQLite.openDatabase(Expo.FileSystem.documentDirectory + 'database/jebret.db');

export default class DaftarMutabaah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // mutabaahs: [{key: 'Dhuha'}, {key: 'Tilawah'}, {key: 'Qiyamulail'}],
      mutabaahs: [],
      tables: []
    };
    this.deleteMutabaah = this.deleteMutabaah.bind(this);
    this.updateMutabaah = this.updateMutabaah.bind(this);
  }

  componentDidMount() {
    db.transaction(
      tx => {
        tx.executeSql(
          `SELECT * FROM mutabaah_yaumiyah`,
          null,
          (_, { rows: { _array } }) => this.setState({ mutabaahs: _array })
        );
        tx.executeSql(
          `SELECT name FROM sqlite_master WHERE type='table';`,
          null,
          (_, { rows: { _array } }) =>
            this.setState({ tables: _array }, () => {
              console.log("xxxxxxx", this.state.tables);
            })
        );

        // tx.executeSql('select * from mutabaah_yaumiyah', [], (_, { rows }) =>
        //     console.log('************',JSON.stringify(rows))
        //   );
      },
      error => {
        console.log("error", error);
      },
      null
    );
  }

  deleteMutabaah(nama) {
    db.transaction(
      tx => {
        tx.executeSql(`DELETE FROM mutabaah_yaumiyah WHERE nama = ?;`, [nama]);
      },
      error => {
        console.log("error delete mutabaah", error);
      },
      this.updateMutabaah
    );
  }

  updateMutabaah() {
    db.transaction(
      tx => {
        tx.executeSql(
          `SELECT * FROM mutabaah_yaumiyah`,
          null,
          (_, { rows: { _array } }) => this.setState({ mutabaahs: _array })
        );
      },
      error => {
        console.log("error update mutabaah", error);
      },
      null
    );
  }

  // update() {
  //   db.transaction(tx => {
  //     tx.executeSql(
  //       `select * from mutabaah_yaumiyah`,
  //       (_, { rows: { _array } }) => this.setState({ items: _array })
  //     );
  //   });
  // }

  renderItem(nama) {
    return (
      <View style={styles.wrapItem}>
        <Text style={styles.textAmal}>{nama}</Text>
        <TouchableOpacity onPress={() => this.deleteMutabaah(nama)}>
          <Image source={require("../../../assets/icon/x-button.png")} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.mutabaahs}
          renderItem={({ item }) => this.renderItem(item.nama)}
          keyExtractor={(item, index) => index}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.floatingBtn}
          onPress={() => this.props.navigation.navigate("TambahYaumiyah")}
        >
          <Text style={{ color: "#FFF", fontSize: 47, textAlign: "center" }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
