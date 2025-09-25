"use client";

import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Switch,
    Modal,
    Box,
    Typography,
    IconButton,
    Paper,
    Card,
    CardContent,
    CardActions,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { MdInbox } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { motion } from "framer-motion";
import CategoryForm from "@/components/admin/categoryForm";

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [editCategory, setEditCategory] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem("adminToken") || "";
        const res = await fetch(`/api/categories`, {
            method: "GET", // use GET since backend expects GET
            headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
            const result = await res.json();
            console.log(result, "from fetch categories");

            // result is already an array
            setCategories(result);
        } else {
            console.error("Failed to fetch categories");
        }
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => {
        setOpenModal(false);
        setEditCategory(null);
    };

    const token = localStorage.getItem("adminToken") || "";
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };

    const handleResponse = async (res) => {
        const json = await res.json();
        if (!res.ok) {
            console.error("API Error:", json?.message || "Unknown error");
            throw new Error(json?.message || "Something went wrong");
        }
        return json;
    };

    const addCategory = async (data) => {
        try {
            const res = await fetch(`${apiUrl}/api/category/add`, {
                method: "POST",
                headers,
                body: JSON.stringify(data),
            });
            const result = await handleResponse(res);
            setCategories([...categories, result.data]);
            handleCloseModal();
        } catch (error) {
            console.error("Add Category Error:", error);
        }
    };

    const updateCategory = async (id, data) => {
        try {
            const res = await fetch(`${apiUrl}/api/category/${id}`, {
                method: "PUT",
                headers,
                body: JSON.stringify(data),
            });
            const result = await handleResponse(res);
            setCategories(
                categories.map((c) => (c._id === id ? result.data : c))
            );
            handleCloseModal();
        } catch (error) {
            console.error("Update Category Error:", error);
        }
    };

    const toggleCategoryBlock = async (id) => {
        const res = await fetch(`${apiUrl}/api/category/block/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            const updatedCategory = await res.json();
            setCategories(
                categories.map((c) => (c._id === id ? updatedCategory : c))
            );
        }
    };

    const deleteCategory = async (id) => {
        try {
            const res = await fetch(`${apiUrl}/api/category/${id}`, {
                method: "DELETE",
                headers: { Authorization: headers.Authorization },
            });
            await handleResponse(res);
            setCategories(categories.filter((c) => c._id !== id));
        } catch (error) {
            console.error("Delete Category Error:", error);
        }
    };

    const handleEditClick = (category) => {
        setEditCategory(category);
        setOpenModal(true);
    };

    return (
        <div>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >
                <Typography variant="h4">Manage Categories</Typography>
                {categories.length > 0 && (
                    <Button
                        variant="contained"
                        onClick={handleOpenModal}
                        startIcon={<MdInbox />}
                    >
                        Add Category
                    </Button>
                )}
            </Box>

            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%",
                        maxWidth: 500,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        overflowY: "auto",
                        maxHeight: "90vh",
                    }}
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                    >
                        <Typography variant="h6">
                            {editCategory
                                ? "Edit Category"
                                : "Add New Category"}
                        </Typography>
                        <IconButton onClick={handleCloseModal}>
                            <IoMdClose />
                        </IconButton>
                    </Box>
                    <CategoryForm
                        onSubmit={
                            editCategory
                                ? (data) =>
                                      updateCategory(editCategory._id, data)
                                : addCategory
                        }
                        initialData={editCategory || undefined}
                    />
                </Box>
            </Modal>

            {categories.length > 0 ? (
                isMobile ? (
                    // Mobile view: Cards
                    <Box display="flex" flexDirection="column" gap={2}>
                        {categories.map((category) => (
                            <Card key={category._id} variant="outlined">
                                <CardContent>
                                    <Typography variant="h6">
                                        {category.name}
                                    </Typography>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        mt={1}
                                    >
                                        <Switch
                                            checked={category.isBlocked}
                                            onChange={() =>
                                                toggleCategoryBlock(
                                                    category._id
                                                )
                                            }
                                            color={
                                                category.isBlocked
                                                    ? "error"
                                                    : "success"
                                            }
                                        />
                                        <Typography ml={1}>
                                            {category.isBlocked
                                                ? "Blocked"
                                                : "Active"}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        onClick={() =>
                                            handleEditClick(category)
                                        }
                                        startIcon={<AiOutlineEdit />}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            deleteCategory(category._id)
                                        }
                                        color="error"
                                        startIcon={<AiOutlineDelete />}
                                    >
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                ) : (
                    // Desktop view: Table
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category._id}>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <Switch
                                                checked={category.isBlocked}
                                                onChange={() =>
                                                    toggleCategoryBlock(
                                                        category._id
                                                    )
                                                }
                                                color={
                                                    category.isBlocked
                                                        ? "error"
                                                        : "success"
                                                }
                                            />
                                            <Typography ml={1}>
                                                {category.isBlocked
                                                    ? "Blocked"
                                                    : "Active"}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            onClick={() =>
                                                handleEditClick(category)
                                            }
                                            startIcon={<AiOutlineEdit />}
                                            sx={{ mr: 1 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                deleteCategory(category._id)
                                            }
                                            color="error"
                                            startIcon={<AiOutlineDelete />}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper
                        sx={{
                            p: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            mt: 4,
                        }}
                        elevation={3}
                    >
                        <MdInbox
                            style={{
                                fontSize: 60,
                                color: "gray",
                                marginBottom: 16,
                            }}
                        />
                        <Typography variant="h6" gutterBottom>
                            No Categories Found
                        </Typography>
                        <Typography color="text.secondary" mb={3}>
                            You haven&apos;t created any categories yet. Start by
                            adding your first category.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleOpenModal}
                            startIcon={<AiOutlinePlus />}
                            size="large"
                        >
                            Add Category
                        </Button>
                    </Paper>
                </motion.div>
            )}
        </div>
    );
};

export default CategoriesPage;
