import React from 'react';
import '../src/styles/styles.css';

import ContributeSection from './components/ContributeSection.jsx';
import MeditationFeatures from './components/FeatureSection.jsx';

function App() {

  return (
    <div>
      <MeditationFeatures />
      <ContributeSection />
    </div>
  );
}

export default App;