import axios from 'axios'

export const BASE_URL: string = "https://676ac00c863eaa5ac0df824c.mockapi.io/tinatodolist/product"


export async function GetProducts() {
    try {
        const response =await axios.get(BASE_URL)
        return response.data;
    } catch (error) {
        console.error("Error fetching products", error);
        return [];

    }
}
