'use client';

import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';

const API_BASE_URL = 'https://www.backend.lnb-intranet.globalitnet.org'; // URL de base de l'API

const ServicesAddPage = () => {
    const [serviceData, setServiceData] = useState({
        name: '',
        description: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setServiceData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const response = await fetch(`${API_BASE_URL}/services/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(serviceData),
            });

            const data = await response.json();

            if (response.ok && data?.success) {
                setMessage('Service ajouté avec succès!');
                setServiceData({ name: '', description: '' });
            } else {
               setError(data?.message || `Erreur lors de l'ajout du service`);
            }
        } catch (err) {
            setError('Erreur lors de la communication avec le serveur');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Ajouter un Service
                </Typography>
                {error && <Typography color="error" gutterBottom>{error}</Typography>}
                {message && <Typography color="primary" gutterBottom>{message}</Typography>}
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
                        disabled={loading}
                    >
                        {loading ? 'En cours...' : 'Ajouter'}
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default ServicesAddPage;
