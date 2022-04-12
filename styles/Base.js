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
  backgroundColor: '#d9d9d9',
  borderRadius: 5
}

export const loginScreenButton = {
  marginRight:40,
  marginLeft:40,
 marginTop:10,
  paddingTop:10,
  paddingBottom:10,
  backgroundColor:'#1E6738',
  borderRadius:10,
  borderWidth: 1,
  borderColor: '#fff'
}

export const loginText = {
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
}