'use client';
import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, IconButton, Box } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import { uploadMedia } from "@/services/document";  // Importer la fonction
import { SelectChangeEvent } from '@mui/material/Select'; // Import du type SelectChangeEvent

// Types de fichiers supportés
const fileTypes = ['PDF', 'WORD', 'EXCEL', 'POWERPOINT', 'TEXT', 'JPG', 'PNG', 'MP4 video', 'MP3 Audio'];

// Déclaration des types pour le state
interface MediaData {
  title: string;
  mediaType: string;
  file: File | null;
  uploadedBy: string;
}

const MediaForm: React.FC = () => {
  // State avec typage explicite pour MediaData
  const [mediaData, setMediaData] = useState<MediaData>({
    title: "",
    mediaType: "",
    file: null,
    uploadedBy: "",
  });

  // Gestion des changements dans les champs du formulaire
  const handleChangeText = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (name) {
      setMediaData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleChangeSelect = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    if (name) {
      setMediaData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Gestion de la sélection d'un fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setMediaData((prev) => ({ ...prev, file }));
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", mediaData);

    if (mediaData.file) {
      try {
        const uploadedMedia = await uploadMedia(mediaData.file);  // Appeler la fonction d'upload
        console.log("Média téléchargé:", uploadedMedia);
      } catch (error) {
        console.error("Erreur lors de l'upload du média:", error);
      }
    }
  };

  // Fonction pour afficher l'icône correspondant au type de fichier
  const renderFileIcon = (fileType: string) => {
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
        return <ImageIcon />;
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
        onChange={handleChangeText}  // Utiliser le gestionnaire pour le TextField
        fullWidth
        required
      />
      
      <FormControl fullWidth>
        <InputLabel>Media Type</InputLabel>
        <Select name="mediaType" value={mediaData.mediaType} onChange={handleChangeSelect} required>
          <MenuItem value="image">Image</MenuItem>
          <MenuItem value="video">Vidéo</MenuItem>
          <MenuItem value="audio">Audio</MenuItem>
        </Select>
      </FormControl>
      
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
            border: '2px solid #1976d2',
            borderRadius: '50%',
            padding: '8px',
            ':hover': { borderColor: '#1565c0' }
          }}
        >
          {mediaData.file ? renderFileIcon(mediaData.file.name.split('.').pop()?.toUpperCase() || '') : <InsertDriveFileIcon />}
        </IconButton>
      </label>
      
      <FormControl fullWidth>
        <InputLabel>Uploaded By</InputLabel>
        <Select name="uploadedBy" value={mediaData.uploadedBy} onChange={handleChangeSelect} required>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </Select>
      </FormControl>
      
      <Button type="submit" variant="contained" color="primary">Envoyer</Button>
    </form>
  );
};

const MediaListPage: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Ajouter un Média</h1>
      <MediaForm />
    </div>
  );
};

export default MediaListPage;
