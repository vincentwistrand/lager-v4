import { Image, Text, View } from 'react-native';
import { Base } from '../../styles/index.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import saab from '../../assets/saab.jpg';
import Stock from './Stock';

export default function Inventory() {
  return (
      <SafeAreaView style={Base.base}>
        <View style={Base.base}>
          <View style={Base.header}>
            <Text style={Base.text}>SaabReservdelar</Text>
          </View>
          <Image source={saab} style={Base.image} />
          <Stock/>
        </View>
      </SafeAreaView>
  );
}