'use client';

import { useState } from 'react';
import { TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { uploadMedia } from "@/services/document";

const mediaTypes = ['Image', 'Vidéo', 'Audio'];
const contentTypes = ['Texte', 'Image', 'Vidéo', 'Audio'];
const objectIds = ['Object ID 1', 'Object ID 2', 'Object ID 3'];
const permissions = ['Lecture', 'Écriture', 'Admin'];

const MediaPageForm = () => {
  const [media, setMedia] = useState('');
  const [content, setContent] = useState('');
  const [objectId, setObjectId] = useState('');
  const [permission, setPermission] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      console.error('Aucun fichier sélectionné');
      return;
    }

    try {
      const response = await uploadMedia(file);
      console.log('Média ajouté avec succès:', response);
    } catch (error) {
      console.error('Erreur lors de upload du média:', error);
    }
  };

  return (
    <PageContainer title="Ajouter une page Media" description="Ajoutez une nouvelle page media">
      <DashboardCard title="Ajouter une page Media">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            maxWidth: 500,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            padding: 4,
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Media</InputLabel>
            <Select value={media} onChange={(e) => setMedia(e.target.value)} required>
              {mediaTypes.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Contenu</InputLabel>
            <Select value={content} onChange={(e) => setContent(e.target.value)} required>
              {contentTypes.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Object ID</InputLabel>
            <Select value={objectId} onChange={(e) => setObjectId(e.target.value)} required>
              {objectIds.map((id) => <MenuItem key={id} value={id}>{id}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Permission</InputLabel>
            <Select value={permission} onChange={(e) => setPermission(e.target.value)} required>
              {permissions.map((perm) => <MenuItem key={perm} value={perm}>{perm}</MenuItem>)}
            </Select>
          </FormControl>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            required
          />

          <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: 'center', width: '50%', marginTop: 3 }}>
            Ajouter
          </Button>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default MediaPageForm;
