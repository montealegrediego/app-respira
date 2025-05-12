import React, { createContext, useState, useContext } from 'react';

const ConflictoContext = createContext();

export const useConflicto = () => useContext(ConflictoContext);

export const ConflictoProvider = ({ children }) => {
  const [nombre1, setNombre1] = useState('');
  const [version1, setVersion1] = useState('');
  const [nombre2, setNombre2] = useState('');
  const [version2, setVersion2] = useState('');
  const [sintesis, setSintesis] = useState('');
  const [consejos, setConsejos] = useState('');
  const [cierre, setCierre] = useState('');

  return (
    <ConflictoContext.Provider value={{
      nombre1, setNombre1,
      version1, setVersion1,
      nombre2, setNombre2,
      version2, setVersion2,
      sintesis, setSintesis,
      consejos, setConsejos,
      cierre, setCierre
    }}>
      {children}
    </ConflictoContext.Provider>
  );
};


