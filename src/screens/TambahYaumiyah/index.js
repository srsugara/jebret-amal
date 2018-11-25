import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { CheckBox } from "native-base";
import { SQLite } from "expo";

import styles from "./styles";

const db = SQLite.openDatabase("db.db");

export default class TambahYaumiyah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amal: "",
      jam: "",
      menit: "",
      check: {
        senin: false,
        selasa: false,
        rabu: false,
        kamis: false,
        jumat: false,
        sabtu: false,
        minggu: false
      },
      count: 0,
      days: []
    };
    this.checklist = this.checklist.bind(this);
    this.addReminder = this.addReminder.bind(this);
  }

  onChanged(text, type) {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        // your call back function
        alert("Masukkan harus angka");
      }
    }
    if (type == 1) {
      this.setState({ jam: newText });
    } else {
      this.setState({ menit: newText });
    }
  }

  checklist(day) {
    // console.log("-------", this.state.check[day])
    console.log("before count : ", this.state.count, "days", this.state.days);
    let check = Object.assign({}, this.state.check); //creating copy of object
    if (this.state.check[day] === false) {
      check[day] = true;
      this.setState(
        {
          check: check,
          count: this.state.count + 1,
          days: [...this.state.days, day]
        },
        () =>
          console.log(
            "after count : ",
            this.state.count,
            "days",
            this.state.days
          )
      );
    } else {
      let index = this.state.days.indexOf(day);
      check[day] = false;
      this.setState({
        check: check,
        count: this.state.count - 1,
        days: this.state.days.filter((_, i) => i !== index)
      });
    }
  }

  addReminder() {
    db.transaction(
      tx => {
        tx.executeSql(`insert into mutabaah_yaumiyah (nama) values (?)`, [
          this.state.amal
        ]);
        for (i = 0; i < this.state.count; i++) {
          tx.executeSql(
            `insert into transaksi_reminder (nama_mutabaah,hari,waktu) values (?,?,?)`,
            [
              this.state.amal,
              this.state.days[i],
              this.state.jam + ":" + this.state.menit
            ],
            () => alert("Data telah ditambahkan"),
            () => alert("Data gagal ditambahkan")
          );
        }
        // tx.executeSql(
        //   'DROP TABLE mutabaah_yaumiyah'
        // );
        // tx.executeSql(`delete from mutabaah_yaumiyah`);
        // tx.executeSql(`delete from mutabaah_yaumiyah where nama = 'woiwoi';`);
      },
      error => {
        console.log("error add reminder ", error);
      },
      null
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapInput}>
          <Image
            style={styles.iconInput}
            source={require("../../../assets/icon/tag.png")}
          />
          <TextInput
            style={styles.textAmal}
            placeholder="yaumiyah"
            onChangeText={text => this.setState({ amal: text })}
            value={this.state.amal}
            maxLength={30} //setting limit of input>
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.wrapInput}>
          <Image
            style={styles.iconInput}
            source={require("../../../assets/icon/stopwatch.png")}
          />
          <TextInput
            style={styles.textAmal}
            keyboardType="numeric"
            placeholder="jam"
            onChangeText={text => this.onChanged(text, 1)}
            value={this.state.jam}
            maxLength={2} //setting limit of input>
            underlineColorAndroid="transparent"
          />
          <Text style={{ fontSize: 20, color: "gray" }}> : </Text>
          <TextInput
            style={styles.textAmal}
            keyboardType="numeric"
            placeholder="menit"
            onChangeText={text => this.onChanged(text, 2)}
            value={this.state.menit}
            maxLength={2} //setting limit of input>
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={{ flex: 1, marginTop: 20 }}>
          <ScrollView>
            <View style={styles.wrapDay}>
              <Text style={styles.textAmal}>Senin</Text>
              <CheckBox
                color="#8B0000"
                checked={this.state.check.senin}
                onPress={() => this.checklist("senin")}
              />
            </View>
            <View style={styles.wrapDay}>
              <Text style={styles.textAmal}>Selasa</Text>
              <CheckBox
                color="#8B0000"
                checked={this.state.check.selasa}
                onPress={() => this.checklist("selasa")}
              />
            </View>
            <View style={styles.wrapDay}>
              <Text style={styles.textAmal}>Rabu</Text>
              <CheckBox
                color="#8B0000"
                checked={this.state.check.rabu}
                onPress={() => this.checklist("rabu")}
              />
            </View>
            <View style={styles.wrapDay}>
              <Text style={styles.textAmal}>Kamis</Text>
              <CheckBox
                color="#8B0000"
                checked={this.state.check.kamis}
                onPress={() => this.checklist("kamis")}
              />
            </View>
            <View style={styles.wrapDay}>
              <Text style={styles.textAmal}>Jumat</Text>
              <CheckBox
                color="#8B0000"
                checked={this.state.check.jumat}
                onPress={() => this.checklist("jumat")}
              />
            </View>
            <View style={styles.wrapDay}>
              <Text style={styles.textAmal}>Sabtu</Text>
              <CheckBox
                color="#8B0000"
                checked={this.state.check.sabtu}
                onPress={() => this.checklist("sabtu")}
              />
            </View>
            <View style={styles.wrapDay}>
              <Text style={styles.textAmal}>Minggu</Text>
              <CheckBox
                color="#8B0000"
                checked={this.state.check.minggu}
                onPress={() => this.checklist("minggu")}
              />
            </View>
          </ScrollView>
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.addReminder()}
          >
            <Text style={{ fontSize: 15, color: "white" }}>Tambah</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
