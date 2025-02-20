'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, MenuItem, Select, IconButton, Snackbar, Alert } from '@mui/material';
import { getWorkflowsList, deleteWorkflow, getWorkflowByStatus, searchWorkflows } from '@/services/workflows';
import { Edit, Delete } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const WorkflowList = () => {
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const router = useRouter();

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      const data = await getWorkflowsList();
      setWorkflows(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des workflows :', error);
    }
  };

  const handleSearch = async () => {
    try {
      const data = await searchWorkflows({ query: searchQuery });
      setWorkflows(data);
    } catch (error) {
      console.error('Erreur lors de la recherche de workflows :', error);
    }
  };

  const handleFilterChange = async (event) => {
    const status = event.target.value;
    setStatusFilter(status);
    try {
      const data = await getWorkflowByStatus(status);
      setWorkflows(data);
    } catch (error) {
      console.error('Erreur lors du filtrage des workflows :', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWorkflow(id);
      setAlertMessage('Workflow supprimé avec succès !');
      setAlertSeverity('success');
      setOpenSnackbar(true);
      fetchWorkflows();
    } catch (error) {
      setAlertMessage('Erreur lors de la suppression.');
      setAlertSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = workflows.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Liste des Workflows</Typography>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <TextField label="Rechercher" variant="outlined" fullWidth value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <Button variant="contained" onClick={handleSearch}>Rechercher</Button>
      </div>
      
      <Select value={statusFilter} onChange={handleFilterChange} displayEmpty fullWidth>
        <MenuItem value="">Tous les statuts</MenuItem>
        <MenuItem value="draft">Brouillon</MenuItem>
        <MenuItem value="active">Actif</MenuItem>
        <MenuItem value="completed">Terminé</MenuItem>
      </Select>
      
      <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={() => router.push('/workflows/add')}>Créer un Workflow</Button>
      
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titre</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((workflow) => (
              <TableRow key={workflow.id}>
                <TableCell>{workflow.title}</TableCell>
                <TableCell>{workflow.description}</TableCell>
                <TableCell>{workflow.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => router.push(`/workflows/${workflow.id}`)} color="primary"><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(workflow.id)} color="error"><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Précédent</Button>
        <span>Page {currentPage} sur {Math.ceil(workflows.length / itemsPerPage)}</span>
        <Button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage >= Math.ceil(workflows.length / itemsPerPage)}>Suivant</Button>
      </div>
      
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity}>{alertMessage}</Alert>
      </Snackbar>
    </Container>
  );
};

export default WorkflowList;
