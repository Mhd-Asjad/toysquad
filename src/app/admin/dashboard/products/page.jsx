"use client";

import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Switch,
    Button,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    useTheme,
    useMediaQuery,
    TextField,
    Box,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Paper,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ProductForm from "@/components/admin/productForm";
import { fetchData } from "@/services/productService";
import Image from "next/image";

export default function ProductsPage() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        const loadData = async () => {
            try {
                await fetchData(setProducts, setCategories);
            } catch (error) {
                console.error("Failed to load data:", error);
            }
        };

        loadData();
    }, []);

    const filteredProducts = Array.isArray(products)
        ? products.filter((product) =>
            product.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const addProduct = async (data) => {
        try {
            const token = localStorage.getItem("adminToken") || "";
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("category", data.category);

            if (data.image instanceof File) {
                formData.append("image", data.image);
            } else if (typeof data.image === "string" && data.image) {
                formData.append("image", data.image);
            }

            const res = await fetch(`${apiUrl}/api/product/add`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to add product");
            }

            const newProduct = await res.json();
            setProducts([...products, newProduct.data]);
            toast.success("Product added successfully");
            setModalOpen(false);
        } catch (error) {
            console.log(error)
            toast.error("Error adding product");
        }
    };

    const updateProduct = async (id, data) => {
        try {
            const token = localStorage.getItem("adminToken") || "";
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("category", data.category);

            if (data.image instanceof File) {
                formData.append("image", data.image);
            } else if (typeof data.image === "string") {
                formData.append("image", data.image);
            }

            const res = await fetch(`${apiUrl}/api/product/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(
                    errorData.message || "Failed to update product"
                );
            }

            const updatedProduct = await res.json();
            console.log("Updated product:", updatedProduct.data);
            setProducts(
                products.map((p) => (p._id === id ? updatedProduct.data : p))
            );
            toast.success("Product updated successfully");
            setEditProduct(null);
            setModalOpen(false);
        } catch (error) {
            console.log(error)
            toast.error("Error updating product");
        }
    };

    const toggleProductBlock = async (id, isBlocked) => {
        try {
            const token = localStorage.getItem("adminToken") || "";
            const res = await fetch(`${apiUrl}/api/product/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ isBlocked: !isBlocked }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(
                    errorData.message || "Failed to toggle product status"
                );
            }

            setProducts(
                products.map((p) =>
                    p._id === id ? { ...p, isBlocked: !isBlocked } : p
                )
            );
            toast.success(
                `Product ${!isBlocked ? "blocked" : "unblocked"} successfully`
            );
        } catch (error) {
            console.log(error)
            toast.error("Error toggling product status");
        }
    };

    const deleteProduct = async (id) => {
        try {
            const token = localStorage.getItem("adminToken") || "";
            const res = await fetch(`${apiUrl}/api/product/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(
                    errorData.message || "Failed to delete product"
                );
            }

            setProducts(products.filter((p) => p._id !== id));
            toast.success("Product deleted successfully");
        } catch (error) {
            console.log(error)
            toast.error("Error deleting product");
        }
    };

    const handleOpenModalForAdd = () => {
        setEditProduct(null);
        setModalOpen(true);
    };

    const handleOpenModalForEdit = (product) => {
        setEditProduct(product);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditProduct(null);
        setModalOpen(false);
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />

            <Typography variant="h5" gutterBottom>
                Manage Products
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: isSmallScreen ? "column" : "row",
                    gap: 2,
                    alignItems: isSmallScreen ? "stretch" : "center",
                    mb: 2,
                }}
            >
                <TextField
                    label="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth={isSmallScreen}
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenModalForAdd}
                >
                    Add Product
                </Button>
            </Box>

            {isSmallScreen ? (
                <Grid container spacing={2}>
                    {products && products.length ? (
                        filteredProducts.map((product) => (
                            <Grid size={{ xs: 12 }} key={product._id}>
                                <Card>
                                    <CardContent
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={100}
                                            height={100}
                                            style={{
                                                width: 80,
                                                height: 80,
                                                objectFit: "cover",
                                                borderRadius: 8,
                                                marginRight: 12,
                                            }}
                                        />
                                        <div style={{ flexGrow: 1 }}>
                                            <Typography variant="subtitle1">
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {product.category?.name ||
                                                    "N/A"}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {product.isBlocked
                                                    ? "Blocked"
                                                    : "Active"}
                                            </Typography>
                                        </div>
                                        <Switch
                                            checked={product.isBlocked}
                                            onChange={() =>
                                                toggleProductBlock(
                                                    product._id,
                                                    product.isBlocked
                                                )
                                            }
                                        />
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            onClick={() =>
                                                handleOpenModalForEdit(product)
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="small"
                                            color="error"
                                            onClick={() =>
                                                deleteProduct(product._id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3}>
                                <p>No products found</p>
                            </TableCell>
                        </TableRow>
                    )}
                </Grid>
            ) : (
                <Paper elevation={2} sx={{ overflowX: "auto" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products && products.length ? (
                                filteredProducts.map((product) => (
                                    <TableRow key={product._id}>
                                        <TableCell>
                                            <Image
                                                src={
                                                    product.image ||
                                                    "https://via.placeholder.com/50"
                                                }
                                                alt={product.name}
                                                width={50}
                                                height={50}
                                                style={{
                                                    objectFit: "cover",
                                                    borderRadius: 4,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>
                                            {product.description}
                                        </TableCell>
                                        <TableCell>
                                            {product.category?.name || "N/A"}
                                        </TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={product.isBlocked}
                                                onChange={() =>
                                                    toggleProductBlock(
                                                        product._id,
                                                        product.isBlocked
                                                    )
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() =>
                                                    handleOpenModalForEdit(
                                                        product
                                                    )
                                                }
                                                color="primary"
                                            >
                                                <AiOutlineEdit />
                                            </IconButton>
                                            <IconButton
                                                onClick={() =>
                                                    deleteProduct(product._id)
                                                }
                                                color="error"
                                            >
                                                <AiOutlineDelete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <p>No products found</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            )}

            <Dialog
                open={modalOpen}
                onClose={handleCloseModal}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    {editProduct ? "Edit Product" : "Add Product"}
                </DialogTitle>
                <DialogContent>
                    <ProductForm
                        onSubmit={(data) =>
                            editProduct
                                ? updateProduct(editProduct._id, data)
                                : addProduct(data)
                        }
                        initialData={editProduct || undefined}
                        categories={categories.filter((c) => !c.isBlocked)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
