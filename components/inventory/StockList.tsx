import { useState, useEffect, SetStateAction, Key, ReactChild, ReactFragment, ReactPortal } from 'react';
import { Text, View } from 'react-native';
import { Typography } from '../../styles/index.js';
import productModel from "../../models/products";

export default function StockList(props: { products: any }) {
    const products = props.products;

    const list = products.map((product: { name: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; stock: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }, index: Key | null | undefined) => <Text key={index} style={Typography.p}>{ product.name } - { product.stock }st</Text>);

    return (
        <View>
            {list}
        </View>
    );
}