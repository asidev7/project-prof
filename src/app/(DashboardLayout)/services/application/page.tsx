'use client';

import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Paper, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { createApplication } from "@/services/services";
import { getUsersList } from "@/services/users"; // Correction de l'import

// Définir le type des utilisateurs
interface User {
  id: string;
  name: string;
}

const ApplicationsAddPage = () => {
    const [applicationData, setApplicationData] = useState({
        name: '',
        description: '',
        userId: '',
    });

    // Définir l'état 'users' comme un tableau d'objets de type User
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersList = await getUsersList(); // Utilisation de la bonne fonction
                setUsers(usersList); // Mise à jour de l'état avec la liste des utilisateurs
            } catch (error) {
                console.error("Erreur lors du chargement des utilisateurs", error);
            }
        };

        fetchUsers();
    }, []);

    const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setApplicationData((prevData) => ({
            ...prevData,
            [name as string]: value,
        }));
    };

    // Correction du type de l'événement pour Select
    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { value } = event.target;
        setApplicationData((prevData) => ({
            ...prevData,
            userId: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!applicationData.userId) {
            alert("Veuillez sélectionner un utilisateur !");
            return;
        }

        try {
            const response = await createApplication(applicationData.userId, {
                name: applicationData.name,
                description: applicationData.description,
            });
            console.log('Application créée avec succès:', response);
            alert('Application créée avec succès !');
            setApplicationData({ name: '', description: '', userId: '' });
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
                    />

                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Utilisateur</InputLabel>
                        <Select
                            name="userId"
                            value={applicationData.userId}
                            onChange={handleSelectChange} // Utilisation de handleSelectChange
                        >
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

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
