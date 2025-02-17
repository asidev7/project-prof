'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

interface Permission {
  id: number;
  name: string;
  description: string;
  level: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

const RoleList = () => {
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rolesPerPage] = useState(5);

  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = roles.slice(indexOfFirstRole, indexOfLastRole);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/roles/list-roles/');
      const data = await response.json();
      setRoles(data.roles || []);
    } catch (err) {
      setError('Erreur lors du chargement des rôles');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce rôle ?')) {
      try {
        const response = await fetch(`https://www.backend.lnb-intranet.globalitnet.org/roles/delete-role/${roleId}/`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.success) {
          alert('Rôle supprimé avec succès !');
          fetchRoles();
        }
      } catch (err) {
        setError('Erreur lors de la suppression du rôle');
      }
    }
  };

  return (
    <PageContainer>
      <div style={{ padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <h1 style={{ color: '#0056b3', fontWeight: 'bold' }}>Liste des rôles et des permissions</h1>
        <button
          onClick={() => router.push('/users/roles/add')}
          style={{
            backgroundColor: '#026549',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Ajouter un rôle
        </button>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#026549', color: 'white' }}>
              <th>Nom</th>
              <th>Description</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRoles.map((role) => (
              <tr key={role.id} style={{ backgroundColor: '#f8f9fa' }}>
                <td>{role.name}</td>
                <td>{role.description}</td>
                <td>
                  <ul>
                    {role.permissions.map((permission) => (
                      <li key={permission.id}>
                        <strong>{permission.name}</strong>: {permission.description} (Niveau : {permission.level})
                      </li>
                    ))}
                  </ul>
                </td>
                <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <FaEdit style={{ cursor: 'pointer', color: '#026549' }} />
                  <FaTrashAlt onClick={() => handleDeleteRole(role.id)} style={{ cursor: 'pointer', color: '#dc3545' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>Précédent</button>
          <span>Page {currentPage}</span>
          <button onClick={() => setCurrentPage((prev) => prev + 1)}>Suivant</button>
        </div>
      </div>
    </PageContainer>
  );
};

export default RoleList;
