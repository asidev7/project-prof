'use client';

import React, { useState, useEffect } from 'react';
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
  TablePagination,
  IconButton,
  Modal,
  TextField,
  Grid
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import DocumentImport from '@/app/(DashboardLayout)/documents/import/page'; // Importer le formulaire DocumentImport

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false); // Etat pour ouvrir/fermer la modale

  const fetchDocuments = async () => {
    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/documents/list/');
      const data = await response.json();
      setDocuments(data.documents);
    } catch (error) {
      console.error('Erreur lors de la récupération des documents:', error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <PageContainer title="Documents Importés" description="Liste des documents importés">
      <DashboardCard title="Documents Importés">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Liste des documents</Typography>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Ajouter un document
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#A5D6A7' }}>
                <TableCell>ID</TableCell>
                <TableCell>Nom du document</TableCell>
                <TableCell>Type de fichier</TableCell>
                <TableCell>Uploadé par</TableCell>
                <TableCell>Date d'importation</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.length > 0 ? (
                documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.id}</TableCell>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>{doc.fileType}</TableCell>
                    <TableCell>{doc.uploadedBy}</TableCell>
                    <TableCell>{new Date(doc.uploadDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => console.log('Voir document', doc.id)}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => console.log('Supprimer document', doc.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">Aucun document disponible.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={documents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count}`}
        />
      </DashboardCard>

      {/* Modale pour ajouter un document */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="add-document-modal"
        aria-describedby="modal-to-upload-new-document"
      >
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%', // Augmenter la largeur à 60% de l'écran
            maxWidth: '800px', // Limiter à une largeur maximale
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" id="add-document-modal" gutterBottom>
            Ajouter un nouveau document
          </Typography>
          <DocumentImport />
          <Button 
            variant="outlined" 
            onClick={handleCloseModal} 
            sx={{ mt: 2, width: '100%' }}
          >
            Fermer
          </Button>
        </Box>
      </Modal>
    </PageContainer>
  );
};

export default DocumentList;
