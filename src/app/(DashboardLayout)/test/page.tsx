'use client';

import React, { useState } from 'react';

const AddRole = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parent_role_id: 0,
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
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/roles/create-role/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...formData, parent_role_id: Number(formData.parent_role_id) }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur ${response.status}`);
      }

      setMessage('Rôle ajouté avec succès!');
      setFormData({ name: '', description: '', parent_role_id: 0 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'ajout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Ajouter un Rôle</h2>

      {message && <div className="p-2 mb-3 text-green-700 bg-green-200 rounded">{message}</div>}
      {error && <div className="p-2 mb-3 text-red-700 bg-red-200 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nom du rôle"
          required
          className="w-full p-3 border rounded"
        />

        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full p-3 border rounded"
        />

        <input
          type="number"
          name="parent_role_id"
          value={formData.parent_role_id}
          onChange={handleChange}
          placeholder="ID du rôle parent (0 si aucun)"
          className="w-full p-3 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading ? 'Ajout en cours...' : 'Ajouter Rôle'}
        </button>
      </form>
    </div>
  );
};

export default AddRole;
