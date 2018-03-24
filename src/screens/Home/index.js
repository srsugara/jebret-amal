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
import { Notifications } from 'expo';

import styles from "./styles";

const localNotification = {
  title: "Kerjakan dulu yuk sahabat",
  body: "Berlomba lomba ngelawan malas yuk, makin sering  ibadah makin tenang rasanya kok", // (string) — body text of the notification.
  ios: {
    // (optional) (object) — notification configuration specific to iOS.
    sound: true // (optional) (boolean) — if true, play a sound. Default: false.
  },
  // (optional) (object) — notification configuration specific to Android.
  android: {
    sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
    //icon (optional) (string) — URL of icon to display in notification drawer.
    //color (optional) (string) — color of the notification icon in notification drawer.
    priority: "high", // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
    //sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
    //vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
    // link (optional) (string) — external link to open when notification is selected.
  }
};

const schedulingOptions = {
  time: Date.now() + 3000, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
  // repeat: "minute"
};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
  }

  listenForNotifications = () => {
    Notifications.addListener(notification => {
      console.log('xxxxxxx :',notification)
      if (notification.origin === 'received' && Platform.OS === 'android') {
        let amal = "tilawah";
        setTimeout(() => {
          Alert.alert('Yuk '+amal+' sekarang',
          'Berlomba lomba ngelawan malas yuk, makin sering  ibadah makin tenang rasanya kok',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false })
        },500)
      }
    });
  };

  componentWillMount() {
    this.listenForNotifications();
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
