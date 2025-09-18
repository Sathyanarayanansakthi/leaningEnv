import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { EmojiEvents, Group, CalendarToday, AccessTime } from "@mui/icons-material";

export default function Stats({ user, completedDays }) {
  const stats = [
    { icon: <EmojiEvents sx={{ color: "gold", mr: 1 }} />, label: "Total Tickets", value: user.tickets ?? 0 },
    { icon: <Group sx={{ color: "primary.main", mr: 1 }} />, label: "Referrals", value: user.referrals ?? 0 },
    { icon: <CalendarToday sx={{ color: "green", mr: 1 }} />, label: "Days Completed", value: `${completedDays}/7` },
    {
      icon: <AccessTime sx={{ color: "purple", mr: 1 }} />,
      label: "Joined",
      value: user.joinDate ? new Date(user.joinDate).toLocaleDateString() : "N/A",
    },
  ];

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" mb={2}>
        Your Stats
      </Typography>
      {stats.map((stat, idx) => (
        <Box key={idx} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Box display="flex" alignItems="center">
            {stat.icon}
            <span>{stat.label}</span>
          </Box>
          <Typography fontWeight="bold">{stat.value}</Typography>
        </Box>
      ))}
    </Paper>
  );
}
