import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConflictoProvider } from './context/ConflictoContext';
import PersonaUno from './components/PersonaUno';
import PersonaDos from './components/PersonaDos';
import Resultado from './components/Resultado';
import Portada from './components/Portada';

function App() {
  return (
    <ConflictoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Portada />} />
          <Route path="/persona-uno" element={<PersonaUno />} />
          <Route path="/persona-dos" element={<PersonaDos />} />
          <Route path="/resultado" element={<Resultado />} />
        </Routes>
      </Router>
    </ConflictoProvider>
  );
}

export default App;
















































