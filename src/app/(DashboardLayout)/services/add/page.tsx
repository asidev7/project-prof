'use client';

import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Snackbar, Alert } from '@mui/material';
import { createService } from "@/services/services";

const ServicesAddPage = () => {
  const [serviceData, setServiceData] = useState({
    name: '',
    description: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

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
      await createService(serviceData);
      setAlertMessage('Service créé avec succès !');
      setAlertSeverity('success');
      setOpenSnackbar(true);
      setServiceData({ name: '', description: '' });
    } catch (error) {
      console.error("Erreur lors de la création du service :", error);
      setAlertMessage("Une erreur est survenue lors de la création du service.");
      setAlertSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ServicesAddPage;
