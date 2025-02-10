"use client"

import React, { useEffect, useState } from 'react';
import { getRequestHistory } from "@/services/services"; // Importez la fonction getRequestHistory

const ServicesHistoryPage = () => {
    const [history, setHistory] = useState<any[]>([]); // État pour stocker les historiques
    const [loading, setLoading] = useState<boolean>(true); // État pour gérer le chargement
    const [error, setError] = useState<string | null>(null); // État pour gérer les erreurs

    // Fonction pour récupérer l'historique
    const fetchHistory = async () => {
        try {
            setLoading(true);
            const requestId = "12345"; // Remplacez par l'ID de la demande de service ou récupérez-le dynamiquement
            const data = await getRequestHistory(requestId); // Appel de la fonction getRequestHistory
            setHistory(data); // Mettre à jour l'état avec les données reçues
        } catch (err) {
            console.error("Erreur lors de la récupération de l'historique :", err);
            setError("Erreur lors de la récupération de l'historique. Veuillez réessayer.");
        } finally {
            setLoading(false); // Arrêter le chargement
        }
    };

    // Utiliser useEffect pour appeler fetchHistory au chargement de la page
    useEffect(() => {
        fetchHistory();
    }, []);

    // Afficher un message de chargement
    if (loading) {
        return <div>Chargement en cours...</div>;
    }

    // Afficher un message d'erreur
    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    // Afficher la liste des historiques
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Historique des demandes de service</h1>
            {history.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f4f4f4' }}>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Événement</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Détails</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.date}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.event}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.details}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun historique disponible.</p>
            )}
        </div>
    );
};

export default ServicesHistoryPage;