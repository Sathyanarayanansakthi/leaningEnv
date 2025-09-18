// src/components/FinalCTA.jsx
import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

const FinalCTA = () => (
  <Box sx={{ py: 10, bgcolor: 'grey.100', color: 'text.primary', textAlign: 'center' }}>
    <Container>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Ready to Transform Your Life?
      </Typography>
      <Typography variant="h6" gutterBottom>
        Join the LinguaChallenge now – Only $7!
      </Typography>
      <Button variant="contained" color="primary" size="large" sx={{ mt: 3 }}>
        🏆 Start Now
      </Button>
      <Box mt={3} display="flex" justifyContent="center" gap={3} flexWrap="wrap">
        <Typography>🔒 Secure checkout</Typography>
        <Typography>💰 Money-back guarantee</Typography>
        <Typography>🎁 Prizes guaranteed</Typography>
      </Box>
    </Container>
  </Box>
);

export default FinalCTA;
