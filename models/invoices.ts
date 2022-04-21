import config from "../config/config.json";
import Invoice from "../interface/invoice";
import Order from "../interface/order";
import OrderItemsInt from "../interface/order_item";
import storage from "./storage";

const invoiceModel = {
    getInvoices: async (): Promise<Invoice[]> => {
        const token = await storage.readToken();
        console.log(token);
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            method: 'get',
            headers: {
                'x-access-token': token.token
            }
        });
        const result = await response.json();

        return result.data;
    },

    addInvoice: async (order: Order) => {
        const date: Date = new Date();

        function addMonths(numOfMonths, date = new Date()) {
            date.setMonth(date.getMonth() + numOfMonths);
          
            return date;
          }
        const todaysDate = date.toLocaleDateString('se-SV')
        const dueDate = addMonths(1, date).toLocaleDateString('se-SV');

        var sum: number = 0;
        order.order_items
        .map((orderItem: OrderItemsInt) => {
            sum += orderItem.amount * orderItem.price
        });

        const invoice = {
            total_price: sum,
            order_id: order.id,
            api_key: config.api_key,
            creation_date: todaysDate,
            due_date: dueDate
        }
        console.log(invoice);

        const token = await storage.readToken();
        console.log(token.token);
        try {
            const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
                method: 'post',
                headers: {
                    'x-access-token': token.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(invoice)
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.log("Could not add invoice");
        }
    }
};

export default invoiceModel;