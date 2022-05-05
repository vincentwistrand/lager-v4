import config from "../config/config.json";
import Delivery from "../interface/delivery";

const deliveryModel = {
    getDeliveries: async function getDeliveries(): Promise<Delivery[]> {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },

    addDelivery: async function addDeliveries(delivery: Partial<Delivery>): Promise<Delivery[]> {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(delivery)
        });

        const result = await response.json();
        
        return result.data;
    }
};

export default deliveryModel;