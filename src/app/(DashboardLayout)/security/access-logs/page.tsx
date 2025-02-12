'use client';
import React, { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

const Addecurity = () => {
  const [formData, setFormData] = useState({
    name: '',
    procedure_type: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/security/active_security_procedures/', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'X-CSRFTOKEN': 'DP2NG6jMgJWbnx6DhkTvzeMv49S9MoMhG85pLFcui2T7lqzWbAYlYHGzDVKQwdcT', // Replace with actual CSRF token if needed
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data?.success) {
        setMessage('Procédure de sécurité ajoutée avec succès!');
        setFormData({
          name: '',
          procedure_type: '',
        });
      } else {
        setError(data?.message || 'Erreur inconnue');
      }
    } catch (err) {
      setError('Erreur lors de l\'ajout de la procédure de sécurité');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div style={{ padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#0056b3', fontWeight: 'bold' }}>Ajouter une Procédure de Sécurité</h1>
        </div>

        {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nom de la procédure"
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #026549' }}
            />
            <input
              type="text"
              name="procedure_type"
              value={formData.procedure_type}
              onChange={handleChange}
              placeholder="Type de la procédure"
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #026549' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#026549',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            {loading ? 'Chargement...' : <><FaSave /> Ajouter Procédure</>}
          </button>
        </form>
      </div>
    </PageContainer>
  );
};

export default Addecurity;
