// services/categoryService.ts

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchCategories = async (token) => {
  try {
    const res = await fetch(`/api/categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }

    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
