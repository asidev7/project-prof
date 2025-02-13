'use client';
import React, { useState, useEffect } from 'react';
import { 
    TextField, Button, Container, Typography, Paper, 
    MenuItem, Select, FormControl, InputLabel, SelectChangeEvent 
} from '@mui/material';
import { createApplication } from "@/services/services";
import { loginUser,getUsersList } from "@/services/users"; 

// Définition du type des utilisateurs
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
        userId: '',
    });
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState('');

    // Récupérer la liste des utilisateurs
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersList = await getUsersList(); // Assurez-vous que cette fonction est bien importée
                setUsers(usersList);
            } catch (error) {
                console.error("Erreur lors du chargement des utilisateurs", error);
            }
        };

        fetchUsers();
    }, []);

    // Gestion des changements dans les champs texte
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setApplicationData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Gestion des changements pour le Select
    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setApplicationData((prevData) => ({
            ...prevData,
            userId: event.target.value,
        }));
    };

    // Connexion utilisateur
    const handleLogin = async () => {
        try {
            await loginUser({ username, password });
            console.log('Utilisateur connecté');
        } catch (err) {
            setError('Erreur lors de la connexion');
        }
    };

    // Soumission du formulaire d'application
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            alert("Veuillez entrer un nom d'utilisateur et un mot de passe.");
            return;
        }

        if (!applicationData.name || !applicationData.description || !applicationData.userId) {
            alert("Veuillez remplir tous les champs.");
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

                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Utilisateur</InputLabel>
                        <Select
                            name="userId"
                            value={applicationData.userId}
                            onChange={handleSelectChange} // Correction ici
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
