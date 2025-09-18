import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { EmojiEvents } from "@mui/icons-material";

export default function Header({ user }) {
  const onLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Box sx={{ bgcolor: "white", borderBottom: 1, borderColor: "divider", py: 2 }}>
      <Box maxWidth="lg" mx="auto" px={2}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Welcome back, {user.name}! 👋
            </Typography>
            <Typography color="text.secondary">{user.email}</Typography>
          </Box>
          <Grid item sx={{ display: "flex", gap: 2 }}>
            <Box
              sx={{
                backgroundColor: "#fef3c7",
                color: "#92400e",
                px: 2,
                py: 0.5,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                fontWeight: 500,
              }}
            >
              <EmojiEvents fontSize="small" sx={{ mr: 1 }} />
              {user.tickets ?? 0} Tickets
            </Box>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(to right, #7c3aed, #2563eb)",
                ":hover": {
                  background: "linear-gradient(to right, #6d28d9, #1d4ed8)",
                },
              }}
            >
              View Leaderboard
            </Button>
            <Button variant="outlined" color="error" onClick={onLogout}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
