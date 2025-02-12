'use client';

<<<<<<< HEAD
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
=======
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Paper, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
>>>>>>> 74e50adf87ca2e0e168bf9405ddfee7f008f3442
import { createApplication } from "@/services/services";
import { loginUser, logoutUser } from "@/services/users"; // Importation des fonctions d'authentification

// Définir le type des utilisateurs
interface User {
  id: string;
  name: string;
}

const ApplicationsAddPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [applicationData, setApplicationData] = useState({
        name: '',
        description: '',
    });
    const [error, setError] = useState('');

<<<<<<< HEAD
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
=======
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
>>>>>>> 74e50adf87ca2e0e168bf9405ddfee7f008f3442
        const { name, value } = e.target;
        setApplicationData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

<<<<<<< HEAD
    const handleLogin = async () => {
        try {
            const credentials = { username, password };
            await loginUser(credentials);  // Appel de la fonction de connexion
            console.log('Utilisateur connecté');
        } catch (err) {
            setError('Erreur lors de la connexion');
        }
=======
    // Correction du type de l'événement pour Select
    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { value } = event.target;
        setApplicationData((prevData) => ({
            ...prevData,
            userId: value,
        }));
>>>>>>> 74e50adf87ca2e0e168bf9405ddfee7f008f3442
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            alert("Veuillez entrer un nom d'utilisateur et un mot de passe.");
            return;
        }

        try {
            const response = await createApplication(username, {
                name: applicationData.name,
                description: applicationData.description,
            });

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

                {/* Formulaire de connexion */}
                <TextField
                    label="Nom d'utilisateur"
                    name="username"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="Mot de passe"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <Typography color="error">{error}</Typography>}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    Se connecter
                </Button>

                {/* Formulaire d'ajout d'application */}
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

<<<<<<< HEAD
=======
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

>>>>>>> 74e50adf87ca2e0e168bf9405ddfee7f008f3442
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
