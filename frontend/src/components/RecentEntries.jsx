import React from "react";
import { Paper, Box, Typography, Grid, Button } from "@mui/material";
import { CheckCircle, UploadFile } from "@mui/icons-material";

export default function RecentEntries({ challengeProgress }) {
  const completedEntries = challengeProgress.filter((day) => day.completed).reverse().slice(0, 3);

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Recent Entries</Typography>
        <Button
          variant="contained"
          startIcon={<UploadFile fontSize="small" />}
          sx={{
            background: "linear-gradient(to right, #7c3aed, #2563eb)",
            ":hover": {
              background: "linear-gradient(to right, #6d28d9, #1d4ed8)",
            },
          }}
        >
          Upload Today’s Entry
        </Button>
      </Grid>

      <Box>
        {completedEntries.map((day) => (
          <Paper key={day.day} sx={{ p: 2, display: "flex", alignItems: "center", mb: 2 }}>
            <Box sx={{ bgcolor: "success.light", color: "success.main", borderRadius: "50%", p: 1, mr: 2 }}>
              <CheckCircle fontSize="small" />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography fontWeight="medium">Day {day.day} Complete</Typography>
              <Typography variant="body2" color="text.secondary">
                {day.entry}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {day.date}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Paper>
  );
}
