import React from "react";
import {
  StatusBar,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform
} from "react-native";
import { Notifications, SQLite } from "expo";

import styles from "./styles";

const db = SQLite.openDatabase("db.db");

//setting up notification
const localNotification = {
  title: "Kerjakan dulu yuk sahabat",
  body:
    "Berlomba lomba ngelawan malas yuk, makin sering  ibadah makin tenang rasanya kok", // (string) — body text of the notification.
  ios: {
    // (optional) (object) — notification configuration specific to iOS.
    sound: true // (optional) (boolean) — if true, play a sound. Default: false.
  },
  // (optional) (object) — notification configuration specific to Android.
  android: {
    sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
    //icon (optional) (string) — URL of icon to display in notification drawer.
    //color (optional) (string) — color of the notification icon in notification drawer.
    priority: "high" // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
    //sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
    //vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
    // link (optional) (string) — external link to open when notification is selected.
  }
};

const schedulingOptions = {
  time: Date.now() + 10000 // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
  // repeat: "minute"
};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions
    );
  }

  listenForNotifications = () => {
    Notifications.addListener(notification => {
      // console.log('xxxxxxx :',notification)
      if (notification.origin === "received" && Platform.OS === "android") {
        let amal = "tilawah";
        setTimeout(() => {
          Alert.alert(
            "Yuk " + amal + " sekarang",
            "Berlomba lomba ngelawan malas yuk, makin sering  ibadah makin tenang rasanya kok",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        }, 300);
      }
    });
  };

  componentWillMount() {
    db.transaction(
      tx => {
        // tx.executeSql(
        //   'create table if not exists items (id integer primary key not null, done int, value text);'
        // );
        tx.executeSql(
          // 'create table if not exists mutabaah_yaumiyah (id integer primary key not null, nama text);'
          "create table if not exists mutabaah_yaumiyah (id integer primary key not null, nama text, unique (nama));"
        );
        // tx.executeSql(
        //   'create table if not exists hari (id integer primary key not null, nama text);'
        // );
        // tx.executeSql(
        //   'create table if not exists  rencana_reminder (id integer primary key not null, waktu text, id_m integer NOT NULL, id_h integer NOT NULL, FOREIGN KEY (id_m) REFERENCES mutabaah_yaumiyah(id),FOREIGN KEY (id_h) REFERENCES hari(id));'
        // );
        // tx.executeSql(
        //   'create table if not exists selesai_reminder (id integer primary key not null, tanggal text, selesai int, id_r integer NOT NULL, FOREIGN KEY (id_r) REFERENCES rencana_reminder(id));'
        // );
      },
      null,
      this.add
    );
    this.listenForNotifications();
  }

  // componentDidMount() {
  //   db.transaction(tx => {
  //     tx.executeSql('insert into mutabaah_yaumiyah (nama) values (`sholat dhuha`),(`sholat tahajud`),(`tilawah`)');
  //   });
  // }

  add() {
    db.transaction(
      tx => {
        tx.executeSql(
          `insert into mutabaah_yaumiyah (nama) values ('Dhuha'),('Qiyamul lail'),('Tilawah')`
        );
        // tx.executeSql(
        //   'DROP TABLE mutabaah_yaumiyah'
        // );
        // tx.executeSql(`delete from mutabaah_yaumiyah`);
        // tx.executeSql(`delete from mutabaah_yaumiyah where nama = 'woiwoi';`);
      },
      null,
      null
    );
  }

  render() {
    return (
      <Image
        style={styles.container}
        source={require("../../../assets/bg1.png")}
      >
        <View style={styles.headline}>
          <Text style={{ fontSize: 20, color: "#8B0000", fontWeight: "bold" }}>
            Jebret Amal
          </Text>
          <Text style={{ color: "#8B0000", fontStyle: "italic" }}>
            {" "}
            will help you to increase your amal
          </Text>
        </View>
        <View style={styles.wrapBanner}>
          <Image
            style={styles.banner}
            source={require("../../../assets/Banners.png")}
          />
        </View>

        <View style={styles.wrapMenu}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("DaftarMutabaah")}
          >
            <View style={styles.iconMenu}>
              <Image source={require("../../../assets/icon/list.png")} />
            </View>
            <View>
              <Text style={styles.textMenu}>Daftar</Text>
            </View>
            <View>
              <Text style={styles.textMenu}>Mutaba'ah</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("LembarMutabaah")}
          >
            <View style={styles.iconMenu}>
              <Image source={require("../../../assets/icon/quran.png")} />
            </View>
            <View>
              <Text style={styles.textMenu}>Lembar</Text>
            </View>
            <View>
              <Text style={styles.textMenu}>Mutaba'ah</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("RekapMutabaah")}
          >
            <View style={styles.iconMenu}>
              <Image source={require("../../../assets/icon/graphic.png")} />
            </View>
            <View>
              <Text style={styles.textMenu}>Rekap</Text>
            </View>
            <View>
              <Text style={styles.textMenu}>Mutaba'ah</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Image>
    );
  }
}
