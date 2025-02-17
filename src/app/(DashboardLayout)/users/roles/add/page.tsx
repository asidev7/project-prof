'use client';

import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Paper, MenuItem, Select, FormControl, InputLabel, OutlinedInput, Chip } from '@mui/material';

interface Role {
  id: number;
  name: string;
}

interface Permission {
  id: number;
  name: string;
}

const AddRole = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [parentRole, setParentRole] = useState('');
  const [permissions, setPermissions] = useState<number[]>([]);
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesRes = await fetch('https://www.backend.lnb-intranet.globalitnet.org/roles/list-roles/');
        const permissionsRes = await fetch('https://www.backend.lnb-intranet.globalitnet.org/roles/list-permissions/');
        
        if (!rolesRes.ok || !permissionsRes.ok) throw new Error('Erreur lors du chargement des données.');
        
        const rolesData = await rolesRes.json();
        const permissionsData = await permissionsRes.json();
        
        setAllRoles(rolesData.roles || []);
        setAllPermissions(permissionsData.permissions || []);
      } catch (err) {
        setError("Impossible de charger les rôles et permissions.");
      }
    };
    
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const roleData = { name, description, parent_role_id: parentRole || null, permissions };

    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/roles/create-role/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roleData),
      });

      if (!response.ok) throw new Error('Erreur lors de l\'ajout du rôle.');

      setMessage('Rôle ajouté avec succès!');
      setName('');
      setDescription('');
      setParentRole('');
      setPermissions([]);
    } catch (err) {
      setError('Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>Ajouter un Rôle</Typography>
        {message && <Typography color="success.main">{message}</Typography>}
        {error && <Typography color="error.main">{error}</Typography>}
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nom du rôle"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Rôle parent</InputLabel>
            <Select
              value={parentRole}
              onChange={(e) => setParentRole(e.target.value)}
            >
              <MenuItem value="">Aucun</MenuItem>
              {allRoles.map((role) => (
                <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Permissions</InputLabel>
            <Select
              multiple
              value={permissions}
              onChange={(e) => setPermissions(e.target.value as number[])}
              input={<OutlinedInput label="Permissions" />}
              renderValue={(selected) => (
                <div>
                  {selected.map((id) => {
                    const permission = allPermissions.find(p => p.id === id);
                    return permission ? <Chip key={id} label={permission.name} sx={{ margin: 0.5 }} /> : null;
                  })}
                </div>
              )}
            >
              {allPermissions.map((permission) => (
                <MenuItem key={permission.id} value={permission.id}>{permission.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ marginTop: 2 }} disabled={loading}>
            {loading ? 'En cours...' : 'Ajouter le rôle'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddRole;
