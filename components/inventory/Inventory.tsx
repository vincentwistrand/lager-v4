import { Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Base } from '../../styles/index.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stock from './Stock';
import productModel from "../../models/products";
import Product from '../../interface/product.js';

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(async () => {
    setProducts(await productModel.getProducts());
}, []);

  return (
      <SafeAreaView style={Base.base}>
        <View style={{backgroundColor: '#1E6738', height: 44}}><Text style={{color:'#fff', textAlign:'center', fontSize: 17, marginTop:10, fontWeight: 'bold'}}>Lager</Text></View>
        <View style={Base.base}>
          <Stock products={products}/>
        </View>
      </SafeAreaView>
  );
}