'use client';
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  username: string;
  role: string;
  telephone: string;
  adresse: {
    city: string;
    country: string;
  };
  date_naissance: string;
  lieu_naissance: string;
  password: string;
}

interface Role {
  id: number;
  name: string;
}

const UserAddUser = () => {
  const initialFormData: FormData = {
    nom: '',
    prenom: '',
    email: '',
    username: '',
    role: '',
    telephone: '',
    adresse: { city: '', country: '' },
    date_naissance: '',
    lieu_naissance: '',
    password: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/roles/list-roles/', {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          credentials: 'include',
        });

        if (!response.ok) throw new Error(`Erreur ${response.status}`);
        const data = await response.json();
        setRoles(data.roles || []);
      } catch (err) {
        setError('Erreur lors de la récupération des rôles.');
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('adresse.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        adresse: { ...prev.adresse, [field]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setValidationErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const formatDate = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${year}-${day.padStart(2, '0')}-${month.padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const formattedData = {
      ...formData,
      date_naissance: formatDate(formData.date_naissance),
    };

    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/utilisateurs/inscription/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur ${response.status}`);
      }

      setMessage('Utilisateur ajouté avec succès!');
      setFormData(initialFormData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'ajout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
          <Typography variant="h5" gutterBottom>
            Ajouter un Utilisateur
          </Typography>

          {message && <Typography variant="body2" color="success.main">{message}</Typography>}
          {error && <Typography variant="body2" color="error.main">{error}</Typography>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Nom"
              name="nom"
              fullWidth
              margin="normal"
              value={formData.nom}
              onChange={handleChange}
              required
            />
            <TextField
              label="Prénom"
              name="prenom"
              fullWidth
              margin="normal"
              value={formData.prenom}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Nom d'utilisateur"
              name="username"
              fullWidth
              margin="normal"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-select-label">Rôle</InputLabel>
              <Select
                labelId="role-select-label"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <MenuItem value="">Sélectionner un rôle</MenuItem>
                {roles.map(role => (
                  <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Téléphone"
              name="telephone"
              fullWidth
              margin="normal"
              value={formData.telephone}
              onChange={handleChange}
            />
            <TextField
              label="Ville"
              name="adresse.city"
              fullWidth
              margin="normal"
              value={formData.adresse.city}
              onChange={handleChange}
              required
            />
            <TextField
              label="Pays"
              name="adresse.country"
              fullWidth
              margin="normal"
              value={formData.adresse.country}
              onChange={handleChange}
              required
            />
            <TextField
              label="Date de naissance"
              name="date_naissance"
              fullWidth
              margin="normal"
              type="date"
              value={formData.date_naissance}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Lieu de naissance"
              name="lieu_naissance"
              fullWidth
              margin="normal"
              value={formData.lieu_naissance}
              onChange={handleChange}
              required
            />
            <TextField
              label="Mot de passe"
              name="password"
              fullWidth
              margin="normal"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ marginTop: 2 }}
              disabled={loading}
            >
              {loading ? 'En cours...' : 'Ajouter l\'utilisateur'}
            </Button>
          </form>
        </Paper>
      </Container>
    </PageContainer>
  );
};

export default UserAddUser;
