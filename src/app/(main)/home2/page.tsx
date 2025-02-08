'use client';

import React from 'react';
import Navbar from "../components/Navbar";  // Assurez-vous que le chemin est correct
import Footer from "../components/Footer";  // Import du composant Footer
import 'bootstrap/dist/css/bootstrap.min.css';  // Import de Bootstrap

const IntranetLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light font-['Roboto']">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow-1 d-flex flex-column flex-lg-row" style={{ marginTop: '5rem' }}>
        {/* Sidebar */}
        <nav className="bg-white shadow-lg p-4 p-lg-5 flex-grow-0 flex-shrink-0">
          <div className="d-flex flex-column gap-3">
            {[
              'Annonces',
              'Documents et Ressources',
              'Applications',
              'Statistiques',
              'Communauté et Collaborations',
              'Services et Outils',
              'Multimédia',
              'Support IT'
            ].map((item) => (
              <button
                key={item}
                className="btn btn-success text-black w-100 text-left px-3 py-2 rounded-3"
                style={{ backgroundColor: '#28a745' }}  // Couleur verte
              >
                {item}
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-grow-1 p-4 p-lg-5 bg-light d-flex justify-content-center align-items-center">
          <div className="text-center">
            <h1 className="display-4 font-weight-bold text-dark mb-4">
              Bienvenue sur l&apos;intranet de la Loterie
              <br />
              Nationale du Bénin
            </h1>
            <p className="lead text-secondary">
              Accédez à toutes les ressources et informations essentielles de la Loterie Nationale du Bénin
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default IntranetLayout;
