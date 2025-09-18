// src/components/HowItWorksSection.jsx
import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';

const HowItWorksSection = () => {
  const steps = [
    ['💳', 'Pay $7', 'Secure your entry via Stripe'],
    ['🎓', 'Unlock Access', 'Start learning immediately'],
    ['📤', 'Submit Videos', 'Upload daily challenge progress'],
    ['🔗', 'Refer & Earn', 'Share and gain more entries'],
    ['🏆', 'Win Big', 'Top performers win cash & prizes'],
  ];

  return (
    <Box sx={{ py: 10, bgcolor: 'grey.100' }}>
      <Container>
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          How It Works
        </Typography>
        <Grid container spacing={4} mt={4}>
          {steps.map(([icon, title, desc], i) => (
            <Grid item xs={12} md={2.4} key={i}>
              <Paper elevation={3} sx={{ p: 3, textAlign: 'center', borderRadius: 3 }}>
                <Typography variant="h3">{icon}</Typography>
                <Typography variant="h6" fontWeight="bold" mt={2}>
                  {title}
                </Typography>
                <Typography color="text.secondary">{desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;
