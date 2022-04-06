import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Typography } from '../styles/index.js';
import products from "../models/products";

function StockList() {
  const [allProducts, setProducts] = useState([]);

  useEffect(async () => {
      setProducts(await products.getProducts());
  }, []);

  const list = allProducts.map((product, index) => <Text key={index} style={Typography.p}>{ product.name } - { product.stock }st</Text>);

  return (
    <View>
      {list}
    </View>
  );
}

export default function Stock() {
  return (
    <View style={Typography.main}>
      <Text style={Typography.h2}>Lagerförteckning</Text>
      <StockList/>
    </View>
  );
}
