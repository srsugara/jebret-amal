import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFF0",
    paddingTop: 10
  },
  wrapItem: {
    height: height / 9,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
    marginLeft: 15,
    marginRight: 15,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10
  },
  textAmal: {
    fontSize: 20,
    color: "gray"
  },
  floatingBtn: {
    flex: 1,
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: "#BF1E2E",
    backgroundColor: "#BF1E2E",
    elevation: 5
  }
});

module.exports = styles;
