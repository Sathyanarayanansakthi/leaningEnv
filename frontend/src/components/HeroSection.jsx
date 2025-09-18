// src/components/HeroSection.jsx
import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';  // <-- import useNavigate

const HeroSection = () => {
  const navigate = useNavigate();  // <-- initialize navigate function

  return (
    <Box sx={{ py: 10, bgcolor: 'background.paper', color: 'text.primary' }}>
      <Container>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Master Any Language in <span style={{ color: '#1976d2' }}>7 Days</span>
        </Typography>
        <Typography variant="h6" gutterBottom>
          Join 15,000+ learners. Win prizes. Unlock fluency.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          sx={{ mt: 4 }}
          onClick={() => navigate('/signup')}  // <-- navigate on click
        >
          🚀 Join Challenge for $7
        </Button>
        <Box sx={{ display: 'flex', gap: 4, mt: 5, flexWrap: 'wrap' }}>
          <Box display="flex" alignItems="center" gap={1}>
            <LockIcon color="action" />
            <Typography>Secure Stripe Checkout</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <PeopleIcon color="action" />
            <Typography>15,000+ Active Learners</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
