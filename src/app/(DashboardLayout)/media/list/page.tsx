'use client';

import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, IconButton, Box } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';  // Utilisation de ImageIcon pour les images
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AudioFileIcon from '@mui/icons-material/AudioFile';

const fileTypes = ['PDF', 'WORD', 'EXCEL', 'POWERPOINT', 'TEXT', 'JPG', 'PNG', 'MP4 video', 'MP3 Audio'];

const MediaForm = () => {
  const [mediaData, setMediaData] = useState({
    title: "",
    mediaType: "",
    file: null,
    uploadedBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMediaData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setMediaData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", mediaData);
    // Ici, tu peux ajouter l'upload vers Firebase Storage et Firestore
  };

  // Fonction pour afficher l'icône en fonction du type de fichier
  const renderFileIcon = (fileType) => {
    switch (fileType) {
      case 'PDF':
        return <PictureAsPdfIcon />;
      case 'WORD':
        return <DescriptionIcon />;
      case 'EXCEL':
        return <InsertDriveFileIcon />;
      case 'POWERPOINT':
        return <InsertDriveFileIcon />;
      case 'TEXT':
        return <InsertDriveFileIcon />;
      case 'JPG':
      case 'PNG':
        return <ImageIcon />;  // Utilisation de ImageIcon pour les images
      case 'MP4 video':
        return <PlayCircleIcon />;
      case 'MP3 Audio':
        return <AudioFileIcon />;
      default:
        return <InsertDriveFileIcon />;
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 400, margin: "auto" }}>
      <TextField
        label="Title"
        name="title"
        value={mediaData.title}
        onChange={handleChange}
        fullWidth
        required
      />
      
      <FormControl fullWidth>
        <InputLabel>Media Type</InputLabel>
        <Select name="mediaType" value={mediaData.mediaType} onChange={handleChange} required>
          <MenuItem value="image">Image</MenuItem>
          <MenuItem value="video">Vidéo</MenuItem>
          <MenuItem value="audio">Audio</MenuItem>
        </Select>
      </FormControl>
      
      {/* Sélection de fichier avec icône et bordure */}
      <label htmlFor="file-input">
        <input
          id="file-input"
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          required
        />
        <IconButton
          component="span"
          color="primary"
          sx={{
            border: '2px solid #1976d2',  // Bordure autour de l'icône
            borderRadius: '50%',          // Pour rendre l'icône ronde
            padding: '8px',               // Ajouter un peu de padding autour de l'icône
            ':hover': { borderColor: '#1565c0' }  // Changer la couleur de la bordure au survol
          }}
        >
          {mediaData.file ? renderFileIcon(mediaData.file.name.split('.').pop().toUpperCase()) : <InsertDriveFileIcon />}
        </IconButton>
      </label>
      
      <FormControl fullWidth>
        <InputLabel>Uploaded By</InputLabel>
        <Select name="uploadedBy" value={mediaData.uploadedBy} onChange={handleChange} required>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </Select>
      </FormControl>
      
      <Button type="submit" variant="contained" color="primary">Envoyer</Button>
    </form>
  );
};

const MediaListPage = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Ajouter un Média</h1> {/* Centrer le titre */}
      <MediaForm />
    </div>
  );
};

export default MediaListPage;
