'use client';
import React, { useState, useEffect } from 'react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import './StatisticsList.css';

interface Statistic {
  id: number;
  metric_name: string;
  value: number;
  timestamp: string;
}

const API_URL = 'https://www.backend.lnb-intranet.globalitnet.org/sysadmins/statistics/';

const StatisticsList = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingStat, setEditingStat] = useState<Statistic | null>(null);
  const [metricName, setMetricName] = useState<string>('');
  const [value, setValue] = useState<number>(0);

  // Charger les statistiques
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setStatistics(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Ouvrir la modale pour ajouter ou modifier
  const openModal = (stat?: Statistic) => {
    if (stat) {
      setEditingStat(stat);
      setMetricName(stat.metric_name);
      setValue(stat.value);
    } else {
      setEditingStat(null);
      setMetricName('');
      setValue(0);
    }
    setModalOpen(true);
  };

  // Fermer la modale
  const closeModal = () => setModalOpen(false);

  // Ajouter ou modifier une statistique
  const handleSubmit = async () => {
    const method = editingStat ? 'PUT' : 'POST';
    const url = editingStat ? `${API_URL}${editingStat.id}/` : API_URL;
    const body = JSON.stringify({ metric_name: metricName, value });

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      if (!response.ok) throw new Error('Échec de l\'opération');

      const newStat = await response.json();
      setStatistics(prev =>
        editingStat ? prev.map(s => (s.id === newStat.id ? newStat : s)) : [...prev, newStat]
      );
      closeModal();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de l\'opération');
    }
  };

  // Supprimer une statistique
  const handleDelete = async (id: number) => {
    if (!confirm('Voulez-vous vraiment supprimer cette statistique ?')) return;

    try {
      const response = await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Suppression échouée');

      setStatistics(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression');
    }
  };

  if (loading) return <div>Chargement des statistiques...</div>;
  if (error) return <div style={{ color: 'red' }}>Erreur: {error}</div>;

  return (
    <PageContainer>
      <div className="page-container">
        <h1 className="page-title">Liste des Statistiques</h1>
        <button className="add-btn" onClick={() => openModal()}>+ Ajouter</button>

        <table className="statistics-table">
          <thead>
            <tr>
              <th>Nom de la métrique</th>
              <th>Valeur</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {statistics.length > 0 ? (
              statistics.map(stat => (
                <tr key={stat.id}>
                  <td>{stat.metric_name}</td>
                  <td>{stat.value}</td>
                  <td>
                    <button className="edit-btn" onClick={() => openModal(stat)}>✏️ Modifier</button>
                    <button className="delete-btn" onClick={() => handleDelete(stat.id)}>🗑️ Supprimer</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="no-data">Aucune statistique disponible.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingStat ? 'Modifier' : 'Ajouter'} une Statistique</h2>
            <input
              type="text"
              placeholder="Nom de la métrique"
              value={metricName}
              onChange={e => setMetricName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Valeur"
              value={value}
              onChange={e => setValue(Number(e.target.value))}
            />
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSubmit}>💾 Enregistrer</button>
              <button className="close-btn" onClick={closeModal}>❌ Annuler</button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default StatisticsList;
