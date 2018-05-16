import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFF0",
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center"
  },
  wrapDay: {
    height: height / 12,
    width: width / 2,
    backgroundColor: "white",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    marginLeft: 15,
    marginRight: 15,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15
  }
});

module.exports = styles;
