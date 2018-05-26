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

// const db = SQLite.openDatabase({name: 'ta.db', createFromLocation: '~jebret.db'});
const db = SQLite.openDatabase("db.db");
let t = new Date();
t.setHours(9);
t.setMinutes(26);

//setting up notification
const localNotification = {
  title: "Kerjakan dulu yuk sahabat",
  body:
    "Berlomba lomba ngelawan malas yuk, makin sering ibadah makin tenang rasanya kok", // (string) — body text of the notification.
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

const schedulingOptions1 = {
  time: t // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
  // repeat: "week"
};

const schedulingOptions2 = {
  time: (new Date()).getTime() + 1000 // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
  // repeat: "week"
};

let listTime = [];

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: []
    };
    Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions1
    );
    Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions2
    );
    console.log('waktuuuuuu', (new Date()).getTime()+1000);
  }

  listenForNotifications = () => {
    Notifications.addListener(notification => {
      console.log('xxxxxxx :',notification)
      if (notification.origin === "received") {
        let amal = "tilawah";
        setTimeout(() => {
          Alert.alert(
            "Yuk " + amal + " sekarang",
            "Berlomba lomba ngelawan malas yuk, makin sering  ibadah makin tenang rasanya kok",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        }, 200);
      }
    });
  };

  componentWillMount() {
    db.transaction(
      tx => {
        // tx.executeSql(
        //   "DROP TABLE IF EXISTS mutabaah_yaumiyah"
        // );
        // tx.executeSql(
        //   "DROP TABLE IF EXISTS hari"
        // );
        // tx.executeSql(
        //   "DROP TABLE IF EXISTS transaksi_reminder"
        // );
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS mutabaah_yaumiyah (id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,nama	TEXT NOT NULL UNIQUE);"
        );
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS hari (id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,nama	TEXT UNIQUE);"
        );
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS transaksi_reminder (id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,nama_mutabaah	TEXT NOT NULL,hari	TEXT NOT NULL,waktu	TEXT NOT NULL,selesai	INTEGER DEFAULT 0);"
        );
      },
      error => {
        console.log("zzzzzzz", error);
      },
      null
    );
    this.listenForNotifications();
  }

  insertFirst() {
    db.transaction(
      tx => {
        tx.executeSql(
          `INSERT INTO mutabaah_yaumiyah (nama) VALUES ('Dhuha'),('Tahajjud'),('Tilawah')`
        );
        // tx.executeSql(`delete from mutabaah_yaumiyah`);
        // tx.executeSql(`delete from mutabaah_yaumiyah where nama = 'woiwoi';`);
      },
      error => {
        console.log("grrrrrrrr", error);
      },
      this.deleteFirst
    );
  }

  deleteFirst() {
    db.transaction(
      tx => {
        tx.executeSql(`DELETE FROM mutabaah_yaumiyah`);
        // tx.executeSql(`delete from mutabaah_yaumiyah`);
        // tx.executeSql(`delete from mutabaah_yaumiyah where nama = 'woiwoi';`);
      },
      error => {
        console.log("grrrrrrrr", error);
      },
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
