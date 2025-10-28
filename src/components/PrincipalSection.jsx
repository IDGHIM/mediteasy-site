import React from 'react';

export default function MediteasyPresentation() {
  return (
    <div className="mediteasy-container">
      <div className="mediteasy-content">
        {/* En-tête */}
        <div className="mediteasy-header">
          <div className="mediteasy-icon">
            <span>🧘</span>
          </div>
          <h1 className="mediteasy-title">Méditeasy</h1>
          <p className="mediteasy-subtitle">
            Une application mobile de méditation pour accompagner votre pratique quotidienne. Open source et gratuite !
          </p>
        </div>

        {/* Description du projet */}
        <div className="mediteasy-card">
          <h2 className="mediteasy-section-title">À propos du projet</h2>
          <p className="mediteasy-description">
            Méditeasy est une application mobile de méditation guidée construite avec Ionic. Elle offre des timers personnalisables, 
            des sons de fond apaisants et un suivi de progression pour vous aider à maintenir une routine de méditation régulière. 
            Compatible iOS et Android, l'application est actuellement en développement actif.
          </p>
        </div>

        {/* Liens de téléchargement et GitHub */}
        <div className="mediteasy-links">
          <a 
            href="https://github.com/OlivierF47/mediteasy/releases" 
            target="_blank"
            rel="noopener noreferrer"
            className="mediteasy-link-card mediteasy-link-download"
          >
            <div className="mediteasy-link-header">
              <span className="mediteasy-link-icon">📥</span>
              <span className="mediteasy-link-badge">APK</span>
            </div>
            <h3 className="mediteasy-link-title">Télécharger l'APK</h3>
            <p className="mediteasy-link-desc">
              Installez Méditeasy sur votre appareil Android
            </p>
          </a>

          <a 
            href="https://github.com/OlivierF47/mediteasy" 
            target="_blank"
            rel="noopener noreferrer"
            className="mediteasy-link-card mediteasy-link-github"
          >
            <div className="mediteasy-link-header">
              <span className="mediteasy-link-icon">💻</span>
              <span className="mediteasy-link-badge">Open Source</span>
            </div>
            <h3 className="mediteasy-link-title">Voir sur GitHub</h3>
            <p className="mediteasy-link-desc">
              Explorez le code source et contribuez au projet
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}