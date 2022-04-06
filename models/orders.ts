import config from "../config/config.json";
import Order from "../interface/order";
import products from "./products";

const orders = {
    getOrders: async function getOrders(): Promise<Order[]> {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    pickOrder: function pickOrder(order: Order) {
        let changedOrders = {
            id: order.id,
            name: order.name,
            api_key: config.api_key,
            status: 'Packad',
            status_id: 200
        }
        orders.updateOrder(changedOrders);

        const orderItems = order.order_items;
        for (let i = 0; i < orderItems.length; i++) {
            let changedStock = {
                id: orderItems[i].product_id,
                api_key: config.api_key,
                name: orderItems[i].name,
                stock: orderItems[i].stock - orderItems[i].amount
            }
            products.updateProducts(changedStock);
        };
    },

    updateOrder: async function updateOrder(order: Partial<Order>) {
        try {
            await fetch(`${config.base_url}/orders?api_key=${config.api_key}`, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
        } catch (error) {
            console.log("Could not update order");
        }
    }
};

export default orders;