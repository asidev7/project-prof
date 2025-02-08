'use client';

import { useEffect, useState } from 'react';
import { Grid, Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { getUserList } from '@/services/users';  // Assurez-vous que le chemin d'importation est correct

const UserList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Charger la liste des utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUserList();
        setUsers(response);  // Mettez à jour l'état avec la réponse
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <PageContainer title="Liste des utilisateurs" description="Affichage de tous les utilisateurs">
      <Box>
        {/* Si les données sont en cours de chargement, afficher un message de chargement */}
        {loading ? (
          <Typography variant="h6">Chargement des utilisateurs...</Typography>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Liste des utilisateurs
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>Nom</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Rôle</TableCell>
                          {/* Ajoutez d'autres colonnes ici si nécessaire */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            {/* Ajoutez d'autres cellules ici si nécessaire */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
    </PageContainer>
  );
};

export default UserList;
