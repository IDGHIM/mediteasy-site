import React from 'react';

export default function MeditationFeatures() {
  const features = [
    {
      emoji: '⏱️',
      title: 'Compte à rebours',
      description: 'Un compte à rebours de 3 secondes pour vous préparer avant le début de votre méditation'
    },
    {
      emoji: '🎵',
      title: 'Sons d\'ambiance',
      description: 'Choisissez parmi une sélection de sons apaisants : pluie, océan, oiseaux, flûte... ou ajoutez vos propres sons personnalisés'
    },
    {
      emoji: '🔔',
      title: 'Gongs de méditation',
      description: 'Sélectionnez votre gong préféré (japonais, zen, bol tibétain, cristal) et programmez des intervalles pour rythmer votre pratique'
    },
    {
      emoji: '⏳',
      title: 'Timer personnalisable',
      description: 'Choisissez la durée de votre méditation de 5 à 180 minutes, avec des préréglages ou une durée sur mesure'
    }
  ];

  return (
     <div className="meditation-features-container">
      <h1>Fonctionnalités</h1>
      <p>Tout ce dont vous avez besoin pour une pratique de méditation sereine et personnalisée</p>
      
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <span className="feature-emoji">{feature.emoji}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}