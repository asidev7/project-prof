'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  IconButton,
  useTheme,
  TablePagination,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Chip,
  Snackbar,
  Alert,
  Checkbox
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const getCsrfToken = () => {
  return document.cookie.split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
};

const UserList = () => {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [newUser, setNewUser] = useState({ 
    nom: '',
    prenom: '',
    email: '',
    username: '',
    role: '',
    telephone: '',
    adresse: '',
    date_naissance: '',
    lieu_naissance: '',
    password: '',
    department: ''
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/utilisateurs/user-list/');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      showSnackbar('Erreur de chargement des utilisateurs', 'error');
    }
  };

  const fetchRolesAndDepartments = async () => {
    try {
      const [rolesRes, deptRes] = await Promise.all([
        fetch('https://www.backend.lnb-intranet.globalitnet.org/roles/list-roles/').then(res => res.json()),
        fetch('https://www.backend.lnb-intranet.globalitnet.org/services/departments/').then(res => res.json())
      ]);
      setRoles(rolesRes.roles || []);
      setDepartments(deptRes.departments || []);
    } catch (error) {
      showSnackbar('Erreur de chargement des données', 'error');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchUsers(), fetchRolesAndDepartments()]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleAddUser = async () => {
    try {
      const csrfToken = getCsrfToken();
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/utilisateurs/inscription/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': csrfToken,
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || JSON.stringify(errorData));
      }

      await fetchUsers();
      setOpen(false);
      setNewUser({ 
        nom: '',
        prenom: '',
        email: '',
        username: '',
        role: '',
        telephone: '',
        adresse: '',
        date_naissance: '',
        lieu_naissance: '',
        password: '',
        department: ''
      });
      showSnackbar('Utilisateur créé avec succès!');
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const csrfToken = getCsrfToken();
      const response = await fetch(`https://www.backend.lnb-intranet.globalitnet.org/utilisateurs/delete-user/${userId}/`, {
        method: 'DELETE',
        headers: {
          'X-CSRFTOKEN': csrfToken,
        },
      });

      if (!response.ok) throw new Error('Échec de la suppression');
      
      await fetchUsers();
      showSnackbar('Utilisateur supprimé avec succès!');
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  };

  const handleBulkDelete = async () => {
    try {
      const csrfToken = getCsrfToken();
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/utilisateurs/delete-users/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': csrfToken,
        },
        body: JSON.stringify({ user_ids: selectedUsers }),
      });

      if (!response.ok) throw new Error('Échec de la suppression multiple');
      
      await fetchUsers();
      setSelectedUsers([]);
      showSnackbar('Utilisateurs supprimés avec succès!');
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  };

  const handleEditUser = async () => {
    try {
      const csrfToken = getCsrfToken();
      const response = await fetch(`https://www.backend.lnb-intranet.globalitnet.org/utilisateurs/update-user/${selectedUser.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': csrfToken,
        },
        body: JSON.stringify(selectedUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || JSON.stringify(errorData));
      }

      await fetchUsers();
      setEditOpen(false);
      showSnackbar('Utilisateur modifié avec succès!');
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId) 
        : [...prev, userId]
    );
  };

  return (
    <PageContainer title="Gestion des utilisateurs" description="Interface d'administration des utilisateurs">
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Interface principale */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ boxShadow: 3, borderRadius: 4 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight={700} color="primary.main">
                  Gestion des utilisateurs
                </Typography>
                <Box>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleBulkDelete}
                    disabled={selectedUsers.length === 0}
                    sx={{ mr: 2 }}
                  >
                    Supprimer sélection
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    onClick={() => setOpen(true)}
                  >
                    Nouvel utilisateur
                  </Button>
                </Box>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          indeterminate={
                            selectedUsers.length > 0 &&
                            selectedUsers.length < users.length
                          }
                          checked={users.length > 0 && selectedUsers.length === users.length}
                          onChange={() => 
                            setSelectedUsers(prev => 
                              prev.length === users.length ? [] : users.map(u => u.id)
                            )
                          }
                        />
                      </TableCell>
                      {['Nom', 'Prénom', 'Email', 'Rôle', 'Département', 'Actions'].map((header, index) => (
                        <TableCell key={index} align="center">
                          {header}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                      <TableRow key={user.id} hover>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleSelectUser(user.id)}
                          />
                        </TableCell>
                        <TableCell align="center">{user.nom}</TableCell>
                        <TableCell align="center">{user.prenom}</TableCell>
                        <TableCell align="center">{user.email}</TableCell>
                        <TableCell align="center">{user.role}</TableCell>
                        <TableCell align="center">{user.department}</TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => { setSelectedUser(user); setEditOpen(true); }}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteUser(user.id)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </TableCell>
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
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog pour ajouter un utilisateur */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Ajouter un utilisateur</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom"
            fullWidth
            variant="outlined"
            value={newUser.nom}
            onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })}
            required
          />
          <TextField
            margin="dense"
            label="Prénom"
            fullWidth
            variant="outlined"
            value={newUser.prenom}
            onChange={(e) => setNewUser({ ...newUser, prenom: e.target.value })}
            required
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="outlined"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <TextField
            margin="dense"
            label="Nom d'utilisateur"
            fullWidth
            variant="outlined"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            required
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Rôle</InputLabel>
            <Select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Téléphone"
            fullWidth
            variant="outlined"
            value={newUser.telephone}
            onChange={(e) => setNewUser({ ...newUser, telephone: e.target.value })}
            required
          />
          <TextField
            margin="dense"
            label="Adresse"
            fullWidth
            variant="outlined"
            value={newUser.adresse}
            onChange={(e) => setNewUser({ ...newUser, adresse: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Date de naissance"
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={newUser.date_naissance}
            onChange={(e) => setNewUser({ ...newUser, date_naissance: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Lieu de naissance"
            fullWidth
            variant="outlined"
            value={newUser.lieu_naissance}
            onChange={(e) => setNewUser({ ...newUser, lieu_naissance: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Mot de passe"
            fullWidth
            type="password"
            variant="outlined"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Département</InputLabel>
            <Select
              value={newUser.department}
              onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
            >
              {departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.name}>{dept.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Annuler</Button>
          <Button onClick={handleAddUser} color="primary">Ajouter</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog pour éditer un utilisateur */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Modifier l'utilisateur</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom"
            fullWidth
            variant="outlined"
            value={selectedUser?.nom || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, nom: e.target.value })}
            required
          />
          <TextField
            margin="dense"
            label="Prénom"
            fullWidth
            variant="outlined"
            value={selectedUser?.prenom || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, prenom: e.target.value })}
            required
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="outlined"
            type="email"
            value={selectedUser?.email || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
            required
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Rôle</InputLabel>
            <Select
              value={selectedUser?.role || ''}
              onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Téléphone"
            fullWidth
            variant="outlined"
            value={selectedUser?.telephone || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, telephone: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} color="primary">Annuler</Button>
          <Button onClick={handleEditUser} color="primary">Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default UserList;
