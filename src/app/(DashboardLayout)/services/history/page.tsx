'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Box, Card, CardContent, Grid, Chip } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { getRequestHistory } from "@/services/services"; // Importe la fonction getRequestHistory

// Fonction pour mapper le status en couleur valide pour Chip
const getChipColor = (status: string): "default" | "error" | "primary" | "secondary" | "info" | "success" | "warning" => {
  const colorMap: { [key: string]: "default" | "error" | "primary" | "secondary" | "info" | "success" | "warning" } = {
    success: "success",
    warning: "warning",
    error: "error",
    // Tu peux ajouter d'autres valeurs si nécessaire, et les mapper à "default"
  };
  return colorMap[status] || "default"; // Valeur par défaut
};

const ServiceHistory = () => {
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Récupérer l'historique des services
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Remplace 'request_id' par l'ID de la demande que tu souhaites récupérer
        const requestId = '123'; // Exemple d'ID de demande
        const data = await getRequestHistory(requestId);

        if (Array.isArray(data)) {
          setHistoryData(data); // Met à jour l'état avec les données de l'historique
        } else {
          setError('Données reçues invalides');
        }
        setLoading(false);
      } catch (error: any) {
        setError("Erreur lors de la récupération de l'historique.");
        setLoading(false);
        console.error(error); // Pour voir plus de détails sur l'erreur dans la console
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <div>Chargement en cours...</div>;
  if (error) return <div>{error}</div>;

  return (
    <PageContainer title="Historique des Services" description="Voici l'historique des actions effectuées sur les services.">
      <DashboardCard title="Historique des Services">
        <Box sx={{ mt: 2 }}>
          {historyData.map((item, index) => (
            <Card
              key={index}
              sx={{
                mb: 2,
                borderLeft: 4,
                borderColor:
                  item.status === 'success'
                    ? 'green'
                    : item.status === 'warning'
                    ? 'orange'
                    : 'red',
              }}
            >
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6">Action {index + 1}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {new Date(item.timestamp).toLocaleString()} {/* Format de date */}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">Statut: {item.status}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={2} container justifyContent="flex-end">
                    <Chip
                      label={item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      color={getChipColor(item.status)}
                      size="small"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default ServiceHistory;
