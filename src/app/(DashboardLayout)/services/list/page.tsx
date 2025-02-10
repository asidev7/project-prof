"use client";

import React, { useEffect, useState } from "react";
import { getServices } from "@/services/services";
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

const ServicesListPage = () => {
  const [services, setServices] = useState<{ id: number; name: string; description: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        setError("Erreur lors de la récupération des services.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Liste des services
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
            {services.map((service) => (
              <ListItem
                key={service.id}
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
                      {service.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {service.description}
                    </Typography>
                  }
                />
                <Chip label="Détails" color="primary" sx={{ ml: 2 }} onClick={() => console.log("Détails cliqué")} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default ServicesListPage;