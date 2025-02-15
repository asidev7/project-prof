'use client';

import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { getServices, deleteService, updateService } from '@/services/services';
import './ServicesList.css';

interface Service {
  id: number;
  name: string;
  description: string;
}

const ServicesListPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newName, setNewName] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        setError("Erreur lors de la récupération des services.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleDeleteService = async (serviceId: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) {
      try {
        await deleteService(serviceId);
        setServices(services.filter(service => service.id !== serviceId));
        alert("Service supprimé avec succès!");
      } catch (err) {
        setError("Erreur lors de la suppression du service.");
      }
    }
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setNewName(service.name);
    setNewDescription(service.description);
  };

  const handleUpdateService = async () => {
    if (!editingService) return;
    try {
      const updatedService = { ...editingService, name: newName, description: newDescription };
      await updateService(editingService.id, updatedService);
      setServices(services.map(service => (service.id === editingService.id ? updatedService : service)));
      setEditingService(null);
      alert("Service mis à jour avec succès!");
    } catch (err) {
      setError("Erreur lors de la mise à jour du service.");
    }
  };

  if (loading) return <div>Chargement des services...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <PageContainer>
      <div className="page-container">
        <h1 className="page-title">Liste des Services</h1>
        <table className="service-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td className="actions">
                  <FaEdit onClick={() => handleEditService(service)} className="edit-icon" />
                  <FaTrashAlt onClick={() => handleDeleteService(service.id)} className="delete-icon" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingService && (
          <div className="edit-form">
            <h2>Modifier le Service</h2>
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Nom du service" />
            <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Description du service" />
            <button onClick={handleUpdateService}>Mettre à jour</button>
            <button onClick={() => setEditingService(null)}>Annuler</button>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default ServicesListPage;
