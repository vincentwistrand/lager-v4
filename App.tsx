import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import saab from './assets/saab.jpg';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stock from './components/Stock.tsx';

export default function App() {
  return (
      <View style={styles.base}>
        <View style={styles.header}>
          <Text style={{fontSize: 42, marginTop: 43}}>SaabReservdelar</Text>
        </View>
        <Image source={saab} style={{ width: 420, height: 240 }} />
        <StatusBar style="auto" />
        <Stock/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  base: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 100,
    backgroundColor: '#F0FFF0',
    alignItems: 'center',
  }
});
