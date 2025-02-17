'use client';

import React, { useState } from 'react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const AddPermission = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    level: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/roles/create-permission/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur ${response.status}`);
      }

      setMessage('Permission ajoutée avec succès!');
      setFormData({ name: '', description: '', level: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'ajout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <DashboardCard>
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Ajouter une Permission</h2>

          {message && <div className="p-2 mb-3 text-green-700 bg-green-200 rounded-md">{message}</div>}
          {error && <div className="p-2 mb-3 text-red-700 bg-red-200 rounded-md">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">Nom de la permission</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nom de la permission"
                required
                className="w-full p-4 bg-white border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-300 ease-in-out"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700 mb-2">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
                className="w-full p-4 bg-white border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-300 ease-in-out"
              />
            </div>

            <div>
              <label htmlFor="level" className="block text-gray-700 mb-2">Niveau de la permission</label>
              <input
                type="text"
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                placeholder="Niveau de la permission"
                required
                className="w-full p-4 bg-white border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-300 ease-in-out"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full p-4 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 disabled:bg-blue-400 transition duration-300 ease-in-out"
              >
                {loading ? 'Ajout en cours...' : 'Ajouter Permission'}
              </button>
            </div>
          </form>
        </div>
      </DashboardCard>
    </PageContainer>
  );
};

export default AddPermission;
