import React from "react";
import { Button, StyleSheet, Text, View, Dimensions } from "react-native";
import { Permissions, Constants } from "expo";
import { Entypo } from "@expo/vector-icons";

//Component
import Navigation from "./src/navigations/RootNavigation.js";

let { width, height } = Dimensions.get("window");

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  //get permission on ios
  async componentDidMount() {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.lisDevice && resut.status === "granted") {
      console.log("Notification permissions granted.");
    }
  }
  //or
  // async function getiOSNotificationPermission() {
  //   const { status } = await Permissions.getAsync(
  //     Permissions.NOTIFICATIONS
  //   );
  //   if (status !== 'granted') {
  //     await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //   }
  // }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      {
        /* <Entypo name="500px-with-circle" size={50} color="green" /> */
      }
      return <Expo.AppLoading />;
    }
    return <Navigation />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
