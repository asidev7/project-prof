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
  IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { getDocumentsList } from "@/services/document";

const DocumentList = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = async () => {
    try {
      const data = await getDocumentsList();
      setDocuments(data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des documents:', error);
      setError("Erreur lors de la récupération des documents.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  if (loading) return <Typography>Chargement en cours...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <PageContainer title="Documents Importés" description="Liste des documents importés">
      <DashboardCard title="Documents Importés">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Liste des documents</Typography>
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
    </PageContainer>
  );
};

export default DocumentList;
