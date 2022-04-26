import { useState, useEffect } from 'react';
import { Base, Typography, Forms } from '../../styles/index.js';
import config from "../../config/config.json";

import { Picker } from '@react-native-picker/picker';
import productModel from "../../models/products";
import deliveryModel from "../../models/deliveries";

import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";

import Delivery from "../../interface/delivery";
import Product from "../../interface/product";

export default function DeliveryForm({ navigation }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    console.log(currentProduct);

    async function addDelivery(): Promise<void> {
        if (delivery.product_id, delivery.amount) {
            await deliveryModel.addDelivery(delivery);
            
            const updatedProduct = {
                ...currentProduct,
                stock: (currentProduct.stock || 0) + (delivery.amount || 0),
                api_key: config.api_key
            };

            await productModel.updateProduct(updatedProduct);

            navigation.navigate("Leveranser", { reload: true });
        }
    }

    return (
        <ScrollView style={{ ...Typography.main }}>
            <Text style={{ ...Typography.h2 }}>Ny inleverans</Text>

            <Text style={{ ...Typography.pBold }}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={{ ...Typography.pBold }}>Datum</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
            />

            <Text style={{ ...Typography.pBold }}>Antal</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />

            <Text style={{ ...Typography.pBold }}>Kommentar</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
            />
            {currentProduct.id ?
                <Button
                    title='Gör inleverans'
                    onPress={() => {
                        addDelivery();
                    }}
                />: null}
        </ScrollView>
    );
};

function ProductDropDown(props: { delivery: { product_id: any; }; setDelivery: (arg0: any) => void; setCurrentProduct: (arg0: any) => void; }) {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    productsHash[111111] = [];

    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue ,api_key: config.api_key });
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            <Picker.Item label='Välj produkt' value="111111"/>
            {itemsList}
        </Picker>
    );
}

function DateDropDown(props: { setDelivery: (arg0: any) => void; delivery: any; }) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    useEffect(async () => {
        const date = new Date();
        props.setDelivery({
            ...props.delivery,
            delivery_date: date.toLocaleDateString('se-SV'),
        });
    }, []);

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}