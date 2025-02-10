'use client';
import React, { useEffect, useState } from 'react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

interface Permission {
  id: string;
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
  const [roles, setRoles] = useState<Role[]>([]); // Explicitly type roles as an array of Role objects
  const [permissions, setPermissions] = useState<Permission[]>([]); // Explicitly type permissions as an array of Permission objects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Define error type as string or null
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rolesPerPage, setRolesPerPage] = useState(5); // Default value of 5

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
    setCurrentPage(1); // Reset to page 1 after changing the number of roles per page
  };

  // Fetch the roles and permissions when the component mounts
  const fetchRoles = async () => {
    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/roles/list-roles/');
      const data = await response.json();
      if (data && data.roles) {
        setRoles(data.roles);
      } else {
        throw new Error('No roles found');
      }
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error';
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/roles/list-permissions/');
      const data = await response.json();
      if (data) {
        setPermissions(data);
      } else {
        throw new Error('No permissions found');
      }
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error';
      setError(error);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  if (loading) {
    return <div>Loading roles...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleAddRole = async () => {
    const newRole = {
      name: 'New role',
      description: 'Role description',
      permissions: selectedPermissions,
    };

    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/roles/create-role/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRole),
      });
      const data = await response.json();
      if (data && data.success) {
        alert('Role added successfully!');
        fetchRoles(); // Refresh the roles
      }
    } catch (err) {
      setError('Error adding role');
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this role?');
    if (confirmDelete) {
      try {
        const response = await fetch(`https://www.backend.lnb-intranet.globalitnet.org/roles/delete-role/${roleId}/`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data && data.success) {
          alert('Role deleted successfully!');
          fetchRoles(); // Refresh the roles
        }
      } catch (err) {
        setError('Error deleting role');
      }
    }
  };

  const handleEditRole = (role: Role) => {
    alert(`Edit role: ${role.name}`);
  };

  return (
    <PageContainer>
      <div style={{ padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#0056b3', fontWeight: 'bold' }}>Roles and Permissions List</h1>
          <button
            onClick={handleAddRole}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            Add Role
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
              <th style={{ padding: '12px' }}>Name</th>
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
                    {role.permissions.map((permission: Permission) => (
                      <li key={permission.id}>
                        <strong>{permission.name}</strong>: {permission.description} (Level: {permission.level})
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
            <label htmlFor="rolesPerPage" style={{ marginRight: '10px' }}>Roles per page:</label>
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
              Previous
            </button>
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
              Page {currentPage} of {Math.ceil(roles.length / rolesPerPage)}
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
              Next
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default RoleList;
