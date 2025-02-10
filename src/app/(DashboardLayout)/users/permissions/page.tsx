'use client';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import ReactPaginate from 'react-paginate';

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
  const [permissionsPerPage] = useState(5); // Nombre de permissions par page

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

  if (loading) {
    return <div>Loading permissions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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

  const indexOfLastPermission = (currentPage + 1) * permissionsPerPage;
  const indexOfFirstPermission = indexOfLastPermission - permissionsPerPage;
  const currentPermissions = permissions.slice(indexOfFirstPermission, indexOfLastPermission);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <PageContainer>
      <div style={{ padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#0056b3', fontWeight: 'bold' }}>Permissions List</h1>
          <button
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => alert('Add new permission')}
          >
            <FaPlus style={{ marginRight: '5px' }} />
            Ajouter
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
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
                    style={{ cursor: 'pointer', color: '#007bff' }}
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

        <ReactPaginate
          previousLabel={<span>&lt;</span>}
          nextLabel={<span>&gt;</span>}
          breakLabel={'...'}
          pageCount={Math.ceil(permissions.length / permissionsPerPage)} // Calcul dynamique du nombre total de pages
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
          previousClassName={'previous'}
          nextClassName={'next'}
          pageClassName={'page'}
          breakClassName={'break'}
          renderOnZeroPageCount={null}
        />
      </div>
    </PageContainer>
  );
};

export default PermissionList;
