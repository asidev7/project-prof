'use client';

import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
<<<<<<< HEAD
import { getServices, deleteService, updateService } from '@/services/services';
=======
import { getServices, deleteService, updateService } from '@/services/services'; // Assurez-vous d'importer la fonction updateService
>>>>>>> 146a0c7 (Résolution des conflits)
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
<<<<<<< HEAD
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newName, setNewName] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
=======
  const [editingService, setEditingService] = useState<Service | null>(null); // État pour gérer l'édition du service
  const [updatedServiceData, setUpdatedServiceData] = useState({
    name: '',
    description: '',
  });
>>>>>>> 146a0c7 (Résolution des conflits)

  // Récupérer la liste des services au chargement de la page
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        setError('Erreur lors de la récupération des services.');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Gérer la suppression d'un service
  const handleDeleteService = async (serviceId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      try {
<<<<<<< HEAD
        await deleteService(serviceId);
        setServices(services.filter(service => service.id !== serviceId));
        alert("Service supprimé avec succès!");
=======
        await deleteService(serviceId.toString());
        setServices(services.filter((service) => service.id !== serviceId));
        alert('Service supprimé avec succès!');
>>>>>>> 146a0c7 (Résolution des conflits)
      } catch (err) {
        setError('Erreur lors de la suppression du service.');
      }
    }
  };

<<<<<<< HEAD
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

=======
  // Gérer l'édition d'un service
  const handleEditService = (service: Service) => {
    setEditingService(service); // Définir le service à éditer
    setUpdatedServiceData({ name: service.name, description: service.description }); // Pré-remplir le formulaire
  };

  // Gérer la mise à jour d'un service
  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      try {
        // Appeler la fonction updateService avec l'ID et les nouvelles données
        await updateService(editingService.id.toString(), updatedServiceData);

        // Mettre à jour la liste des services localement
        setServices(
          services.map((service) =>
            service.id === editingService.id ? { ...service, ...updatedServiceData } : service
          )
        );

        alert('Service mis à jour avec succès!');
        setEditingService(null); // Réinitialiser l'état d'édition
        setUpdatedServiceData({ name: '', description: '' }); // Réinitialiser les données du formulaire
      } catch (err) {
        setError('Erreur lors de la mise à jour du service.');
      }
    }
  };

  // Afficher un message de chargement
>>>>>>> 146a0c7 (Résolution des conflits)
  if (loading) return <div>Chargement des services...</div>;

  // Afficher une erreur si nécessaire
  if (error) return <div>Erreur: {error}</div>;

  return (
    <PageContainer>
      <div className="page-container">
        <h1 className="page-title">Liste des Services</h1>
<<<<<<< HEAD
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
=======

        {/* Formulaire de mise à jour du service */}
        {editingService && (
          <form onSubmit={handleUpdateService}>
            <h2>Modifier le Service</h2>
            <input
              type="text"
              value={updatedServiceData.name}
              onChange={(e) => setUpdatedServiceData({ ...updatedServiceData, name: e.target.value })}
              placeholder="Nom du service"
              required
            />
            <textarea
              value={updatedServiceData.description}
              onChange={(e) => setUpdatedServiceData({ ...updatedServiceData, description: e.target.value })}
              placeholder="Description du service"
              required
            />
            <button type="submit">Mettre à jour</button>
            <button type="button" onClick={() => setEditingService(null)}>
              Annuler
            </button>
          </form>
        )}

        {/* Tableau des services */}
        {!editingService && (
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
>>>>>>> 146a0c7 (Résolution des conflits)
        )}
      </div>
    </PageContainer>
  );
};

export default ServicesListPage;