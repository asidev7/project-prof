'use client';

import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const PageAddForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Titre:', title);
    console.log('Contenu:', content);
    console.log('Slug:', slug);
  };

  return (
    <PageContainer title="Ajouter une Page" description="Ajoutez une nouvelle page">
      <DashboardCard>
        <Typography variant="h5" align="center" gutterBottom>
          Ajouter une Page
        </Typography>
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
          <TextField label="Contenu" variant="outlined" fullWidth multiline rows={5} value={content} onChange={(e) => setContent(e.target.value)} required />
          <TextField label="Slug" variant="outlined" fullWidth value={slug} onChange={(e) => setSlug(e.target.value)} required />
          
          <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: 'center', width: '50%', marginTop: 3 }}>
            Enregistrer
          </Button>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default PageAddForm;
