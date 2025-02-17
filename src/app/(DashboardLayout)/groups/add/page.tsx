'use client'; // Assurez-vous que c'est un composant côté client

import React, { useState, useEffect } from 'react';
import './AddGroup.css'; // Importation du CSS
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer'; // Assurez-vous du bon chemin

const AddGroup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role_id: '',
    bio: '',
    adresse: '',
    group_type: '',
    department_id: '',
    function_id: '',
    project: '',
    auto_assign: false,
    photo: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [roles, setRoles] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [functions, setFunctions] = useState<any[]>([]);

  useEffect(() => {
    // Fetch roles, departments, and functions
    const fetchRoles = async () => {
      try {
        const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/roles/list-roles/', {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          credentials: 'include',
        });

        if (!response.ok) throw new Error(`Erreur ${response.status}`);
        const data = await response.json();
        setRoles(data.roles || []);
      } catch (err) {
        setError('Erreur lors de la récupération des rôles.');
        console.error('Erreur lors de la récupération des rôles:', err);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/services/departments/');
        const data = await response.json();
        if (Array.isArray(data.departments)) {
          setDepartments(data.departments);
        } else {
          setError('Erreur lors de la récupération des départements.');
        }
      } catch (err) {
        setError('Erreur lors de la récupération des départements.');
        console.error('Erreur lors de la récupération des départements:', err);
      }
    };

    const fetchFunctions = async () => {
      try {
        const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/services/functions/');
        const data = await response.json();
        if (Array.isArray(data.functions)) {
          setFunctions(data.functions);
        } else {
          setError('Erreur lors de la récupération des fonctions.');
        }
      } catch (err) {
        setError('Erreur lors de la récupération des fonctions.');
        console.error('Erreur lors de la récupération des fonctions:', err);
      }
    };

    fetchRoles();
    fetchDepartments();
    fetchFunctions();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'photo' && e.target.files) {
      setFormData({ ...formData, photo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const formDataToSend = new FormData();

    // Ajout des données dans FormData
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key as keyof typeof formData];
        if (value !== null) {
          formDataToSend.append(key, value as string | Blob);
        }
      }
    }

    // Loguer les données avant l'envoi
    console.log('Form data to send:', formDataToSend);

    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/utilisateurs_groupes/create-group/', {
        method: 'POST',
        body: formDataToSend,
      });

      // Vérifier la réponse du serveur
      const data = await response.json();
      if (!response.ok) {
        console.error('Erreur serveur:', data);
        setError(data?.message || 'Erreur inconnue');
        return;
      }

      if (data?.success) {
        setMessage('Groupe ajouté avec succès!');
        console.log('Groupe ajouté avec succès:', data);
        // Réinitialiser les données du formulaire
        setFormData({
          name: '',
          email: '',
          phone: '',
          role_id: '',
          bio: '',
          adresse: '',
          group_type: '',
          department_id: '',
          function_id: '',
          project: '',
          auto_assign: false,
          photo: null,
        });
      } else {
        setError(data?.message || 'Erreur inconnue');
        console.error('Erreur lors de l\'ajout du groupe:', data?.message || 'Erreur inconnue');
      }
    } catch (err) {
      setError('Erreur lors de l\'ajout du groupe');
      console.error('Erreur réseau ou autre:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="">
        <h2>Ajouter un Groupe</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select
              name="role_id"
              value={formData.role_id}
              onChange={handleInputChange}
              className="select-style"
              required
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Bio:</label>
            <input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleInputChange}
            />
          </div>
           <div className="form-group">
            <label>Group Type:</label>
            <select
              name="group_type"
              value={formData.group_type}
              onChange={handleInputChange}
              className="select-style"
              required
            >
              <option value="">Select Group Type</option>
              <option value="logical">Logical</option>
              <option value="physical">Physical</option>
            </select>
          </div>
          <div className="form-group">
            <label>Department:</label>
            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleInputChange}
              className="select-style"
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>{department.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Function:</label>
            <select
              name="function_id"
              value={formData.function_id}
              onChange={handleInputChange}
              className="select-style"
            >
              <option value="">Select Function</option>
              {functions.map((func) => (
                <option key={func.id} value={func.id}>{func.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Project:</label>
            <input
              type="text"
              name="project"
              value={formData.project}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Auto Assign:</label>
            <input
              type="checkbox"
              name="auto_assign"
              checked={formData.auto_assign}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Photo:</label>
            <input
              type="file"
              name="photo"
              onChange={handleInputChange}
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </PageContainer>
  );
};

export default AddGroup;
