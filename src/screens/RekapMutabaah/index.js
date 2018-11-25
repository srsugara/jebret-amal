import React, { Component } from "react";
import { View, Text, Picker, PickerIOS, Platform } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import Expo, { SQLite } from "expo";
import styles from "./styles";
const db = SQLite.openDatabase("db.db");

export default class RekapMutabaah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      months: [
        "Pilih Bulan",
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
      ],
      month: "",
      data: [],
      dataChange: []
    };
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
          `SELECT * FROM transaksi_reminder`,
          null,
          (_, { rows: { _array } }) => this.setState({ transactions: _array }, ()=>{
            console.log("uhuyyy",this.state.transactions)
          })
        );
      },
      error => {
        console.log("error", error);
      },
      x => {
        let data=this.state.mutabaahs.map((x,y) => {
          var done=0;
          for(i=0;i<this.state.transactions.length;i++) {
            if(this.state.transactions[i].nama_mutabaah==x.nama && this.state.transactions[i].selesai==1) {
              done++;
            }
          }
          x.quarter = x.nama;
          x.earnings = (done/30)*100;
          delete x.id;
          delete x.nama;
          return x;
        });
        this.setState({data},()=>{
          console.log(data);
        });
      }
    );
  }

  render() {
    if (Platform.OS === "android") {
      return (
        <View style={styles.container}>
          <Picker
            selectedValue="Oktober"
            style={styles.wrapDay}
            selectedValue={this.state.month}
            onValueChange={(itemValue, itemIndex) =>
              {if (itemValue=="Oktober") {
                this.setState({ dataChange:this.state.data,month: itemValue })
              } else {
                this.setState({ dataChange:[],month: itemValue })
              }}
            }
          >
            {this.state.months.map((data, index) => (
              <Picker.Item key={index} label={data} value={data} />
            ))}
          </Picker>
          <VictoryChart
            width={320}
            theme={VictoryTheme.material}
            domainPadding={{ x: 15 }}
            padding={{ top: 40, bottom: 40, left: 115, right: 30 }}
          >
            <VictoryBar
              horizontal
              data={this.state.dataChange}
              alignment="end"
              x="quarter"
              y="earnings"
              labels={d => `${d.earnings} %`}
            />
          </VictoryChart>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: "#FFFFF0" }}>
          <PickerIOS
            selectedValue={this.state.month}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ month: itemValue })
            }
          >
            {this.state.months.map((data, index) => (
              <PickerIOS.Item key={index} label={data} value={data} />
            ))}
          </PickerIOS>
          <VictoryChart
            width={320}
            theme={VictoryTheme.material}
            domainPadding={{ x: 15 }}
            padding={{ top: 40, bottom: 40, left: 115, right: 30 }}
          >
            <VictoryBar
              horizontal
              data={this.state.data}
              alignment="end"
              x="quarter"
              y="earnings"
              labels={d => `${d.earnings} %`}
            />
          </VictoryChart>
        </View>
      );
    }
  }
}
