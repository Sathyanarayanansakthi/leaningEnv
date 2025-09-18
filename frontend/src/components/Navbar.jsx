// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ navItems, onDrawerOpen }) => (
  <AppBar position="fixed" sx={{ bgcolor: 'white', color: 'text.primary', borderBottom: '1px solid #eee' }} elevation={1}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        LinguaChallenge
      </Typography>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        {navItems.map((item) => (
          <Button key={item} color="inherit">
            {item}
          </Button>
        ))}
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <IconButton edge="end" color="inherit" onClick={onDrawerOpen}>
          <MenuIcon />
        </IconButton>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;
