import { View, Text, Button, TouchableOpacity } from "react-native";
import orderModel from "../../models/orders";
import { Typography, Base } from "../../styles";
import OrderItemsInt from "../../interface/order_item";

export default function PickList({ route, navigation }) {
    const { order } = route.params;

    async function pick() {
        await orderModel.pickOrder(order);
        navigation.navigate("Plockbara ordrar", { reload: true });
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
            return  <TouchableOpacity
                        style={Base.loginScreenButton}
                        onPress={pick}
                        accessibilityLabel="Plocka order genom att trycka"
                        >
                        <Text style={Base.loginText}>Plocka order</Text>
                    </TouchableOpacity>
        } else {
            return <Text style={Typography.h4BottomMargin}>Finns inte tillräckligt med produkter i lager för att plocka!</Text>
        }
    }

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