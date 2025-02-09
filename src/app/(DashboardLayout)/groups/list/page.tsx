'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  TablePagination,
  Snackbar,
  Grid,
  Alert,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const API_URL = 'https://www.backend.lnb-intranet.globalitnet.org';

interface Group {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string | null;
  bio: string;
  status: string;
  adresse: string;
  created_at: string;
  updated_at: string;
  department: string;
  function: string;
  project: string;
  photo: string | null;
  linked_groups: any[]; // Assurez-vous que c'est un tableau vide si non utilisé
  members: any[]; // Même chose ici
}

const GroupsTable = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Group>>({});
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/utilisateurs_groupes/list-groups/`);
      const data = await response.json();
      setGroups(data.groups || []);
    } catch (error) {
      setError('Erreur de chargement des groupes.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async () => {
    // Validation des champs requis
    if (!formData.name || !formData.email || !formData.phone || !formData.status || !formData.department || !formData.function || !formData.project) {
      setError('Tous les champs requis doivent être remplis.');
      return;
    }

    try {
      console.log('Form data avant envoi:', formData);  // Affiche les données envoyées
      const response = await fetch(`${API_URL}/utilisateurs_groupes/create-group/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          linked_groups: [], // Définir un tableau vide pour linked_groups
          members: [], // Définir un tableau vide pour members
          photo: formData.photo || null, // S'assurer que photo peut être null
        }),
      });

      const data = await response.json();
      console.log('Réponse API:', data);  // Affiche la réponse de l'API

      if (data.success) {
        setSuccessMessage('Groupe ajouté avec succès');
        fetchGroups();
        setCreateOpen(false);
        setFormData({}); // Réinitialiser le formulaire après soumission
      } else {
        setError(data.error || 'Erreur lors de la création du groupe');  // Utiliser l'erreur retournée par l'API
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);  // Affiche les erreurs de la requête
      setError('Erreur lors de la création du groupe');
    }
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField 
          label="Filtrer par nom"
          variant="outlined"
          size="small"
          onChange={(e) => setFilter(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={() => setCreateOpen(true)}>
          Ajouter un groupe
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2', color: 'white' }}>
            <TableRow>
              {[ 'Nom', 'Email', 'Téléphone', 'Statut', 'Rôle', 'Adresse', 'Département', 'Fonction', 'Projet', 'Description', 'Créé le', 'Mis à jour le', 'Actions'].map((col) => (
                <TableCell key={col} sx={{ color: 'white' }}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.filter(group => group.name.toLowerCase().includes(filter.toLowerCase()))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.email}</TableCell>
                <TableCell>{group.phone}</TableCell>
                <TableCell>{group.status}</TableCell>
                <TableCell>{group.role || 'Non défini'}</TableCell>
                <TableCell>{group.adresse}</TableCell>
                <TableCell>{group.department}</TableCell>
                <TableCell>{group.function}</TableCell>
                <TableCell>{group.project}</TableCell>
                <TableCell>{group.bio}</TableCell>
                <TableCell>{new Date(group.created_at).toLocaleString()}</TableCell>
                <TableCell>{new Date(group.updated_at).toLocaleString()}</TableCell>
                <TableCell>
                  <Button><Edit /></Button>
                  <Button><Delete color="error" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        component="div"
        count={groups.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
      />

      <Modal open={createOpen} onClose={() => setCreateOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" mb={2}>Ajouter un groupe</Typography>
          <Grid container spacing={2}>
            {['name', 'email', 'phone', 'role', 'status', 'adresse', 'department', 'function', 'project'].map(field => (
              <Grid item xs={6} key={field}>
                <TextField 
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  fullWidth 
                  margin="dense" 
                  value={formData[field] || ''} // Utiliser la valeur actuelle du champ
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
                value={formData.bio || ''} // Utiliser la valeur actuelle de la bio
                onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))} 
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" onClick={handleCreateGroup} sx={{ mt: 2 }}>Enregistrer</Button>
        </Box>
      </Modal>

      {error && <Snackbar open={true} autoHideDuration={6000} onClose={() => setError(null)}><Alert severity="error">{error}</Alert></Snackbar>}
      {successMessage && <Snackbar open={true} autoHideDuration={6000} onClose={() => setSuccessMessage(null)}><Alert severity="success">{successMessage}</Alert></Snackbar>}
    </div>
  );
};

export default GroupsTable;
