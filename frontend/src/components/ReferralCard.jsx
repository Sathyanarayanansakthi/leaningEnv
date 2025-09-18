import React from "react";
import { Paper, Box, Typography, IconButton, Button } from "@mui/material";
import { CardGiftcard, ContentCopy, Share } from "@mui/icons-material";

export default function ReferralCard({ user, copied, onCopy }) {
  return (
    <Paper
      sx={{
        background: "linear-gradient(to bottom right, #7c3aed, #2563eb)",
        color: "white",
        borderRadius: 3,
        p: 3,
        mb: 3,
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <CardGiftcard fontSize="small" sx={{ mr: 1 }} />
        <Typography variant="subtitle1">Earn More Tickets!</Typography>
      </Box>
      <Typography variant="body2" color="rgba(255,255,255,0.8)" mb={2}>
        Refer friends and earn 5 tickets for each successful referral!
      </Typography>

      {user.username ? (
        <>
          <Box
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              borderRadius: 2,
              p: 2,
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="caption" color="rgba(255,255,255,0.7)">
                Your Referral Link
              </Typography>
              <Typography
                component="a"
                href={`https://langchallenge.com/ref/${user.username}`}
                target="_blank"
                rel="noopener noreferrer"
                fontFamily="monospace"
                fontWeight="bold"
                sx={{
                  color: "white",
                  textDecoration: "underline",
                  wordBreak: "break-all",
                }}
              >
                {`https://langchallenge.com/ref/${user.username}`}
              </Typography>
            </Box>
            <IconButton onClick={onCopy} sx={{ color: "white" }}>
              <ContentCopy fontSize="small" />
            </IconButton>
          </Box>

          {copied && (
            <Typography variant="body2" color="lightgreen" mb={1}>
              ✓ Referral link copied!
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            startIcon={<Share />}
            sx={{
              bgcolor: "white",
              color: "primary.main",
              fontWeight: "bold",
              ":hover": { bgcolor: "#f0f0f0" },
            }}
          >
            Share Referral Link
          </Button>
        </>
      ) : (
        <Typography variant="body2" color="rgba(255,255,255,0.7)">
          Your referral link will be available once your profile is set up.
        </Typography>
      )}
    </Paper>
  );
}
