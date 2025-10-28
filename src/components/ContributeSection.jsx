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

  // Charger les contributions au démarrage
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
      <div>
        <div>
          <Loader style={{ animation: 'spin 1s linear infinite', marginRight: '8px' }} />
          Chargement des contributions...
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Comment contribuer ?</h2>
      
      <div>
        ⚠️ Les contributions sont partagées avec tous les utilisateurs de cette page
      </div>
      
      {!selectedType && (
        <div>
          {contributions.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                onClick={() => setSelectedType(item.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div >
                  <div >
                    <Icon style={{ width: '32px', height: '32px', color: '#2563eb' }} />
                  </div>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      )}

      {selectedType && (
        <form onSubmit={handleSubmit}>
          <h3>
            {contributions.find(c => c.id === selectedType)?.title}
          </h3>
          
          <input
            type="text"
            placeholder="Titre"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          
          <textarea
            placeholder="Description détaillée"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
          
          <div>
            <button 
              type="submit"
              onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
            >
              <Send size={18} />
              Soumettre
            </button>
            <button 
              type="button"
              onClick={() => {
                setSelectedType(null);
                setFormData({ title: '', description: '' });
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      {submissions.length > 0 && (
        <div>
          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>
            Contributions soumises ({submissions.length})
          </h3>
          <div>
            {submissions.map((sub) => (
              <div key={sub.id}>
                <div >
                  <span>
                    {contributions.find(c => c.id === sub.type)?.title}
                  </span>
                  <span>{sub.date}</span>
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