'use client';
import React, { useState, useEffect, useCallback } from 'react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './UserList.css';

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
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/utilisateurs/list-users/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

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
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://www.backend.lnb-intranet.globalitnet.org/utilisateurs/delete-user/${userId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      if (data?.success) {
        alert('Utilisateur supprimé avec succès!');
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        throw new Error('Échec de la suppression de l’utilisateur.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleUsersPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUsersPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  if (loading) {
    return <div>Chargement des utilisateurs...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Erreur: {error}</div>;
  }

  return (
    <PageContainer>
      <div className="page-container">
        <h1 className="page-title">Liste des Utilisateurs</h1>

        <table className="user-table">
          <thead>
            <tr>
              <th>Nom et Prénom</th>
              <th>Email</th>
              <th>Role</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.nom} {user.prenom}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.statut}</td>
                <td className="actions">
                  <FaEdit
                    onClick={() => alert(`Modifier l'utilisateur: ${user.nom} ${user.prenom}`)}
                    className="edit-icon"
                  />
                  <FaTrashAlt
                    onClick={() => handleDeleteUser(user.id)}
                    className="delete-icon"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="pagination-controls">
          <div className="pagination-select">
            <label htmlFor="usersPerPage">Utilisateurs par page:</label>
            <select
              id="usersPerPage"
              value={usersPerPage}
              onChange={handleUsersPerPageChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div className="pagination-buttons">
            <button onClick={handlePreviousPage} className="pagination-button" disabled={currentPage === 1}>
              Précédent
            </button>
            <span className="pagination-info">
              Page {currentPage} sur {Math.ceil(users.length / usersPerPage)}
            </span>
            <button onClick={handleNextPage} className="pagination-button" disabled={currentPage >= Math.ceil(users.length / usersPerPage)}>
              Suivant
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default UserList;
