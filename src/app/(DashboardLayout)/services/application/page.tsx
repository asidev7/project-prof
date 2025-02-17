'use client';
import React, { useState } from 'react';
import { 
    TextField, Button, Container, Typography, Paper
} from '@mui/material';
import { createApplication } from "@/services/services";

const ApplicationsAddPage = () => {
    const [applicationData, setApplicationData] = useState({
        name: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setApplicationData((prevData) => ({
            ...prevData,
            [name as string]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!applicationData.name || !applicationData.description) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        try {
            const response = await createApplication(applicationData);
            console.log('Application créée avec succès:', response);
            alert('Application créée avec succès !');
            setApplicationData({ name: '', description: '' });
        } catch (error) {
            console.error("Erreur lors de la création de l'application:", error);
            alert("Une erreur est survenue lors de la création de l'application.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Ajouter une Application
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nom de l'Application"
                        name="name"
                        fullWidth
                        margin="normal"
                        value={applicationData.name}
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
                        value={applicationData.description}
                        onChange={handleChange}
                        required
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

export default ApplicationsAddPage;
