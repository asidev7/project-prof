'use client';

import React, { useState } from 'react';
import { TextField, Button, MenuItem, InputLabel, Select, FormControl, Box } from '@mui/material';

const DocumentsVersionsPage = () => {
    const [document, setDocument] = useState('');
    const [file, setFile] = useState(null);
    const [versionNumber, setVersionNumber] = useState('');
    const [uploadedBy, setUploadedBy] = useState('');

    // Liste des documents disponibles (remplace par Firebase plus tard)
    const documentsList = ["Document A", "Document B", "Document C"];

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Logique pour envoyer les données à Firebase
        console.log({ document, file, versionNumber, uploadedBy });
    };

    return (
        <Box sx={{ maxWidth: 500, margin: 'auto', padding: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
            <h1>Ajouter une version de Document</h1>
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
                {/* Version Number */}
                <TextField
                    fullWidth
                    label="Version Number"
                    variant="outlined"
                    margin="normal"
                    value={versionNumber}
                    onChange={(e) => setVersionNumber(e.target.value)}
                />

                {/* Uploaded By */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Uploaded By</InputLabel>
                    <Select
                        value={uploadedBy}
                        onChange={(e) => setUploadedBy(e.target.value)}
                    >
                        <MenuItem value="User 1">User 1</MenuItem>
                        <MenuItem value="User 2">User 2</MenuItem>
                    </Select>
                </FormControl>

                {/* Submit Button */}
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Enregistrer
                </Button>
            </form>
        </Box>
    );
};

export default DocumentsVersionsPage;
