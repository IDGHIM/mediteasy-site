import React, { useState, useEffect } from 'react';
import { Bug, BookOpen, Plus, Send, Loader } from 'lucide-react';

export default function ContributeSection() {
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const contributions = [
    {
      id: 'bug',
      icon: Bug,
      title: "Report bug",
      description: "Signalez les bugs que vous rencontrez"
    },
    {
      id: 'doc',
      icon: BookOpen,
      title: "Documentation",
      description: "Améliorez la documentation"
    },
    {
      id: 'feature',
      icon: Plus,
      title: "Fonctionnalité à ajouter",
      description: "Proposez de nouvelles fonctionnalités"
    }
  ];

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const result = await window.storage.get('contributions', true);
      if (result) {
        setSubmissions(JSON.parse(result.value));
      }
    } catch (error) {
      console.log('Aucune contribution existante');
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      const newSubmission = {
        id: Date.now(),
        type: selectedType,
        ...formData,
        date: new Date().toLocaleDateString('fr-FR')
      };
      
      const updatedSubmissions = [newSubmission, ...submissions];
      
      try {
        await window.storage.set('contributions', JSON.stringify(updatedSubmissions), true);
        setSubmissions(updatedSubmissions);
        setFormData({ title: '', description: '' });
        setSelectedType(null);
      } catch (error) {
        alert('Erreur lors de la sauvegarde. Veuillez réessayer.');
      }
    }
  };

  if (loading) {
    return (
      <div className="contribute-container">
        <div className="contribute-loading">
          <Loader className="loader-spin" size={24} />
          Chargement des contributions...
        </div>
      </div>
    );
  }

  return (
    <div className="contribute-container">
      <h2>Comment contribuer ?</h2>
      
      <div className="contribute-warning">
        ⚠️ Les contributions sont partagées avec tous les utilisateurs de cette page
      </div>
      
      {!selectedType && (
        <div className="contribution-types-grid">
          {contributions.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                className="contribution-card"
                onClick={() => setSelectedType(item.id)}
              >
                <div className="contribution-icon-wrapper">
                  <Icon size={32} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      )}

      {selectedType && (
        <div className="contribution-form">
          <h3>
            {contributions.find(c => c.id === selectedType)?.title}
          </h3>
          
          <input
            type="text"
            placeholder="Titre"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="form-input"
          />
          
          <textarea
            placeholder="Description détaillée"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="form-textarea"
          />
          
          <div className="form-buttons">
            <button 
              className="btn-submit"
              onClick={handleSubmit}
            >
              <Send size={18} />
              Soumettre
            </button>
            <button 
              className="btn-cancel"
              onClick={() => {
                setSelectedType(null);
                setFormData({ title: '', description: '' });
              }}
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {submissions.length > 0 && (
        <div className="submissions-section">
          <h3 className="submissions-title">
            Contributions soumises ({submissions.length})
          </h3>
          <div className="submissions-list">
            {submissions.map((sub) => (
              <div key={sub.id} className="submission-item">
                <div className="submission-header">
                  <span className="submission-type-badge">
                    {contributions.find(c => c.id === sub.type)?.title}
                  </span>
                  <span className="submission-date">{sub.date}</span>
                </div>
                <h4>{sub.title}</h4>
                <p>{sub.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}        
    </div>
  );
}