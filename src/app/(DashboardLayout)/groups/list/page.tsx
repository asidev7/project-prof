'use client';
import React, { useState, useEffect, useCallback } from 'react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

interface Group {
  id: number;
  name: string;
  email: string;
  phone: string;
  bio: string;
  status: string;
  adresse: string;
  created_at: string;
  updated_at: string;
  photo: string | null;
  department: string;
  function: string;
  project: string;
  linked_groups: string[];
  members: string[];
}

const GroupList = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [groupsPerPage, setGroupsPerPage] = useState<number>(5);

  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = groups.slice(indexOfFirstGroup, indexOfLastGroup);

  const fetchGroups = useCallback(async () => {
    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/utilisateurs_groupes/list-groups/');
      const data = await response.json();
      if (data?.groups) {
        setGroups(data.groups);
      } else {
        throw new Error('Aucun groupe trouvé');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleDeleteGroup = async (groupId: number) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce groupe ?');
    if (confirmDelete) {
      try {
        const response = await fetch(`https://www.backend.lnb-intranet.globalitnet.org/utilisateurs_groupes/delete-group/${groupId}/`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data?.success) {
          alert('Groupe supprimé avec succès!');
          setGroups(groups.filter(group => group.id !== groupId)); // Mettre à jour la liste sans le groupe supprimé
        }
      } catch (err) {
        setError('Erreur lors de la suppression du groupe');
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(groups.length / groupsPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleGroupsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupsPerPage(Number(e.target.value));
    setCurrentPage(1); // Réinitialiser la page à 1 après modification du nombre de groupes par page
  };

  if (loading) {
    return <div>Chargement des groupes...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <PageContainer>
      <div style={{ padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#0056b3', fontWeight: 'bold' }}>Liste des Groupes</h1>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#026549', color: 'white' }}>
              <th style={{ padding: '12px' }}>Nom</th>
              <th style={{ padding: '12px' }}>Email</th>
              <th style={{ padding: '12px' }}>Téléphone</th>
              <th style={{ padding: '12px' }}>Département</th>
              <th style={{ padding: '12px' }}>Statut</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentGroups.map((group) => (
              <tr key={group.id} style={{ backgroundColor: '#f8f9fa' }}>
                <td style={{ padding: '12px' }}>{group.name}</td>
                <td style={{ padding: '12px' }}>{group.email}</td>
                <td style={{ padding: '12px' }}>{group.phone}</td>
                <td style={{ padding: '12px' }}>{group.department}</td>
                <td style={{ padding: '12px' }}>{group.status}</td>
                <td style={{ padding: '12px', display: 'flex', justifyContent: 'space-around' }}>
                  <FaEdit 
                    onClick={() => alert(`Modifier le groupe: ${group.name}`)} 
                    style={{ cursor: 'pointer', color: '#026549' }} 
                  />
                  <FaTrashAlt 
                    onClick={() => handleDeleteGroup(group.id)} 
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
            <label htmlFor="groupsPerPage" style={{ marginRight: '10px' }}>Groupes par page:</label>
            <select
              id="groupsPerPage"
              value={groupsPerPage}
              onChange={handleGroupsPerPageChange}
              style={{
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #026549',
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
                backgroundColor: '#026549',
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
              Page {currentPage} sur {Math.ceil(groups.length / groupsPerPage)}
            </span>
            <button
              onClick={handleNextPage}
              style={{
                padding: '10px 20px',
                backgroundColor: '#026549',
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

export default GroupList;
