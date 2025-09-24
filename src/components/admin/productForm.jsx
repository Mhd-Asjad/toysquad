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
} from "@mui/material";
import Image from "next/image";


export default function ProductForm({
    onSubmit,
    initialData = {},
    categories,
}) {
    const [name, setName] = useState(initialData.name || "");
    const [description, setDescription] = useState(
        initialData.description || ""
    );
    const [category, setCategory] = useState(initialData.category?._id || "");
    const [imagePreview, setImagePreview] = useState(initialData.image || "");
    const [imageFile, setImageFile] = useState<File | null>(null);

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
            image: imageFile || imagePreview,
            category,
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
                required
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
