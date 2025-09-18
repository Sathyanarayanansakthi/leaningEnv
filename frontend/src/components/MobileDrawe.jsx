// src/components/MobileDrawer.jsx
import React from 'react';
import { Drawer, List, ListItem, Typography } from '@mui/material';

const MobileDrawer = ({ open, onClose, navItems }) => (
  <Drawer anchor="right" open={open} onClose={onClose}>
    <List sx={{ width: 250 }}>
      {navItems.map((text) => (
        <ListItem button key={text}>
          <Typography>{text}</Typography>
        </ListItem>
      ))}
    </List>
  </Drawer>
);

export default MobileDrawer;
