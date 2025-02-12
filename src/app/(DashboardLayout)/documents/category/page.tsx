'use client'

import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const DocumentCategoriesPage = () => {
    const [name, setName] = useState<string>(''); // Typage explicite pour le state
    const [description, setDescription] = useState<string>(''); // Typage explicite pour le state

    // Typage explicite pour handleSubmit
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Logique pour envoyer les données à Firebase
        console.log({ name, description });
    };

    return (
        <Box sx={{ maxWidth: 500, margin: 'auto', padding: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
            <h1>Ajouter une Catégorie de Document</h1>
            <form onSubmit={handleSubmit}>
                {/* Nom */}
                <TextField
                    fullWidth
                    label="Nom"
                    variant="outlined"
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                {/* Description */}
                <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/* Submit Button */}
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Enregistrer
                </Button>
            </form>
        </Box>
    );
};

export default DocumentCategoriesPage;
