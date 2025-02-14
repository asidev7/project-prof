'use client';

import React, { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import './AddUser.css';

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  username: string;
  role: string;
  telephone: string;
  adresse: {
    city: string;
    country: string;
  };
  date_naissance: string;
  lieu_naissance: string;
  password: string;
}

interface Role {
  id: number;
  name: string;
}

const UserAddUser = () => {
  const initialFormData: FormData = {
    nom: '',
    prenom: '',
    email: '',
    username: '',
    role: '',
    telephone: '',
    adresse: { city: '', country: '' },
    date_naissance: '',
    lieu_naissance: '',
    password: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
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
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('adresse.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        adresse: { ...prev.adresse, [field]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setValidationErrors(prev => ({ ...prev, [name]: undefined }));
  };

  // Modification de la fonction formatDate pour s'assurer que le format est yyyy-dd-mm
  const formatDate = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${year}-${day.padStart(2, '0')}-${month.padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const formattedData = {
      ...formData,
      date_naissance: formatDate(formData.date_naissance),
    };

    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/utilisateurs/inscription/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur ${response.status}`);
      }

      setMessage('Utilisateur ajouté avec succès!');
      setFormData(initialFormData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'ajout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-gray-800 font-bold text-2xl mb-6">Ajouter un Utilisateur</h1>

        {message && <div className="p-4 mb-4 text-green-700 bg-green-100 rounded">{message}</div>}
        {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Nom"
              required
              className="w-full p-3 border rounded"
            />
          </div>

          <div className="space-y-1">
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              placeholder="Prénom"
              required
              className="w-full p-3 border rounded"
            />
          </div>

          <div className="space-y-1">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-3 border rounded"
            />
          </div>

          <div className="space-y-1">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nom d'utilisateur"
              required
              className="w-full p-3 border rounded"
            />
          </div>

          <div className="space-y-1">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
            >
              <option value="">Sélectionner un rôle</option>
              {roles.map(role => (
                <option key={role.id} value={role.name}>{role.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="Téléphone"
              className="w-full p-3 border rounded"
            />
          </div>

          <div className="space-y-1">
            <input
              type="text"
              name="adresse.city"
              value={formData.adresse.city}
              onChange={handleChange}
              placeholder="Ville"
              required
              className="w-full p-3 border rounded"
            />
          </div>

          <div className="space-y-1">
            <input
              type="text"
              name="adresse.country"
              value={formData.adresse.country}
              onChange={handleChange}
              placeholder="Pays"
              required
              className="w-full p-3 border rounded"
            />
          </div>

          <div className="space-y-1">
            <input
              type="date"
              name="date_naissance"
              value={formData.date_naissance}
              onChange={handleChange}
              placeholder="Date de naissance"
              required
              className="w-full p-3 border rounded"
            />
          </div>

          <div className="space-y-1">
            <input
              type="text"
              name="lieu_naissance"
              value={formData.lieu_naissance}
              onChange={handleChange}
              placeholder="Lieu de naissance"
              required
              className="w-full p-3 border rounded"
            />
          </div>

          <div className="space-y-1">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mot de passe"
              required
              className="w-full p-3 border rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? 'Chargement...' : <><FaSave /> Ajouter Utilisateur</>}
          </button>
        </form>
      </div>
    </PageContainer>
  );
};

export default UserAddUser;
