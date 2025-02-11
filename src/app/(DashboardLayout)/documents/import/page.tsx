'use client';

import { useState } from 'react';
import { TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const fileTypes = ['PDF', 'WORD', 'EXCEL', 'POWERPOINT', 'TEXT', 'JPG', 'PNG', 'MP4 video', 'MP3 Audio'];
const categories = ['Rapport', 'Facture', 'Contrat', 'Autre'];
const users = ['Utilisateur 1', 'Utilisateur 2', 'Utilisateur 3'];

const DocumentImport = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileType, setFileType] = useState('PDF');
  const [file, setFile] = useState<File | null>(null);
  const [uploadedBy, setUploadedBy] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleTagAdd = () => {
    if (newTag.trim() !== '' && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Titre:', title);
    console.log('Description:', description);
    console.log('Type de fichier:', fileType);
    console.log('Fichier:', file);
    console.log('Ajouté par:', uploadedBy);
    console.log('Catégorie:', category);
    console.log('Tags:', tags);
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

          
          {file && <Typography variant="body2">{file.name}</Typography>}

          <FormControl fullWidth>
            <InputLabel>Ajouté par</InputLabel>
            <Select value={uploadedBy} onChange={(e) => setUploadedBy(e.target.value)}>
              {users.map((user) => <MenuItem key={user} value={user}>{user}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Catégorie</InputLabel>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((cat) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
            </Select>
          </FormControl>

          <Box display="flex" gap={2} alignItems="center">
            <TextField label="Ajouter un tag" variant="outlined" value={newTag} onChange={(e) => setNewTag(e.target.value)} />
            <Button variant="contained" onClick={handleTagAdd}>+</Button>
          </Box>
          {tags.length > 0 && <Typography variant="body2">Tags: {tags.join(', ')}</Typography>}

          <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: 'center', width: '50%' }}>
            Envoyer
          </Button>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default DocumentImport;
