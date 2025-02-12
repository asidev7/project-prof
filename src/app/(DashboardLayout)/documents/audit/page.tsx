'use client'

import React, { useState } from 'react';
import { TextField, Button, MenuItem, InputLabel, Select, FormControl, Box } from '@mui/material';

const DocumentsAuditPage = () => {
    const [document, setDocument] = useState<string>(''); // Typage explicite
    const [user, setUser] = useState<string>(''); // Typage explicite
    const [action, setAction] = useState<string>(''); // Typage explicite

    // Liste des documents (à remplacer par des données Firebase plus tard)
    const documentsList = ["Document A", "Document B", "Document C"];

    // Typage explicite pour handleSubmit
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Logique pour envoyer les données à Firebase
        console.log({ document, user, action });
    };

    return (
        <Box sx={{ maxWidth: 500, margin: 'auto', padding: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
            <h1>Ajouter un document Audit</h1>
            <form onSubmit={handleSubmit}>
                {/* Document (Select) */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Document</InputLabel>
                    <Select
                        value={document}
                        onChange={(e) => setDocument(e.target.value)}
                    >
                        {documentsList.map((doc, index) => (
                            <MenuItem key={index} value={doc}>{doc}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* User (Select) */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>User</InputLabel>
                    <Select
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    >
                        <MenuItem value="User 1">User 1</MenuItem>
                        <MenuItem value="User 2">User 2</MenuItem>
                    </Select>
                </FormControl>

                {/* Action (TextField) */}
                <TextField
                    fullWidth
                    label="Action"
                    variant="outlined"
                    margin="normal"
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                />

                {/* Submit Button */}
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Enregistrer
                </Button>
            </form>
        </Box>
    );
};

export default DocumentsAuditPage;
