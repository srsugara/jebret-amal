import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  FlatList
} from "react-native";
import { CheckBox } from "native-base";
import { SQLite } from "expo";

import styles from "./styles";

const db = SQLite.openDatabase("db.db");

let current = new Date();
let date = current.getDate();
let month = current.getMonth() + 1;
let year = current.getFullYear();
let weekday = ["minggu", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
let day = weekday[current.getDay()];
let hour = current.getHours();
let minute = current.getMinutes();

export default class LembarMutabaah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hari: day,
      tanggal: date + "/" + month + "/" + year,
      check: false,
      amals: [],
    };
    this.checklistAmal = this.checklistAmal.bind(this);
    console.log("hour->", hour, " minute->", minute);
  }

  componentDidMount() {
    db.transaction(
      tx => {
        tx.executeSql(
          `SELECT * FROM transaksi_reminder`,
          null,
          (_, { rows: { _array } }) => {
            var newArray = _array.filter(function (el) {
              return el.hari == day;
            });
            this.setState({ amals: newArray }, () => {
            console.log("amal amal", this.state.amals);
          })}
        );
      },
      error => {
        console.log("error get lembar amal", error);
      },
      null
    );
  }

  checklistAmal(index) {
    amals = this.state.amals;
    if (amals[index].selesai === 0) {
      amals[index].selesai = 1;
      this.setState({ amals: amals }, () => {
        console.log(this.state.amals);
      });
    } else {
      amals[index].selesai = 0;
      this.setState({ amals: amals }, () => {
        console.log(this.state.amals);
      });
    }
  }

  renderItem(item, index) {
    return (
      <View style={styles.wrapYaumiyah}>
        <Text style={styles.textAmal}>{item.nama_mutabaah}</Text>
        <CheckBox
          color="#8B0000"
          checked={ item.selesai==0 ? false : true }
          onPress={() => this.checklistAmal(index)}
        />
      </View>
    );
  }

  submitReminder() {
    db.transaction(
      tx => {
        for (i = 0; i < this.state.amals.length; i++) {
          tx.executeSql(
            `update transaksi_reminder SET selesai = ? WHERE nama_mutabaah= ? AND hari= ? `,
            [
              this.state.amals[i].selesai,
              this.state.amals[i].nama_mutabaah,
              this.state.amals[i].hari
            ],
            () => alert("Data telah ditambahkan"),
            () => alert("Data gagal ditambahkan")
          );
        }
      },
      error => {
        console.log("error add transaksi reminder ", error);
      },
      null
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapDay}>
          <Text style={{ flex: 2, fontSize: 20, color: "white" }}>Hari</Text>
          <Text style={{ flex: 1, fontSize: 20, color: "white" }}>:</Text>
          <Text style={{ flex: 3, fontSize: 20, color: "white" }}>
            {" "}
            {this.state.hari}{" "}
          </Text>
        </View>
        <View style={styles.wrapDay}>
          <Text style={{ flex: 2, fontSize: 20, color: "white" }}>Tanggal</Text>
          <Text style={{ flex: 1, fontSize: 20, color: "white" }}>:</Text>
          <Text style={{ flex: 3, fontSize: 20, color: "white" }}>
            {this.state.tanggal}
          </Text>
        </View>
        <View style={{ flex: 1, marginTop: 20 }}>
          <ScrollView>
            <FlatList
              data={this.state.amals}
              renderItem={({ item, index }) => this.renderItem(item, index)}
              extraData={this.state}
              keyExtractor={(item, index) => index}
            />
          </ScrollView>
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.submitReminder()}
          >
            <Text style={{ fontSize: 15, color: "white" }}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
