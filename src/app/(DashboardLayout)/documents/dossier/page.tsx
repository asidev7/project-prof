'use client';

import { useState } from 'react';
import { TextField, Button, Box, Modal, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';  // Icône de fichier
import DocumentImport from '../import/page';  // Importer le formulaire d'importation de document
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

const categories = ['Rapport', 'Facture', 'Contrat', 'Autre'];

const FolderAdd = () => {
  const [folderName, setFolderName] = useState('');
  const [folderDescription, setFolderDescription] = useState('');
  const [category, setCategory] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Nom du dossier:', folderName);
    console.log('Description du dossier:', folderDescription);
    console.log('Catégorie:', category);
    // Logique pour soumettre le dossier (ajouter dans la base de données, etc.)
  };

  return (
    <PageContainer title="Ajouter un Dossier" description="Ajoutez un nouveau dossier">
      <DashboardCard title="Créer un Dossier">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            maxWidth: 400,  // Réduire la largeur du formulaire
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,  // Réduire l'espace entre les champs
            padding: 3,
          }}
        >
          <TextField
            label="Nom du Dossier"
            variant="outlined"
            fullWidth
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={folderDescription}
            onChange={(e) => setFolderDescription(e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel>Catégorie</InputLabel>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Bouton avec icône pour ajouter un document */}
          <Button
            variant="outlined"
            color="primary"
            onClick={handleOpenModal}
            sx={{
              marginTop: 2,
              padding: '8px 16px',  // Réduire l'espace autour de l'icône
              minWidth: 'unset',  // Enlever la largeur minimale
              alignSelf: 'center',
            }}
            startIcon={<AttachFileIcon />}  // Icône de fichier
          >
            Ajouter un Document
          </Button>

          <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: 'center', width: '50%', marginTop: 2 }}>
            Créer le Dossier
          </Button>
        </Box>
      </DashboardCard>

      {/* Modal pour ajouter un document */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="Ajouter un Document"
        aria-describedby="Formulaire pour ajouter un document à ce dossier"
      >
        <Box
          sx={{
            width: 600,
            maxWidth: '90%',
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Ajouter un Document
          </Typography>
          <DocumentImport />
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCloseModal}
            sx={{ marginTop: 2, width: '100%' }}
          >
            Fermer
          </Button>
        </Box>
      </Modal>
    </PageContainer>
  );
};

export default FolderAdd;
