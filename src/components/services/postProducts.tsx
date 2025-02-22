import axios from "axios";

export const BASE_URL: string = "https://676ac00c863eaa5ac0df824c.mockapi.io/tinatodolist";

// متد پست برای ارسال محصول جدید
export async function PostProducts(product: { name: string; image?: string }) {
    try {
        const response = await axios.post(`${BASE_URL}/product`, product);
        return response.data;
    } catch (error) {
        console.error("Error posting product", error);
        return null;
    }
}
