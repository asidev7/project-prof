'use client';
import React, { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

const UserAddUser = () => {
  const [formData, setFormData] = useState({
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
  });

  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Récupérer les rôles disponibles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/roles/list-roles/');
        const data = await response.json();
        if (data?.roles) {
          setRoles(data.roles);
        }
      } catch (err) {
        setError('Erreur lors de la récupération des rôles');
      }
    };
    fetchRoles();
  }, []);

  // Gérer les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gérer l'envoi du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/utilisateurs/inscription/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data?.success) {
        setMessage('Utilisateur ajouté avec succès!');
        setFormData({
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
        });
      } else {
        setError(data?.message || 'Erreur inconnue');
      }
    } catch (err) {
      setError('Erreur lors de l\'ajout de l\'utilisateur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div style={{ padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#0056b3', fontWeight: 'bold' }}>Ajouter un Utilisateur</h1>
        </div>

        {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Nom"
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #007bff' }}
            />
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              placeholder="Prénom"
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #007bff' }}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #007bff' }}
            />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nom d'utilisateur"
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #007bff' }}
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #007bff' }}
            >
              <option value="">Sélectionner un rôle</option>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="Téléphone"
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #007bff' }}
            />
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              placeholder="Adresse"
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #007bff' }}
            />
            <input
              type="date"
              name="date_naissance"
              value={formData.date_naissance}
              onChange={handleChange}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #007bff' }}
            />
            <input
              type="text"
              name="lieu_naissance"
              value={formData.lieu_naissance}
              onChange={handleChange}
              placeholder="Lieu de naissance"
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #007bff' }}
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mot de passe"
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #007bff' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            {loading ? 'Chargement...' : <><FaSave /> Ajouter Utilisateur</>}
          </button>
        </form>
      </div>
    </PageContainer>
  );
};

export default UserAddUser;
