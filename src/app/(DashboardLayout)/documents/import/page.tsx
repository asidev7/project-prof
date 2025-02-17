'use client';

import { useState } from 'react';
import { TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { createDocument } from '@/services/document';

const fileTypes = ['PDF', 'WORD', 'EXCEL', 'POWERPOINT', 'TEXT', 'JPG', 'PNG', 'MP4 video', 'MP3 Audio'];

const DocumentImport = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileType, setFileType] = useState('PDF');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      setError('Veuillez sélectionner un fichier.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await createDocument(title, description, fileType, file);
      setSuccess('Document ajouté avec succès !');
      console.log('✅ Réponse de l\'API:', response);

      // Réinitialisation des champs
      setTitle('');
      setDescription('');
      setFileType('PDF');
      setFile(null);
    } catch (error: any) {
      setError('Une erreur est survenue lors de l\'ajout du document.');
      console.error('❌ Erreur API:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Importer un Document" description="Ajoutez un nouveau document">
      <DashboardCard title="Importer un Document">
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
          <TextField label="Titre" variant="outlined" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} required />
          <TextField label="Description" variant="outlined" fullWidth multiline rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />

          <FormControl fullWidth>
            <InputLabel>Type de fichier</InputLabel>
            <Select value={fileType} onChange={(e) => setFileType(e.target.value)}>
              {fileTypes.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
            </Select>
          </FormControl>

          {/* Champ pour télécharger le fichier */}
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Télécharger un document
            <input type="file" accept={fileTypes.join(',')} hidden onChange={handleFileChange} />
          </Button>

          {file && <Typography variant="body2" sx={{ marginTop: 1 }}>{file.name}</Typography>}

          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success.main">{success}</Typography>}

          <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ alignSelf: 'center', width: '50%', marginTop: 3 }}>
            {loading ? 'Envoi en cours...' : 'Envoyer'}
          </Button>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default DocumentImport;
