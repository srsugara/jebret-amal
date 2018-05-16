import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

//Component
import HomeScreen from "../screens/Home/index.js";
import DaftarMutabaah from "../screens/DaftarMutabaah/index.js";
import TambahYaumiyah from "../screens/TambahYaumiyah/index.js";
import LembarMutabaah from "../screens/LembarMutabaah/index.js";
import RekapMutabaah from "../screens/RekapMutabaah/index.js";

const AppNavigator = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        header: null
      })
    },
    DaftarMutabaah: {
      screen: DaftarMutabaah,
      navigationOptions: () => ({
        title: "Daftar Mutabaah"
      })
    },
    LembarMutabaah: {
      screen: LembarMutabaah,
      navigationOptions: () => ({
        title: "Lembar Mutabaah"
      })
    },
    RekapMutabaah: {
      screen: RekapMutabaah,
      navigationOptions: () => ({
        title: "Rekap Mutabaah"
      })
    },
    TambahYaumiyah: {
      screen: TambahYaumiyah,
      navigationOptions: () => ({
        title: "Tambah Yaumiyah"
      })
    }
  },
  {
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: "#FFFFF0"
      },
      headerTitleStyle: {
        color: "#8B0000"
      },
      headerTintColor: "#8B0000"
    })
  }
);

export default () => (
  <Root>
    <AppNavigator />
  </Root>
);
