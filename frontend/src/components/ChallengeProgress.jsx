import React from "react";
import { Box, Typography, Grid, Paper, LinearProgress } from "@mui/material";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";

export default function ChallengeProgress({ challengeProgress }) {
  const completedDays = challengeProgress.filter((day) => day.completed).length;
  const progressPercentage = (completedDays / 7) * 100;

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Challenge Progress</Typography>
        <Typography variant="body2" color="text.secondary">
          Day {completedDays} of 7
        </Typography>
      </Grid>

      <Box mb={3}>
        <Grid container justifyContent="space-between">
          <Typography variant="body2">Progress</Typography>
          <Typography variant="body2">{Math.round(progressPercentage)}% Complete</Typography>
        </Grid>
        <LinearProgress
          variant="determinate"
          value={progressPercentage}
          sx={{ height: 10, borderRadius: 5, mt: 1 }}
        />
      </Box>

      <Grid container spacing={1}>
        {challengeProgress.map((day) => {
          const isToday = day.day === completedDays + 1;
          return (
            <Grid item xs={1.71} key={day.day} sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  margin: "0 auto",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: day.completed
                    ? "success.light"
                    : isToday
                    ? "info.light"
                    : "grey.200",
                  color: day.completed
                    ? "success.main"
                    : isToday
                    ? "info.main"
                    : "grey.500",
                  border: isToday ? "2px solid #90caf9" : "none",
                }}
              >
                {day.completed ? <CheckCircle fontSize="small" /> : <RadioButtonUnchecked fontSize="small" />}
              </Box>
              <Typography variant="caption" color="text.secondary">
                Day {day.day}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}
