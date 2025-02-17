'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';

const AddPermissionPage = () => {
  const router = useRouter();
  const [newPermission, setNewPermission] = useState({
    name: '',
    description: '',
    level: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPermission.name || !newPermission.level) {
      setError('Les champs Nom et Niveau sont obligatoires');
      return;
    }
    
    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/roles/create-permission/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPermission),
      });

      if (response.ok) {
        router.push('/users/permissions'); // Redirection après succès
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Erreur lors de la création");
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    }
  };

  return (
    <PageContainer>
      <div className="form-container">
        <h1 className="form-title">Ajouter une Permission</h1>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom *</label>
            <input
              type="text"
              id="name"
              value={newPermission.name}
              onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={newPermission.description}
              onChange={(e) => setNewPermission({ ...newPermission, description: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="level">Niveau *</label>
            <select
              id="level"
              value={newPermission.level}
              onChange={(e) => setNewPermission({ ...newPermission, level: e.target.value })}
              required
            >
              <option value="">Sélectionnez un niveau</option>
              <option value="admin">Administrateur</option>
              <option value="read">Lecture seule</option>
              <option value="write">Écriture</option>
            </select>
          </div>

          <div className="button-group">
            <button type="submit" className="btn-submit">
              <FaPlus /> Créer la Permission
            </button>
            <button type="button" className="btn-cancel" onClick={() => router.back()}>
              Annuler
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .form-container {
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .form-title {
          color: #2c3e50;
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        input, textarea, select {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }

        .button-group {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
        }

        .btn-submit {
          background: #026549;
          color: white;
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-cancel {
          background: #dc3545;
          color: white;
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .error-message {
          color: #dc3545;
          padding: 1rem;
          margin-bottom: 1rem;
          background: #f8d7da;
          border-radius: 4px;
        }
      `}</style>
    </PageContainer>
  );
};

export default AddPermissionPage;