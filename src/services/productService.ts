import Category from "../interfces/categoryInterface";
import { Product } from "../interfces/productInterface";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchData = async (
    setProducts: (products: Product[]) => void,
    setCategories: (categories: Category[]) => void
) => {
    try {
        const token = localStorage.getItem("adminToken") || "";

        const [productsResponse, categoriesResponse] = await Promise.all([
            fetch(`${apiUrl}/api/product`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`${apiUrl}/api/category`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
        ]);

        if (!productsResponse.ok || !categoriesResponse.ok) {
            throw new Error("Failed to fetch data");
        }

        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();
        console.log("in service");
        console.log("Products:", productsData);
        console.log("Categories:", categoriesData);

        setProducts(productsData);
        setCategories(categoriesData);
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const fetchProducts = async (
    setProducts: (products: Product[]) => void
) => {
    try {
        const token = localStorage.getItem("adminToken") || "";

        const productsResponse = await fetch(`${apiUrl}/api/product`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!productsResponse.ok) {
            throw new Error("Failed to fetch data");
        }

        const productsData = await productsResponse.json();
        console.log("in service");
        console.log("Products:", productsData);

        setProducts(productsData);
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export async function newArrivals(): Promise<Product[]> {
    const response = await fetch(`${apiUrl}/admin/product/new-arrivals`);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch products: ${response.status} ${response.statusText}`
        );
    }

    const json = await response.json();
    console.log("API response:", json);

    if (json.data && Array.isArray(json.data)) {
        return json.data as Product[];
    }

    if (Array.isArray(json)) {
        return json as Product[];
    }

    throw new Error("Unexpected response format from new-arrivals API");
}

export async function getProductDetails(productId: string): Promise<Product> {
    console.log("Fetching product details for ID:", productId);

    const response = await fetch(`${apiUrl}/api/product/${productId}`);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch product details: ${response.status} ${response.statusText}`
        );
    }

    const json = await response.json();
    console.log("API response:", json);

    if (json.data) {
        return json.data as Product;
    }

    throw new Error("Unexpected response format from product details API");
}

export async function getProductsByCategory(
    categoryId: string
): Promise<Product[]> {
    const response = await fetch(
        `${apiUrl}/admin/product/category/${categoryId}`
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch products by category: ${response.status} ${response.statusText}`
        );
    }

    const json = await response.json();
    console.log("API response:", json);

    if (
        json.status === true &&
        json.message === "No products found for this category."
    ) {
        return [];
    }

    if (json.data) {
        return json.data as Product[];
    }

    throw new Error("Unexpected response format from products by category API");
}
