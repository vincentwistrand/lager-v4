import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const base = {
  flex: 1,
  backgroundColor: '#FFF',
}

export const header = {
  alignItems: 'center',
  backgroundColor: '#FFF',
  height: 60,
}
export const image = {
  width: screenWidth,
  height: 220,
  alignItems: 'center',
}
export const text = {
  height: 70,
  alignItems: 'center',
  fontSize: 50,
  fontWeight: 'bold'
}
export const button = {
  backgroundColor: '#007AFF'
}

export const deliveryBase = {
  height: 110,
  padding: 10,
  marginBottom: 5,
  backgroundColor: '#FFF',
}