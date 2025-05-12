import React from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useConflicto } from '../context/ConflictoContext';

const PersonaUno = () => {
  const { nombre1, setNombre1, version1, setVersion1 } = useConflicto();
  const navigate = useNavigate();

  const handleContinuar = () => {
    if (nombre1 && version1) {
      navigate('/persona-dos');
    }
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
            value={nombre1}
            onChange={(e) => setNombre1(e.target.value)}
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
            value={version1}
            onChange={(e) => setVersion1(e.target.value)}
            sx={{ mt: 1 }}
          />
        </Box>

        <Button
          variant="contained"
          onClick={handleContinuar}
          fullWidth
          sx={{
            mt: 3,
            backgroundColor: '#7bc6a4',
            '&:hover': {
              backgroundColor: '#6bb08f',
            },
          }}
        >
          Continuar
        </Button>
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

export default PersonaUno;

