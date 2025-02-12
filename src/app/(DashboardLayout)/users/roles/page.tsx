'use client';

import React, { useEffect, useState } from 'react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

interface Permission {
  id: number; // L'API renvoie un nombre pour l'id
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
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  // État du modal d'ajout
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '', permissions: [] });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rolesPerPage, setRolesPerPage] = useState(5);

  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = roles.slice(indexOfFirstRole, indexOfLastRole);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(roles.length / rolesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRolesPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRolesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Récupération des rôles
  const fetchRoles = async () => {
    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/roles/list-roles/');
      const data = await response.json();
      // On s'attend à recevoir { roles: [...] }
      if (data && data.roles && Array.isArray(data.roles)) {
        setRoles(data.roles);
      } else {
        throw new Error('Aucun rôle trouvé');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Récupération des permissions
  const fetchPermissions = async () => {
    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/roles/list-permissions/');
      const data = await response.json();
      // On s'attend à recevoir { permissions: [...] }
      if (data && data.permissions && Array.isArray(data.permissions)) {
        setPermissions(data.permissions);
      } else {
        throw new Error('Aucune permission trouvée');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  // Ajout d'un rôle via l'API
  const handleAddRole = async () => {
    const newRoleData = {
      name: newRole.name,
      description: newRole.description,
      parent_role_id: 0, // Modifiez ce champ si besoin
      // On envoie un tableau d'identifiants (nombres) des permissions sélectionnées
      permissions: selectedPermissions.map((id) => parseInt(id, 10)),
    };

    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/roles/create-role/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRoleData),
      });
      const data = await response.json();
      if (data && data.success) {
        alert('Rôle ajouté avec succès !');
        fetchRoles(); // Rafraîchit la liste des rôles
        setIsModalOpen(false); // Ferme le modal
        // Réinitialisation du formulaire du modal
        setNewRole({ name: '', description: '', permissions: [] });
        setSelectedPermissions([]);
      }
    } catch (err) {
      setError('Erreur lors de l’ajout du rôle');
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce rôle ?');
    if (confirmDelete) {
      try {
        const response = await fetch(`https://www.backend.lnb-intranet.globalitnet.org/roles/delete-role/${roleId}/`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data && data.success) {
          alert('Rôle supprimé avec succès !');
          fetchRoles();
        }
      } catch (err) {
        setError('Erreur lors de la suppression du rôle');
      }
    }
  };

  const handleEditRole = (role: Role) => {
    alert(`Modifier le rôle : ${role.name}`);
  };

  if (loading) {
    return (
      <PageContainer>
        <p>Chargement des rôles...</p>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <p style={{ color: 'red' }}>Erreur : {error}</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div style={{ padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#0056b3', fontWeight: 'bold' }}>Liste des rôles et des permissions</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            Ajouter un rôle
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
              <th style={{ padding: '12px' }}>Nom</th>
              <th style={{ padding: '12px' }}>Description</th>
              <th style={{ padding: '12px' }}>Permissions</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRoles.map((role) => (
              <tr key={role.id} style={{ backgroundColor: '#f8f9fa' }}>
                <td style={{ padding: '12px' }}>{role.name}</td>
                <td style={{ padding: '12px' }}>{role.description}</td>
                <td style={{ padding: '12px' }}>
                  <ul>
                    {role.permissions.map((permission) => (
                      <li key={permission.id}>
                        <strong>{permission.name}</strong>: {permission.description} (Niveau : {permission.level})
                      </li>
                    ))}
                  </ul>
                </td>
                <td style={{ padding: '12px', display: 'flex', justifyContent: 'space-around' }}>
                  <FaEdit
                    onClick={() => handleEditRole(role)}
                    style={{ cursor: 'pointer', color: '#007bff' }}
                  />
                  <FaTrashAlt
                    onClick={() => handleDeleteRole(role.id)}
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
            <label htmlFor="rolesPerPage" style={{ marginRight: '10px' }}>Rôles par page :</label>
            <select
              id="rolesPerPage"
              value={rolesPerPage}
              onChange={handleRolesPerPageChange}
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
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Précédent
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= Math.ceil(roles.length / rolesPerPage)}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>

      {/* Modal d'ajout */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '400px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2>Ajouter un rôle</h2>
            <div style={{ marginBottom: '10px' }}>
              <label>Nom du rôle:</label>
              <input
                type="text"
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  borderRadius: '5px',
                  border: '1px solid #007bff',
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Description:</label>
              <input
                type="text"
                value={newRole.description}
                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  borderRadius: '5px',
                  border: '1px solid #007bff',
                }}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label>Permissions:</label>
              <select
                multiple
                value={selectedPermissions}
                onChange={(e) =>
                  setSelectedPermissions(
                    [...e.target.selectedOptions].map((option) => option.value)
                  )
                }
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  borderRadius: '5px',
                  border: '1px solid #007bff',
                }}
              >
                {permissions.map((permission) => (
                  <option key={permission.id} value={String(permission.id)}>
                    {permission.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setIsModalOpen(false)} style={{ padding: '8px 16px' }}>
                Annuler
              </button>
              <button
                onClick={handleAddRole}
                style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 16px' }}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default RoleList;
