"use client";

import React, { useEffect, useState } from "react";
import { getMediaList } from "@/services/document"; // Assurez-vous que la fonction getMediaList est bien exportée depuis document.ts
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
  Alert,
  Box,
  Chip,
} from "@mui/material";

const MediasListPage = () => {
  const [medias, setMedias] = useState<{ id: number; title: string; description: string }[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedias = async () => {
      try {
        const data = await getMediaList();
        setMedias(data); // Assurez-vous que `data` est bien un tableau
      } catch (err) {
        setError("Erreur lors de la récupération des médias.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedias();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Liste des médias
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Paper elevation={3} sx={{ p: 2 }}>
          <List>
            {(Array.isArray(medias) && medias.length > 0) ? (
              medias.map((media) => (
                <ListItem
                  key={media.id}
                  sx={{
                    mb: 1,
                    borderRadius: 1,
                    transition: "background-color 0.3s",
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {media.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {media.description}
                      </Typography>
                    }
                  />
                  <Chip label="Détails" color="primary" sx={{ ml: 2 }} onClick={() => console.log("Détails cliqués")} />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Aucun média disponible.
              </Typography>
            )}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default MediasListPage;
