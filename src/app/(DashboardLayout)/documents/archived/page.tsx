'use client';

import React, { useState, useEffect, useReducer } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import DocumentImport from '@/app/(DashboardLayout)/documents/import/page'; // Importer le formulaire DocumentImport

const DocumentsArchived = () => {
  const [documents, setDocuments] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/documents/archived/');
      const data = await response.json();
      setDocuments(data.documents);
    } catch (error) {
      console.error('Erreur lors de la récupération des documents:', error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleOpenAdd = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <PageContainer title="Documents Archivés" description="Liste des documents archivés">
      <DashboardCard>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Liste des documents archivés</Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenAdd}>
            Ajouter un document
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#A5D6A7' }}>
                <TableCell>ID</TableCell>
                <TableCell>Titre</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Type de fichier</TableCell>
                <TableCell>Ajouté par</TableCell>
                <TableCell>Catégorie</TableCell>
                <TableCell>Actions</TableCell> {/* Suppression de la colonne Tags */}
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.length > 0 ? (
                documents.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell>{document.id}</TableCell>
                    <TableCell>{document.title}</TableCell>
                    <TableCell>{document.description}</TableCell>
                    <TableCell>{document.fileType}</TableCell>
                    <TableCell>{document.uploadedBy}</TableCell>
                    <TableCell>{document.category}</TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">Aucun document disponible.</TableCell> {/* Ajuster la largeur de la colonne */}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>

      {/* Modal pour ajouter un document */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ajouter un document</DialogTitle>
        <DialogContent sx={{ width: '600px' }}> {/* Augmenter la largeur du formulaire */}
          {/* Affichage du formulaire DocumentImport ici */}
          <DocumentImport />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default DocumentsArchived;
