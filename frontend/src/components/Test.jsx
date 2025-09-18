// src/components/Testimonials.jsx
import React from 'react';
import { Box, Container, Typography, Grid, Paper, Avatar, Rating } from '@mui/material';

const Testimonials = () => {
  const stories = [
    ['Sarah Chen', 'Marketing Manager', 'Learned Spanish in 7 days!'],
    ['Mike Rodriguez', 'Software Dev', 'Used French at work!'],
    ['Emma Wilson', 'Student', 'Won $500 and learned Italian!'],
  ];

  return (
    <Box sx={{ py: 10 }}>
      <Container>
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Success Stories
        </Typography>
        <Grid container spacing={4} mt={4}>
          {stories.map(([name, role, text], i) => (
            <Grid item xs={12} md={4} key={i}>
              <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Avatar>{name.split(' ').map((n) => n[0]).join('')}</Avatar>
                  <Box>
                    <Typography variant="subtitle1">{name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {role}
                    </Typography>
                  </Box>
                </Box>
                <Rating value={5} readOnly size="small" />
                <Typography mt={2}>"{text}"</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;
