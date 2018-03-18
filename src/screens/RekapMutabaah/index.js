import React, { Component } from "react";
import { View, Text, Picker, PickerIOS, Platform } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme} from "victory-native";

import styles from "./styles";

const data = [
  { quarter: "Sedekah", earnings: 80 },
  { quarter: "Sholat Duha", earnings: 95 },
  { quarter: "Sholat Tahajud", earnings: 77.5 },
  { quarter: "Al Ma'surat Pagi", earnings: 95 },
  { quarter: "Al Ma'surat Petang", earnings: 80 },
  { quarter: "Tilawah", earnings: 95 }
];

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
      month: ""
    };
  }

  render() {
    if (Platform.OS === "android") {
      return (
        <View style={styles.container}>
          <Picker
            style={styles.wrapDay}
            selectedValue={this.state.month}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ month: itemValue })
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
              data={data}
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
              data={data}
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
