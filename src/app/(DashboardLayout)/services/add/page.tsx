'use client';

import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { createService } from "@/services/services"; 

const ServicesAddPage = () => {
    const [serviceData, setServiceData] = useState({
        name: '',
        description: '', // Champ description
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setServiceData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const getCsrfToken = (): string => {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];
        return cookieValue || ''; // Retourne une valeur par défaut vide si non trouvé
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const csrfToken = getCsrfToken(); // Récupère le CSRF token

        try {
            const response = await createService(serviceData, csrfToken); // Passe le CSRF token dans la requête
            console.log('Service créé avec succès:', response);
            alert('Service créé avec succès !');
            setServiceData({ name: '', description: '' }); // Réinitialise le formulaire
        } catch (error) {
            console.error('Erreur lors de la création du service:', error);
            alert('Une erreur est survenue lors de la création du service.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Ajouter un Service
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nom du Service"
                        name="name"
                        fullWidth
                        margin="normal"
                        value={serviceData.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Description"
                        name="description"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        value={serviceData.description}
                        onChange={handleChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        Ajouter
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default ServicesAddPage;
