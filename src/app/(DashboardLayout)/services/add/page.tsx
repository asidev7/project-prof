'use client';
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { createService } from "@/services/services";

const ServicesAddPage = () => {
  const [serviceData, setServiceData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Préparation des données du service
      const servicePayload = {
        name: serviceData.name,
        description: serviceData.description,
        department_id: 1, // Exemple, à remplacer
        function_id: 2,   // Exemple, à remplacer
        chef_id: 3,       // Exemple, à remplacer
      };

      // Appel à l'API pour créer le service
      const response = await createService(servicePayload);
      console.log('Service créé avec succès:', response);
      alert('Service créé avec succès !');

      // Réinitialisation du formulaire
      setServiceData({ name: '', description: '' });
    } catch (error) {
      console.error("Erreur lors de la création du service :", error);
      alert("Une erreur est survenue lors de la création du service.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Ajouter un service
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nom du service"
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
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Ajouter le service
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ServicesAddPage;
