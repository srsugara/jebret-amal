import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFF0",
    paddingTop: 10,
    paddingBottom: 10
  },
  wrapDay: {
    height: height / 12,
    backgroundColor: "#8B0000",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "white",
    marginLeft: 15,
    marginRight: 15,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15
  },
  wrapYaumiyah: {
    height: height / 14,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E1E1E1",
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 15,
    paddingRight: 15
  },
  textAmal: {
    flex: 1,
    fontSize: 20,
    color: "gray",
    marginRight: 10,
    padding: 5
  },
  button: {
    height: height / 14,
    width: width / 2,
    backgroundColor: "#8B0000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  }
});

module.exports = styles;
