import { View, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import orderModel from "../models/orders";
import { Typography, Base } from "../styles";
import OrderItemsInt from "../interface/order_item";
// import jq from 'jqts';

export default function PickList({ route, navigation }) {
    const { order } = route.params;

    async function pick() {
        await orderModel.pickOrder(order);
        navigation.navigate("List", { reload: true });
    }

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text style={Typography.p}
                key={index}
                >
                    {item.name} - {item.amount}st - {item.location}
            </Text>;
    });

    function pickBottom() {
        var inStock = true;
        order.order_items.map((item: OrderItemsInt) => {
            if (item.amount > item.stock) {
                inStock = false;
            }
        });
        if (inStock) {
            return <TouchableOpacity
                style={Base.loginScreenButton}
                onPress={pick}
                underlayColor='#fff'>
                <Text style={Base.loginText}>Plocka order</Text>
            </TouchableOpacity>
        } else {
            return <Text style={Typography.h4BottomMargin}>Finns inte tillräckligt med produkter i lager för att plocka!</Text>
        }
    }

    // const findAmount = jq.compile('[.order_items[].amount]');
    // const findStock = jq.compile('[.order_items[].stock]');
    // const amount = findAmount.evaluate(order);
    // const stock = findStock.evaluate(order);

    return (
        <View style={Typography.main}>
            <Text style={Typography.h2}>{order.name}</Text>
            <Text style={Typography.p}>{order.address}</Text>
            <Text style={Typography.p}>{order.zip} {order.city}</Text>

            <Text style={Typography.h4TopMargin}>Produkter: </Text>

            {orderItemsList}<Text>{"\n"}</Text>
            
            {pickBottom()}
        </View>
    )
};