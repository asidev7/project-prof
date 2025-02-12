'use client';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

interface Permission {
  id: string;
  name: string;
  description: string;
  level: string;
}

const PermissionList = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [permissionsPerPage, setPermissionsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPermission, setNewPermission] = useState<Permission>({
    id: '',
    name: '',
    description: '',
    level: '',
  });

  const fetchPermissions = async () => {
    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/roles/list-permissions/');
      const data = await response.json();

      if (data.permissions && Array.isArray(data.permissions)) {
        setPermissions(data.permissions);
      } else {
        throw new Error('La réponse de l\'API ne contient pas un tableau de permissions.');
      }
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error';
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const handleEditPermission = (permission: Permission) => {
    alert(`Edit permission: ${permission.name}`);
  };

  const handleDeletePermission = async (permissionId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this permission?');
    if (confirmDelete) {
      try {
        const response = await fetch(`https://www.backend.lnb-intranet.globalitnet.org/roles/delete-permission/${permissionId}/`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data && data.success) {
          alert('Permission deleted successfully!');
          fetchPermissions(); // Rafraîchir la liste des permissions
        }
      } catch (err) {
        setError('Error deleting permission');
      }
    }
  };

  const handleAddPermission = async () => {
    // Validation simple des champs
    if (!newPermission.name || !newPermission.description || !newPermission.level) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/roles/create-permission/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPermission),
      });
      const data = await response.json();
      if (data.success) {
        alert('Permission added successfully!');
        setIsModalOpen(false);
        fetchPermissions(); // Rafraîchir la liste des permissions après ajout
      } else {
        alert('Failed to add permission');
      }
    } catch (err) {
      setError('Error adding permission');
    }
  };

  const indexOfLastPermission = (currentPage + 1) * permissionsPerPage;
  const indexOfFirstPermission = indexOfLastPermission - permissionsPerPage;
  const currentPermissions = permissions.slice(indexOfFirstPermission, indexOfLastPermission);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(permissions.length / permissionsPerPage);
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handleRolesPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPermissionsPerPage(Number(e.target.value));
    setCurrentPage(0); // Réinitialiser à la première page
  };

  if (loading) {
    return <div>Loading permissions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <PageContainer>
      <div style={{ padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#0056b3', fontWeight: 'bold' }}>Permissions List</h1>
          <button
            style={{
              backgroundColor: '#026549',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus style={{ marginRight: '5px' }} />
            Ajouter
          </button>
        </div>

        <div style={{ marginTop: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#026549', color: 'white' }}>
                <th style={{ padding: '12px' }}>Name</th>
                <th style={{ padding: '12px' }}>Description</th>
                <th style={{ padding: '12px' }}>Level</th>
                <th style={{ padding: '12px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPermissions.map((permission) => (
                <tr key={permission.id} style={{ backgroundColor: '#f8f9fa' }}>
                  <td style={{ padding: '12px' }}>{permission.name}</td>
                  <td style={{ padding: '12px' }}>{permission.description}</td>
                  <td style={{ padding: '12px' }}>{permission.level}</td>
                  <td style={{ padding: '12px', display: 'flex', justifyContent: 'space-around' }}>
                    <FaEdit
                      onClick={() => handleEditPermission(permission)}
                      style={{ cursor: 'pointer', color: '#026549' }}
                    />
                    <FaTrashAlt
                      onClick={() => handleDeletePermission(permission.id)}
                      style={{ cursor: 'pointer', color: '#dc3545' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
              Page {currentPage + 1} de {Math.ceil(permissions.length / permissionsPerPage)}
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

        {/* Modal pour l'ajout de permission */}
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
                padding: '30px',
                borderRadius: '8px',
                width: '400px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
              }}
            >
              <h3>Ajouter une permission</h3>
              <div>
                <label htmlFor="name">Nom</label>
                <input
                  type="text"
                  id="name"
                  value={newPermission.name}
                  onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
                  style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  value={newPermission.description}
                  onChange={(e) => setNewPermission({ ...newPermission, description: e.target.value })}
                  style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
                />
              </div>
              <div>
                <label htmlFor="level">Level</label>
                <select
                  id="level"
                  value={newPermission.level}
                  onChange={(e) => setNewPermission({ ...newPermission, level: e.target.value })}
                  style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
                >
                  <option value="">Select Level</option>
                  <option value="admin">Admin</option>
                  <option value="read">Read</option>
                  <option value="write">Write</option>
                </select>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={handleAddPermission}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  Ajouter
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default PermissionList;
