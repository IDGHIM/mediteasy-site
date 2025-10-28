import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <h3>Mediteasy</h3>
            <p>Projet réalisé par Ichem DGHIM, Olivier FORABOSCO, Théo EVANNO</p>
          </div>
          <div className="footer-links">
            <h4>Technologies utilisées</h4>
            <div className="tech-badges">
              <span className="tech-badge">Ionic</span>
              <span className="tech-badge">TypeScript</span>
            </div>
          </div>
          <div className="footer-contact">
            <h4>Contact</h4>
            <p>Développeur Web Junior</p>
            <p>Basé à Agen, France</p>
            <p>Formation AFEC</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Mediteasy - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;