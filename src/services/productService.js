
export const fetchData = async (setProducts, setCategories) => {
    try {
        const token = localStorage.getItem("adminToken") || "";

        const [productsResponse, categoriesResponse] = await Promise.all([
            fetch(`/api/products`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`/api/categories`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
        ]);

        if (!productsResponse.ok || !categoriesResponse.ok) {
            throw new Error("Failed to fetch data");
        }

        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();
        // console.log("in service");
        // console.log("Products:", productsData);
        // console.log("Categories:", categoriesData);

        setProducts(productsData);
        setCategories(categoriesData);
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const fetchProducts = async (setProducts) => {
    try {
        const token = localStorage.getItem("adminToken") || "";

        const productsResponse = await fetch(`/api/products`, {
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

export async function newArrivals() {
    const response = await fetch(`/admin/product/new-arrivals`);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch products: ${response.status} ${response.statusText}`
        );
    }

    const json = await response.json();
    console.log("API response:", json);

    if (json.data && Array.isArray(json.data)) {
        return json.data;
    }

    if (Array.isArray(json)) {
        return json;
    }

    throw new Error("Unexpected response format from new-arrivals API");
}

export async function getProductDetails(productId) {
    console.log("Fetching product details for ID:", productId);

    const response = await fetch(`/api/products/${productId}`);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch product details: ${response.status} ${response.statusText}`
        );
    }

    const json = await response.json();
    console.log("API response:", json);

    if (json.data) {
        return json.data;
    }

    throw new Error("Unexpected response format from product details API");
}

export async function getProductsByCategory(categoryId) {
    const response = await fetch(
        `/admin/product/category/${categoryId}`
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
        return json.data;
    }

    throw new Error("Unexpected response format from products by category API");
}
