'use client';

import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { getServices } from '@/services/services';
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
        // Suppression fictive, adapter selon API
        setServices(services.filter(service => service.id !== serviceId));
        alert("Service supprimé avec succès!");
      } catch (err) {
        setError("Erreur lors de la suppression du service.");
      }
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
                  <FaEdit onClick={() => alert(`Modifier le service: ${service.name}`)} className="edit-icon" />
                  <FaTrashAlt onClick={() => handleDeleteService(service.id)} className="delete-icon" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
};

export default ServicesListPage;
