// components/CategoryForm.tsx
'use client';

import { useState } from 'react';
import { TextField, Button } from '@mui/material';

export default function CategoryForm({ onSubmit, initialData = {} }) {
  const [name, setName] = useState(initialData.name || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" fullWidth>
        {initialData._id ? 'Update Category' : 'Add Category'}
      </Button>
    </form>
  );
}