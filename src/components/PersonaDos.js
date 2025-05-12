import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useConflicto } from '../context/ConflictoContext';

const PersonaDos = () => {
  const {
    nombre2, setNombre2,
    version2, setVersion2,
    nombre1, version1,
    setSintesis, setConsejos, setCierre
  } = useConflicto();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAnalizar = async () => {
    if (!nombre2 || !version2) return;

    setLoading(true);

    const response = await fetch('http://localhost:5000/analizar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre1, version1, nombre2, version2 })
    });

    const data = await response.json();

    setSintesis(data.sintesis);
    setConsejos(data.consejos);
    setCierre(data.cierre);

    setLoading(false);
    navigate('/resultado');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f4fef8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
        py: 6,
        animation: 'fadeIn 2s ease-in-out',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 600,
          width: '100%',
          p: 4,
          borderRadius: 4,
          backgroundColor: 'white',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: '#7bc6a4',
            fontWeight: 'bold',
            mb: 6,
            animation: 'slideIn 1.5s ease',
          }}
        >
          Vamos a resolver esto juntos
        </Typography>

        <Box sx={{ mb: 4, animation: 'fadeIn 2.5s ease' }}>
          <Typography variant="h6" gutterBottom>¿Cuál es tu nombre?</Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Tu nombre"
            value={nombre2}
            onChange={(e) => setNombre2(e.target.value)}
            sx={{ mt: 1 }}
          />
        </Box>

        <Box sx={{ mb: 4, animation: 'fadeIn 3s ease' }}>
          <Typography variant="h6" gutterBottom>Cuéntame tu perspectiva sobre lo ocurrido</Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="¿Cómo viviste esta situación?"
            value={version2}
            onChange={(e) => setVersion2(e.target.value)}
            sx={{ mt: 1 }}
          />
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Button
            variant="contained"
            fullWidth
            onClick={handleAnalizar}
            sx={{
              mt: 3,
              backgroundColor: '#7bc6a4',
              '&:hover': {
                backgroundColor: '#6bb08f',
              },
            }}
          >
            Analizar Conflicto
          </Button>
        )}
      </Paper>

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideIn {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
};

export default PersonaDos;


