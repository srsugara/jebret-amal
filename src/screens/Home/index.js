import React from "react";
import { 
  StatusBar,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";

import styles from './styles';

export default class Home extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render() {
    return ( 
      <Image
        style={styles.container}
        source={require('../../../assets/bg1.png')}
      >
      <View style={styles.headline}><Text style={{fontSize: 20, color: '#8B0000', fontWeight: 'bold'}}>Jebret Amal</Text><Text style={{color: '#8B0000', fontStyle: 'italic'}}> will help you to increase your amal</Text></View>
        <View style={styles.wrapBanner}>
        <Image
          style={styles.banner}
          source={require('../../../assets/Banners.png')}
        />
        </View>
        
        <View style={styles.wrapMenu}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("DaftarMutabaah")}>
              <View style={styles.iconMenu} >
                <Image source={require('../../../assets/icon/list.png')} />
              </View>
              <View><Text style={styles.textMenu}>Daftar</Text></View>
              <View><Text style={styles.textMenu}>Mutaba'ah</Text></View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("LembarMutabaah")}>
              <View style={styles.iconMenu} >
                <Image source={require('../../../assets/icon/quran.png')} />
              </View>
              <View><Text style={styles.textMenu}>Lembar</Text></View>
              <View><Text style={styles.textMenu}>Mutaba'ah</Text></View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("RekapMutabaah")}>
              <View style={styles.iconMenu} >
                <Image source={require('../../../assets/icon/graphic.png')} />
              </View>
              <View><Text style={styles.textMenu}>Rekap</Text></View>
              <View><Text style={styles.textMenu}>Mutaba'ah</Text></View>
            </TouchableOpacity>   
        </View>
      </Image>
    );
  }
}