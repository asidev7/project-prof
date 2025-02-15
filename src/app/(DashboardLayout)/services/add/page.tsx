'use client';

import React, { useState } from 'react';
<<<<<<< HEAD
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { createService } from "@/services/services";
=======
import { TextField, Button, Container, Typography, Paper, Snackbar, Alert } from '@mui/material';
import { createService } from "@/services/services"; // Import de la fonction pour créer un service
>>>>>>> 146a0c7 (Résolution des conflits)

const ServicesAddPage = () => {
  const [serviceData, setServiceData] = useState({
    name: '',
    description: '',
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [openSnackbar, setOpenSnackbar] = useState(false); // Pour contrôler l'affichage de l'alerte
  const [alertMessage, setAlertMessage] = useState(''); // Le message à afficher dans l'alerte
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success'); // Pour définir la couleur de l'alerte

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
<<<<<<< HEAD
      // Préparation des données du service
      const servicePayload = {
        name: serviceData.name,
        description: serviceData.description,
      };

      // Appel à l'API pour créer le service
      await createService(servicePayload);
      
      // Affichage du message de succès
      setSuccessMessage("Service créé avec succès !");
      
      // Réinitialisation du formulaire
      setServiceData({ name: '', description: '' });

      // Masquer le message après 3 secondes
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la création du service :", error);
      alert("Une erreur est survenue lors de la création du service.");
=======
      const response = await createService(serviceData);
      console.log('Service created successfully:', response);
      
      // Affichage de l'alerte de succès
      setAlertMessage('Service created successfully!');
      setAlertSeverity('success');
      setOpenSnackbar(true);

      setServiceData({ name: '', description: '' }); // Réinitialisation du formulaire
    } catch (error) {
      console.error('Error occurred while creating the service:', error);

      // Affichage de l'alerte d'erreur
      setAlertMessage('An error occurred while creating the service.');
      setAlertSeverity('error');
      setOpenSnackbar(true);
>>>>>>> 146a0c7 (Résolution des conflits)
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Ferme le Snackbar
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        {successMessage && (
          <Typography sx={{ color: 'green', textAlign: 'center', marginBottom: 2 }}>
            {successMessage}
          </Typography>
        )}
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

      {/* Snackbar pour afficher les alertes */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ServicesAddPage;
