import { Text, View } from 'react-native';
import { Typography } from '../../styles/index.js';
import StockList from './StockList';

export default function Stock(props: {products: any}) {

  return (
    <View style={Typography.main}>
      <Text style={Typography.h2}>Lagerförteckning</Text>
      <StockList products={props.products}/>
    </View>
  );
}
