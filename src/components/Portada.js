import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

const Portada = () => {
  const navigate = useNavigate();
  const cuencoRef = useRef(null);
  const respirarRef = useRef(null);
  const stopTimeoutRef = useRef(null);

  useEffect(() => {
    const cuenco = cuencoRef.current;
    const respirar = respirarRef.current;

    cuenco.play();
    respirar.play();

    // Detener ambos sonidos después de 10 segundos
    stopTimeoutRef.current = setTimeout(() => {
      cuenco.pause();
      respirar.pause();
      cuenco.currentTime = 0;
      respirar.currentTime = 0;
    }, 10000); // 10 segundos

    // Limpiar el timeout si el componente se desmonta
    return () => clearTimeout(stopTimeoutRef.current);
  }, []);

  const handleStart = () => {
    clearTimeout(stopTimeoutRef.current);
    if (cuencoRef.current && respirarRef.current) {
      cuencoRef.current.pause();
      respirarRef.current.pause();
      cuencoRef.current.currentTime = 0;
      respirarRef.current.currentTime = 0;
    }
    navigate('/persona-uno');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Espirales animados */}
      {[...Array(5)].map((_, i) => (
  <Box
    key={i}
    sx={{
      position: 'absolute',
      width: `${160 + i * 80}px`,
      height: `${160 + i * 80}px`,
      border: '2px solid rgba(123, 198, 164, 0.3)',
      borderRadius: '50%',
      opacity: 0.4 + i * 0.1,
      animation: `spin ${40 + i * 20}s linear infinite, breathe ${8 + i * 2}s ease-in-out infinite`,
      zIndex: 0,
    }}
  />
))}

      <Typography
        variant="h2"
        sx={{
          zIndex: 1,
          fontWeight: 'bold',
          color: '#7bc6a4',
          animation: 'fadeIn 3s ease-out forwards',
        }}
      >
        Respira
      </Typography>

      <Button
        onClick={handleStart}
        variant="contained"
        color="success"
        size="large"
        sx={{ mt: 6, zIndex: 1 }}
      >
        Comenzar
      </Button>

      <audio ref={cuencoRef} src="/Cuenco.mp3" />
      <audio ref={respirarRef} src="/Respirar.mp3" />

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes breathe {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </Box>
  );
};

export default Portada;


