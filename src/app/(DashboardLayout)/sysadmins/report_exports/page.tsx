'use client';
import React, { useState, useEffect, useCallback } from 'react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { FaDownload, FaTrashAlt } from 'react-icons/fa';
import './ReportExports.css';

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
  const reportsPerPage = 5;

  const fetchReports = useCallback(async () => {
    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/sysadmins/report_exports/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
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
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet export de rapport ?')) return;

    try {
      const response = await fetch(`https://www.backend.lnb-intranet.globalitnet.org/sysadmins/report_exports/${reportId}/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
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

  const downloadCSV = () => {
    const csvContent = [
      ['ID', 'Format', 'Planifié', 'Exporté', 'Fichier'].join(','), // En-tête
      ...reports.map(report => [
        report.id,
        report.format,
        report.scheduled_at || 'Non planifié',
        report.exported_at || 'Non exporté',
        report.file || 'Aucun fichier',
      ].join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exports_rapports.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Gestion de la pagination
  const totalPages = Math.ceil(reports.length / reportsPerPage) || 1;
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <PageContainer>
      <div className="page-container">
        <h1 className="page-title">Exports de Rapports</h1>

        <div className="download-csv">
          <button className="download-btn" onClick={downloadCSV}>
            <FaDownload /> Télécharger CSV
          </button>
        </div>

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
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', fontStyle: 'italic' }}>Chargement...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', color: 'red' }}>Erreur: {error}</td>
              </tr>
            ) : reports.length > 0 ? (
              currentReports.map(report => (
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
              ))
            ) : (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td colSpan={5} style={{ textAlign: 'center', color: '#999' }}>Données en attente...</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1} className="pagination-btn">
            Précédent
          </button>
          <span>Page {currentPage} / {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages} className="pagination-btn">
            Suivant
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

export default ReportExportsList;
