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
  TextField,
  IconButton,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const categories = ['Rapport', 'Facture', 'Contrat', 'Autre']; // Définir les catégories ici
const initialState = {
  title: '',
  description: '',
  fileType: 'PDF',
  file: null,
  uploadedBy: '',
  category: '',
  tags: [],
  newTag: ''
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'ADD_TAG':
      return { ...state, tags: [...state.tags, action.tag], newTag: '' };
    case 'REMOVE_TAG':
      return { ...state, tags: state.tags.filter(tag => tag !== action.tag) };
    default:
      return state;
  }
};

const DocumentsArchived = () => {
  const [documents, setDocuments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useReducer(formReducer, initialState);

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
    dispatch({ type: 'SET_FIELD', field: 'tags', value: [] }); // Reset tags when opening the form
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      dispatch({ type: 'SET_FIELD', field: 'file', value: event.target.files[0] });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', state.title);
      formData.append('description', state.description);
      formData.append('fileType', state.fileType);
      formData.append('file', state.file);
      formData.append('uploadedBy', state.uploadedBy);
      formData.append('category', state.category);
      formData.append('tags', state.tags.join(','));

      await fetch('https://www.backend.lnb-intranet.globalitnet.org/documents/create/', {
        method: 'POST',
        body: formData,
      });
      fetchDocuments();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la création du document:', error);
    }
  };

  const handleTagAdd = () => {
    if (state.newTag.trim() && !state.tags.includes(state.newTag)) {
      dispatch({ type: 'ADD_TAG', tag: state.newTag });
    }
  };

  return (
    <PageContainer title="Documents Archivés" description="Liste des documents archivés">
      <DashboardCard title="Documents Archivés">
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
                <TableCell>Tags</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.length > 0 ? (
                documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((document) => (
                  <TableRow key={document.id}>
                    <TableCell>{document.id}</TableCell>
                    <TableCell>{document.title}</TableCell>
                    <TableCell>{document.description}</TableCell>
                    <TableCell>{document.fileType}</TableCell>
                    <TableCell>{document.uploadedBy}</TableCell>
                    <TableCell>{document.category}</TableCell>
                    <TableCell>{document.tags.join(', ')}</TableCell>
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
                  <TableCell colSpan={8} align="center">Aucun document disponible.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ajouter un document</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Titre"
              value={state.title}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'title', value: e.target.value })}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              value={state.description}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'description', value: e.target.value })}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Ajouté par"
              value={state.uploadedBy}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'uploadedBy', value: e.target.value })}
              required
              margin="normal"
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Catégorie</InputLabel>
              <Select
                value={state.category}
                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'category', value: e.target.value })}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Tag"
              value={state.newTag}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'newTag', value: e.target.value })}
              margin="normal"
            />
            <Button variant="outlined" onClick={handleTagAdd}>
              Ajouter Tag
            </Button>

            <Box mt={2}>
              <Typography variant="h6">Tags:</Typography>
              {state.tags.map((tag, index) => (
                <Chip key={index} label={tag} onDelete={() => dispatch({ type: 'REMOVE_TAG', tag })} />
              ))}
            </Box>

            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
              Soumettre
            </Button>
          </form>
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
