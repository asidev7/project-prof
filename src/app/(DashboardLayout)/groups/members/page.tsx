'use client';

import React, { useState, useEffect, useCallback } from 'react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Button, TextField, MenuItem, Snackbar, Alert } from '@mui/material';
import './Members.css';

interface Member {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  statut: string;
}

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [membersPerPage, setMembersPerPage] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterRole, setFilterRole] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const fetchMembers = useCallback(async () => {
    try {
      const response = await fetch('/api/members');
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      const data = await response.json();
      setMembers(data.members);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleDeleteMember = async (memberId: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) return;
    try {
      const response = await fetch(`/api/members/${memberId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Échec de la suppression');
      setMembers(members.filter((member) => member.id !== memberId));
      setSnackbarMessage('Membre supprimé avec succès !');
      setSnackbarSeverity('success');
    } catch (err) {
      setSnackbarMessage('Erreur lors de la suppression du membre.');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      member.nom.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterRole ? member.role === filterRole : true)
  );

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);

  return (
    <PageContainer>
      <h1>Liste des Membres</h1>
      <Button variant="contained" color="primary" href="/members/add">
        Ajouter un Membre
      </Button>

      <div className="filters-container">
        <TextField
          label="Rechercher"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
        <TextField
          select
          label="Filtrer par rôle"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          fullWidth
        >
          <MenuItem value="">Tous</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">Utilisateur</MenuItem>
        </TextField>
      </div>

      {loading ? (
        <p className="loading-message">Chargement...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nom et Prénom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMembers.map((member) => (
              <tr key={member.id}>
                <td>
                  {member.nom} {member.prenom}
                </td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td>{member.statut}</td>
                <td className="actions">
                  <FaEdit onClick={() => alert(`Modifier ${member.nom}`)} />
                  <FaTrashAlt onClick={() => handleDeleteMember(member.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default Members;