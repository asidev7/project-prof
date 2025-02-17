'use client';
import React, { useState, useEffect, useCallback } from 'react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { FaDownload, FaTrashAlt } from 'react-icons/fa';

interface ReportExport {
  id: number;
  format: string;
  scheduled_at?: string;
  exported_at?: string;
  file?: string;
  report: number;
}

const ReportExportsList = () => {
  const [reports, setReports] = useState<ReportExport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [reportsPerPage, setReportsPerPage] = useState<number>(5);

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

  const fetchReports = useCallback(async () => {
    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/sysadmins/report_exports/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      setReports(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleDeleteReport = async (reportId: number) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cet export de rapport ?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://www.backend.lnb-intranet.globalitnet.org/sysadmins/report_exports/${reportId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      setReports(reports.filter(report => report.id !== reportId));
      alert('Export supprimé avec succès!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  };

  if (loading) {
    return <div>Chargement des exports...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Erreur: {error}</div>;
  }

  return (
    <PageContainer>
      <div className="page-container">
        <h1 className="page-title">Exports de Rapports</h1>

        <table className="report-table">
          <thead>
            <tr>
              <th>Format</th>
              <th>Planifié</th>
              <th>Exporté</th>
              <th>Fichier</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentReports.map((report) => (
              <tr key={report.id}>
                <td>{report.format}</td>
                <td>{report.scheduled_at || 'Non planifié'}</td>
                <td>{report.exported_at || 'Non exporté'}</td>
                <td>
                  {report.file ? (
                    <a href={report.file} target="_blank" rel="noopener noreferrer">
                      <FaDownload className="download-icon" />
                    </a>
                  ) : (
                    'Aucun fichier'
                  )}
                </td>
                <td className="actions">
                  <FaTrashAlt onClick={() => handleDeleteReport(report.id)} className="delete-icon" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
};

export default ReportExportsList;
