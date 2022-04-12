import config from "../config/config.json";
import Product from "../interface/product";

const productModel = {
    getProducts: async function getProducts(): Promise<Product[]> {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },

    updateProduct: async function updateProduct(order: Partial<Product>) {
        try {
            await fetch(`${config.base_url}/products?api_key=${config.api_key}`, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
        } catch (error) {
            console.log("Could not update product");
        }
    }
};

export default productModel;