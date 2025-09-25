"use client";

import { useState } from "react";
import {
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Box,
    FormControlLabel,
    Switch,
} from "@mui/material";
import Image from "next/image";

export default function ProductForm({
    onSubmit,
    initialData = {},
    categories,
}) {
    const [name, setName] = useState(initialData.name || "");
    const [description, setDescription] = useState(initialData.description || "");
    const [category, setCategory] = useState(initialData.category?._id || "");
    const [price, setPrice] = useState(initialData.price || "");
    const [originalPrice, setOriginalPrice] = useState(
        initialData.originalPrice || ""
    );
    const [discount, setDiscount] = useState(initialData.discount || "");
    const [inStock, setInStock] = useState(
        initialData.inStock !== undefined ? initialData.inStock : true
    );

    const [imagePreview, setImagePreview] = useState(initialData.image || "");
    const [imageFile, setImageFile] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview("");
        setImageFile(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            name,
            description,
            category,
            price: price ? Number(price) : null,
            originalPrice: originalPrice ? Number(originalPrice) : null,
            discount: discount ? Number(discount) : null,
            inStock,
            image: imageFile || imagePreview,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
                required
            />

            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={3}
            />

            <FormControl fullWidth margin="normal" required>
                <InputLabel>Category</InputLabel>
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label="Category"
                >
                    {categories.map((cat) => (
                        <MenuItem key={cat._id} value={cat._id}>
                            {cat.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                label="Original Price"
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                fullWidth
                margin="normal"
                required
            />

            <TextField
                label="Price (Discounted)"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Discount (%)"
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                fullWidth
                margin="normal"
            />

            <FormControlLabel
                control={
                    <Switch
                        checked={inStock}
                        onChange={(e) => setInStock(e.target.checked)}
                    />
                }
                label="In Stock"
            />

            <Box marginY={2}>
                {imagePreview ? (
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={1}
                    >
                        <Image
                            src={imagePreview}
                            alt="Preview"
                            width={100}
                            height={100}
                            style={{
                                maxWidth: "100%",
                                maxHeight: 200,
                                borderRadius: 8,
                            }}
                        />
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleRemoveImage}
                        >
                            Remove Image
                        </Button>
                    </Box>
                ) : (
                    <Button variant="outlined" component="label" fullWidth>
                        Upload Image
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                        />
                    </Button>
                )}
            </Box>

            <Button type="submit" variant="contained" fullWidth>
                {initialData._id ? "Update Product" : "Add Product"}
            </Button>
        </form>
    );
}
