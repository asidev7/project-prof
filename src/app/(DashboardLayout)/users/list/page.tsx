'use client'
import React, { useEffect, useState } from 'react';
import { getUsersList } from '@/services/users';
import { Grid, Box, Card, CardContent, Typography, CardHeader, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

const UsersListPage = () => {
  const [users, setUsers] = useState<any[]>([]);  // Déclarer `users` comme un tableau vide au début
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsersList();
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Les données des utilisateurs ne sont pas un tableau", data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs", error);
      }
    };
    fetchUsers();
  }, []);

  // Fonction de pagination
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <PageContainer>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Liste des Utilisateurs</Typography>
        <Button variant="contained" color="primary">
          Ajouter un Utilisateur
        </Button>
      </Box>

      <Card>
        <CardHeader title="Liste des Utilisateurs" />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nom</TableCell>
                  <TableCell>Prénom</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.nom}</TableCell>
                    <TableCell>{user.prenom}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.statut}</TableCell>
                    <TableCell>{user.role || "Non défini"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default UsersListPage;
