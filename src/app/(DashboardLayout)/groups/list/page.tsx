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
}

const GroupsTable = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
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

  const handleEditOpen = (group: Group) => {
    setEditOpen(true);
    setFormData(group);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce groupe ?')) {
      try {
        await fetch(`${API_URL}/utilisateurs_groupes/delete-group/${id}`, { method: 'DELETE' });
        setSuccessMessage('Groupe supprimé avec succès');
        fetchGroups();
      } catch (error) {
        setError('Erreur lors de la suppression du groupe');
      }
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
              <TableCell sx={{ color: 'white' }}>Nom</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Téléphone</TableCell>
              <TableCell sx={{ color: 'white' }}>Statut</TableCell>
              <TableCell sx={{ color: 'white' }}>Rôle</TableCell>
              <TableCell sx={{ color: 'white' }}>Description</TableCell>
              <TableCell sx={{ color: 'white' }}>Adresse</TableCell>
              <TableCell sx={{ color: 'white' }}>Créé le</TableCell>
              <TableCell sx={{ color: 'white' }}>Mis à jour le</TableCell>
              <TableCell sx={{ color: 'white' }}>Département</TableCell>
              <TableCell sx={{ color: 'white' }}>Fonction</TableCell>
              <TableCell sx={{ color: 'white' }}>Projet</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
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
                <TableCell>{group.bio}</TableCell>
                <TableCell>{group.adresse}</TableCell>
                <TableCell>{new Date(group.created_at).toLocaleString()}</TableCell>
                <TableCell>{new Date(group.updated_at).toLocaleString()}</TableCell>
                <TableCell>{group.department}</TableCell>
                <TableCell>{group.function}</TableCell>
                <TableCell>{group.project}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditOpen(group)}><Edit /></Button>
                  <Button onClick={() => handleDelete(group.id)}><Delete color="error" /></Button>
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

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage(null)}>
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>
    </div>
  );
};

export default GroupsTable;
