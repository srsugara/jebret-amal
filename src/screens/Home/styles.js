import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  },
  headline: {
    flex: 0.5,
    backgroundColor: "#FFFFFF50",
    marginBottom: 15,
    padding: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  wrapBanner: {
    flex: 2,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center"
  },
  banner: {
    flex: 1,
    width: width * 90 / 100,
    borderRadius: 100
  },
  wrapMenu: {
    flex: 1.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    width: width
  },
  wrapTwoMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FFFFFF50",
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: "column",
    borderRadius: 20
  },
  iconMenu: {
    marginBottom: 5,
    borderBottomWidth: 2,
    borderColor: "gray",
    paddingBottom: 10
  },
  textMenu: {
    fontSize: 12,
    color: "gray"
  }
});

module.exports = styles;
