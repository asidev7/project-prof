'use client';

import { useState } from 'react';
import { Box, Grid, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const API_URL = 'https://www.backend.lnb-intranet.globalitnet.org';

const AddGroup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    status: '',
    adresse: '',
    department: '',
    function: '',
    project: '',
    bio: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCreateGroup = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.status || !formData.department || !formData.function || !formData.project) {
      setError('Tous les champs requis doivent être remplis.');
      return;
    }

    try {
      console.log('Form data avant envoi:', formData);

      const response = await fetch(`${API_URL}/utilisateurs_groupes/create-group/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          linked_groups: [], 
          members: [], 
          photo: null, 
        }),
      });

      const data = await response.json();
      console.log('Réponse API:', data);

      if (data.success) {
        setSuccessMessage('Groupe ajouté avec succès');
        setFormData({ name: '', email: '', phone: '', role: '', status: '', adresse: '', department: '', function: '', project: '', bio: '' });
      } else {
        setError(data.error || 'Erreur lors de la création du groupe');
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      setError('Erreur lors de la création du groupe');
    }
  };

  return (
    <PageContainer title="Ajouter un groupe" description="Formulaire d'ajout de groupe">
      <DashboardCard title="Ajouter un groupe">
        <Box component="form">
          <Grid container spacing={2}>
            {['name', 'email', 'phone', 'role', 'status', 'adresse', 'department', 'function', 'project'].map(field => (
              <Grid item xs={6} key={field}>
                <TextField 
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  fullWidth 
                  margin="dense" 
                  value={formData[field] || ''} 
                  onChange={(e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }))} 
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <TextField 
                label="Description"
                fullWidth 
                multiline
                rows={4}
                margin="dense" 
                value={formData.bio || ''} 
                onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))} 
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" onClick={handleCreateGroup} sx={{ mt: 2 }}>
            Enregistrer
          </Button>
        </Box>

        {error && <Snackbar open autoHideDuration={6000} onClose={() => setError(null)}><Alert severity="error">{error}</Alert></Snackbar>}
        {successMessage && <Snackbar open autoHideDuration={6000} onClose={() => setSuccessMessage(null)}><Alert severity="success">{successMessage}</Alert></Snackbar>}
      </DashboardCard>
    </PageContainer>
  );
};

export default AddGroup;
