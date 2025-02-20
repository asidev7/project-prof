'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Container, Typography, Paper, Snackbar, Alert, MenuItem } from '@mui/material';
import { createWorkflow } from '@/services/workflows';

const AddWorkflowPage = () => {
  const router = useRouter();
  const [workflowData, setWorkflowData] = useState({
    title: '',
    description: '',
    status: 'draft',
    sensitive_data: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWorkflowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createWorkflow(workflowData);
      setAlertMessage('Workflow créé avec succès !');
      setAlertSeverity('success');
      setOpenSnackbar(true);
      setWorkflowData({ title: '', description: '', status: 'draft', sensitive_data: '' });
      setTimeout(() => router.push('/workflows'), 2000);
    } catch (error) {
      console.error('Erreur lors de la création du workflow :', error);
      setAlertMessage("Une erreur est survenue lors de la création du workflow.");
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
          Ajouter un workflow
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Titre du workflow"
            name="title"
            fullWidth
            margin="normal"
            value={workflowData.title}
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
            value={workflowData.description}
            onChange={handleChange}
          />
          <TextField
            select
            label="Statut"
            name="status"
            fullWidth
            margin="normal"
            value={workflowData.status}
            onChange={handleChange}
            required
          >
            <MenuItem value="draft">Brouillon</MenuItem>
            <MenuItem value="active">Actif</MenuItem>
            <MenuItem value="completed">Terminé</MenuItem>
          </TextField>
          <TextField
            label="Données sensibles"
            name="sensitive_data"
            fullWidth
            margin="normal"
            type="password"
            value={workflowData.sensitive_data}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ marginTop: 2 }}>
            Enregistrer
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

export default AddWorkflowPage;
