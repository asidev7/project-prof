'use client';

import React, { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { getCSRFToken } from '@/utils/csrf';
import './AddUser.css';

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  username: string;
  role: string;
  telephone: string;
  adresse: string;
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
    adresse: '',
    date_naissance: '',
    lieu_naissance: '',
    password: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    // Récupérer le CSRF token depuis le cookie
    const fetchCsrfToken = () => {
      const token = getCSRFToken();
      if (token) {
        setCsrfToken(token);
      } else {
        setError('Le token CSRF est introuvable');
      }
    };

    fetchCsrfToken();

    // Charger la liste des rôles
    const fetchRoles = async () => {
      try {
        const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/roles/list-roles/', {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          credentials: 'include',
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setRoles(data.roles || []);
      } catch (err) {
        setError('Erreur lors de la récupération des rôles.');
      }
    };

    fetchRoles();
  }, []);

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};
    if (formData.nom.length < 2) errors.nom = 'Le nom doit contenir au moins 2 caractères';
    if (formData.prenom.length < 2) errors.prenom = 'Le prénom doit contenir au moins 2 caractères';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) errors.email = 'Email invalide';
    if (formData.password.length < 8) errors.password = 'Mot de passe trop court';
    if (formData.telephone && formData.telephone.length < 10) errors.telephone = 'Numéro de téléphone invalide';
    if (!formData.date_naissance) errors.date_naissance = 'La date de naissance est requise';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setValidationErrors(prev => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérification du CSRF token avant de soumettre le formulaire
    if (!csrfToken) {
      setError('Le token CSRF est manquant');
      return;
    }

    if (!validateForm()) {
      setError('Veuillez corriger les erreurs.');
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/utilisateurs/inscription/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRFToken': csrfToken,  // Assurez-vous que le CSRF Token est bien inclus
          'Referer': 'https://www.backend.lnb-intranet.globalitnet.org/'  ,  // Ajouter l'URL referer
  
        },
        credentials: 'include', // Envoi des cookies avec la requête
        body: JSON.stringify(formData),
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
      <div className="p-6 bg-blue-50 rounded-lg">
        <h1 className="text-blue-700 font-bold text-2xl mb-6">Ajouter un Utilisateur</h1>

        {message && <div className="p-4 mb-4 text-green-700 bg-green-100 rounded">{message}</div>}
        {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="space-y-1">
              {key === 'role' ? (
                <select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-blue-400 rounded focus:border-blue-600"
                >
                  <option value="">Sélectionner un rôle</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.name}>{role.name}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={key === 'password' ? 'password' : key === 'email' ? 'email' : key === 'date_naissance' ? 'date' : 'text'}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={key.replace('_', ' ')}
                  required
                  className="w-full p-3 border border-blue-400 rounded focus:border-blue-600"
                />
              )}
              {validationErrors[key as keyof FormData] && (
                <p className="text-red-500 text-sm">{validationErrors[key as keyof FormData]}</p>
              )}
            </div>
          ))}

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
