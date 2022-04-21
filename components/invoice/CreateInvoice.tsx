import { useState, useEffect } from 'react';
import { Text, View } from "react-native";
import { Base, Typography } from '../../styles/index.js';
import { TouchableOpacity } from "react-native-gesture-handler";
import { DataTable } from "react-native-paper";

import { Picker } from '@react-native-picker/picker';
import orderModel from "../../models/orders";
import invoiceModel from "../../models/invoices";
import Order from "../../interface/order";
import OrderItemsInt from "../../interface/order_item";


export default function CreateInvoice({ navigation }) {
    const [currentOrder, setCurrentOrder] = useState<Order[]>([]);

    async function createInvoice(currentOrder: Order[]) {
        if (currentOrder.length != 0) {
            await invoiceModel.addInvoice(currentOrder);
            await orderModel.updateOrderInvoiced(currentOrder);
            navigation.navigate("ViewInvoices", { reload: true });
        }
    }

    var listOfOrders;
    var sum = 0;
    if (currentOrder.length != 0) {
        listOfOrders = currentOrder.order_items
        .map((orderItem: OrderItemsInt, index: number) => {
            sum += orderItem.amount * orderItem.price
            return <DataTable.Row key={index}>
                    <DataTable.Cell style={{flex: 11}}>{orderItem.name}</DataTable.Cell>
                    <DataTable.Cell style={{flex: 3}}>{orderItem.amount}</DataTable.Cell>
                    <DataTable.Cell style={{flex: 4}}>{orderItem.price}:-</DataTable.Cell>
                    <DataTable.Cell style={{flex: 4}}>{orderItem.amount * orderItem.price}:-</DataTable.Cell>
                </DataTable.Row>
        });
    }

    return (
        <View style={{ ...Typography.main }}>
            <Text style={{ ...Typography.h2 }}>Skapa Faktura</Text>

            <Text style={{ ...Typography.pBold }}>Ordrar</Text>
            <ProductDropDown
                currentOrder={currentOrder}
                setCurrentOrder={setCurrentOrder}
            />

            <Text style={{ ...Typography.pBold }}>{currentOrder.name}</Text>
            <Text style={{ ...Typography.pBold }}>{currentOrder.address}</Text>
            <Text style={{ ...Typography.pBold }}>{currentOrder.zip}</Text>
            <Text style={{ ...Typography.pBold }}>{currentOrder.country}</Text>

            <DataTable>
                <DataTable.Header style={{textAlign: "center"}}>
                    <DataTable.Title style={{flex: 11}}>Produkt</DataTable.Title>
                    <DataTable.Title style={{flex: 3, justifyContent: "left"}} numeric>Antal</DataTable.Title>
                    <DataTable.Title style={{flex: 4, justifyContent: "left"}} numeric>Pris</DataTable.Title>
                    <DataTable.Title style={{flex: 4, justifyContent: "left"}} numeric>Totalt</DataTable.Title>
                </DataTable.Header>
                {listOfOrders}
                <DataTable.Row>
                    <DataTable.Cell style={{flex: 11, justifyContent: "left"}}> </DataTable.Cell>
                    <DataTable.Cell style={{flex: 3, justifyContent: "left"}}> </DataTable.Cell>
                    <DataTable.Cell style={{flex: 4, justifyContent: "left"}}> </DataTable.Cell>
                    <DataTable.Cell style={{flex: 4, justifyContent: "left"}}>{sum}:-</DataTable.Cell>
                </DataTable.Row>
            </DataTable>

            <TouchableOpacity
                style={Base.loginScreenButton}
                onPress={() => { 
                    createInvoice(currentOrder) 
                }}
                underlayColor='#fff'>
                <Text style={Base.loginText}>Skapa faktura</Text>
            </TouchableOpacity>
        </View>
    );
};

function ProductDropDown(props: { currentOrder: { id: number; };  setCurrentOrder: (arg0: any) => void; }) {
    const [orders, setOrders] = useState<Order[]>([]);
    let ordersHash: any = {};

    useEffect(async () => {
        setOrders(await orderModel.getOrders());
    }, []);

    const itemsList = orders
    .filter(order => order.status != "Fakturerad")
    .map((order, index) => {
        ordersHash[order.id] = order;
        return <Picker.Item key={index} label={order.name} value={order.id} />;
    });

    ordersHash[111111] = [];

    return (
        <Picker
            selectedValue={props.currentOrder?.id}
            onValueChange={(itemValue) => {
                props.setCurrentOrder(ordersHash[itemValue]);
            }}>
            <Picker.Item label='Välj order' value="111111"/>
            {itemsList}
        </Picker>
    );
}