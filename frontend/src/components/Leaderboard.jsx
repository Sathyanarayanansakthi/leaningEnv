import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { Star } from "@mui/icons-material";

export default function Leaderboard({ leaderboard, currentUsername }) {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" mb={2}>
        Leaderboard
      </Typography>
      {leaderboard.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Loading leaderboard...
        </Typography>
      ) : (
        leaderboard.map((player, index) => {
          const isCurrentUser = player.username === currentUsername;
          return (
            <Box
              key={player.username}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: isCurrentUser ? "primary.light" : "transparent",
                p: 1,
                borderRadius: 1,
                mb: 1,
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Typography fontWeight="bold">{index + 1}</Typography>
                <Typography>{player.name}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Star color="warning" fontSize="small" />
                <Typography fontWeight="bold">{player.tickets}</Typography>
              </Box>
            </Box>
          );
        })
      )}
    </Paper>
  );
}
