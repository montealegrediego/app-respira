import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useConflicto } from '../context/ConflictoContext';
import { motion } from 'framer-motion';

const Resultado = () => {
  const {
    sintesis,
    consejos,
    cierre,
    version1,
    version2,
    nombre1,
    nombre2,
    setSintesis,
    setConsejos,
    setCierre
  } = useConflicto();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNuevoAnalisis = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/analizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre1, version1, nombre2, version2 })
      });

      const data = await response.json();
      setSintesis(data.sintesis);
      setConsejos(data.consejos);
      setCierre(data.cierre);
    } catch (error) {
      console.error('Error al rehacer el análisis:', error);
    }

    setLoading(false);
  };

  const handleReiniciar = () => {
    setSintesis('');
    setConsejos('');
    setCierre('');
    navigate('/');
  };

  if (!sintesis && !consejos && !cierre) {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h6" align="center">
          Cargando análisis del conflicto...
        </Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#f4fef8',
        display: 'flex',
        justifyContent: 'center',
        py: 8,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ width: '100%' }}
        >
          <Paper
            elevation={3}
            sx={{
              maxWidth: 900,
              width: '100%',
              p: { xs: 3, sm: 4 },
              borderRadius: 4,
              backgroundColor: 'white',
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ color: '#7bc6a4', fontWeight: 'bold', mb: 4 }}
            >
              Vamos a resolver esto juntos
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ mb: 1 }}>Síntesis del conflicto</Typography>
              <Typography variant="body1">
                <ReactMarkdown>{sintesis}</ReactMarkdown>
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ mb: 1 }}>Consejos para resolverlo</Typography>
              <Typography variant="body1">
                <ReactMarkdown>{consejos}</ReactMarkdown>
              </Typography>
            </Box>

            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ mb: 1 }}>Para llevar en el corazón</Typography>
              <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                <ReactMarkdown>{cierre}</ReactMarkdown>
              </Typography>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                  mt: 3,
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleNuevoAnalisis}
                  sx={{
                    backgroundColor: '#7bc6a4',
                    '&:hover': { backgroundColor: '#6bb08f' }
                  }}
                >
                  Nuevo análisis
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={handleReiniciar}
                >
                  Empezar de nuevo
                </Button>
              </Box>
            )}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Resultado;








