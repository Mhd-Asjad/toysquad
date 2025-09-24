// services/categoryService.ts

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchCategories = async (token: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/category`, {
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
