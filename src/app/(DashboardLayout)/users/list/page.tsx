'use client';
import React, { useState, useEffect, useCallback } from 'react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  statut: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage, setUsersPerPage] = useState<number>(5);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/utilisateurs/list-users/');
      const data = await response.json();
      if (data?.utilisateurs) {
        setUsers(data.utilisateurs);
      } else {
        throw new Error('Aucun utilisateur trouvé');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteUser = async (userId: number) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
    if (confirmDelete) {
      try {
        const response = await fetch(`https://www.backend.lnb-intranet.globalitnet.org/utilisateurs/delete-user/${userId}/`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data?.success) {
          alert('Utilisateur supprimé avec succès!');
          setUsers(users.filter(user => user.id !== userId)); // Mettre à jour la liste sans l'utilisateur supprimé
        }
      } catch (err) {
        setError('Erreur lors de la suppression de l\'utilisateur');
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleUsersPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUsersPerPage(Number(e.target.value));
    setCurrentPage(1); // Réinitialiser la page à 1 après modification du nombre d'utilisateurs par page
  };

  if (loading) {
    return <div>Chargement des utilisateurs...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <PageContainer>
      <div style={{ padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#0056b3', fontWeight: 'bold' }}>Liste des Utilisateurs</h1>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
              <th style={{ padding: '12px' }}>Nom et Prénom</th>
              <th style={{ padding: '12px' }}>Email</th>
              <th style={{ padding: '12px' }}>Role</th>
              <th style={{ padding: '12px' }}>Statut</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} style={{ backgroundColor: '#f8f9fa' }}>
                <td style={{ padding: '12px' }}>{user.nom} {user.prenom}</td>
                <td style={{ padding: '12px' }}>{user.email}</td>
                <td style={{ padding: '12px' }}>{user.role}</td>
                <td style={{ padding: '12px' }}>{user.statut}</td>
                <td style={{ padding: '12px', display: 'flex', justifyContent: 'space-around' }}>
                  <FaEdit 
                    onClick={() => alert(`Modifier l'utilisateur: ${user.nom} ${user.prenom}`)} 
                    style={{ cursor: 'pointer', color: '#007bff' }} 
                  />
                  <FaTrashAlt 
                    onClick={() => handleDeleteUser(user.id)} 
                    style={{ cursor: 'pointer', color: '#dc3545' }} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <div>
            <label htmlFor="usersPerPage" style={{ marginRight: '10px' }}>Utilisateurs par page:</label>
            <select
              id="usersPerPage"
              value={usersPerPage}
              onChange={handleUsersPerPageChange}
              style={{
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #007bff',
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div>
            <button
              onClick={handlePreviousPage}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '5px',
                marginRight: '10px',
              }}
            >
              Précédent
            </button>
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
              Page {currentPage} sur {Math.ceil(users.length / usersPerPage)}
            </span>
            <button
              onClick={handleNextPage}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '5px',
                marginLeft: '10px',
              }}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default UserList;
