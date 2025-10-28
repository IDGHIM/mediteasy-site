import React from 'react';
import '../src/styles/styles.css';

import ContributeSection from './components/ContributeSection.jsx';
import MeditationFeatures from './components/FeatureSection.jsx';
import Footer from './components/Footer.jsx'

function App() {

  return (
    <div>
      <MeditationFeatures />
      <ContributeSection />
      <Footer />
    </div>
  );
}

export default App;