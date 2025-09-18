// src/components/Footer.jsx
import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

const Footer = () => (
  <Box sx={{ bgcolor: 'grey.100', color: 'text.secondary', py: 6 }}>
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" color="text.primary" gutterBottom>
            LinguaChallenge
          </Typography>
          <Typography>Transforming lives through languages.</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Links
          </Typography>
          {['Pricing', 'FAQ', 'Rules', 'Leaderboard'].map((link) => (
            <Typography key={link}>{link}</Typography>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Legal
          </Typography>
          {['Privacy Policy', 'Terms of Use'].map((link) => (
            <Typography key={link}>{link}</Typography>
          ))}
        </Grid>
      </Grid>
      <Box mt={4} textAlign="center" fontSize={12}>
        © {new Date().getFullYear()} LinguaChallenge. All rights reserved.
      </Box>
    </Container>
  </Box>
);

export default Footer;
