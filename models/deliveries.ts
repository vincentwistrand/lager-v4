import config from "../config/config.json";
import Delivery from "../interface/delivery";

const deliveryModel = {
    getDeliveries: async function getDeliveries(): Promise<Delivery[]> {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },

    addDelivery: async function addDeliveries(delivery: Partial<Delivery>) {
        try {
            await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(delivery)
            });
        } catch (error) {
            console.log("Could not add delivery!");
        }
    }
};

export default deliveryModel;