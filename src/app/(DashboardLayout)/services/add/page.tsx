'use client';
<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
=======

import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Snackbar, Alert } from '@mui/material';
import { createService } from "@/services/services";
>>>>>>> 954113426cfe983e47c386af26ce9f16b01e8363

const ServicesAddPage = () => {
  const [serviceData, setServiceData] = useState({
    name: '',
    description: '',
    department_id: '',
    function_id: '',
  });

<<<<<<< HEAD
  const [departments, setDepartments] = useState<{ id: number; name: string }[]>([]);
  const [functions, setFunctions] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://www.backend.lnb-intranet.globalitnet.org';

  // Fonction pour récupérer les départements et fonctions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [departmentResponse, functionResponse] = await Promise.all([
          fetch(`${API_URL}/services/departments/`),
          fetch(`${API_URL}/services/functions/`)
        ]);

        if (!departmentResponse.ok || !functionResponse.ok) {
          throw new Error('Erreur lors du chargement des données.');
        }

        const departmentData = await departmentResponse.json();
        const functionData = await functionResponse.json();

        setDepartments(departmentData);
        setFunctions(functionData);
      } catch (error) {
        console.error('Erreur lors du fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Gestion des changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<{ target: { name?: string; value: unknown } }>) => {
    const { name, value } = e.target as { name: string; value: string };
=======
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
>>>>>>> 954113426cfe983e47c386af26ce9f16b01e8363
    setServiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const response = await fetch(`${API_URL}/services/create-service/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Erreur lors de la création du service.');

      alert('Service créé avec succès !');
      setServiceData({ name: '', description: '', department_id: '', function_id: '' });
    } catch (error) {
      console.error('Erreur lors de la création du service:', error);
      alert('Une erreur est survenue lors de la création du service.');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6">Chargement des données...</Typography>
      </Container>
    );
  }
=======
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
>>>>>>> 954113426cfe983e47c386af26ce9f16b01e8363

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
          <FormControl fullWidth margin="normal">
            <InputLabel id="department-select-label">Département</InputLabel>
            <Select
              labelId="department-select-label"
              name="department_id"
              value={serviceData.department_id}
              onChange={handleChange}
              required
            >
              {departments.map((department) => (
                <MenuItem key={department.id} value={department.id}>
                  {department.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="function-select-label">Fonction</InputLabel>
            <Select
              labelId="function-select-label"
              name="function_id"
              value={serviceData.function_id}
              onChange={handleChange}
              required
            >
              {functions.map((func) => (
                <MenuItem key={func.id} value={func.id}>
                  {func.name}
                </MenuItem>
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
