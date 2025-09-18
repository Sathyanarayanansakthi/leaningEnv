import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Grid } from "@mui/material";

import Header from "../components/Header";
import ChallengeProgress from "../components/ChallengeProgress";
import RecentEntries from "../components/RecentEntries";
import ReferralCard from "../components/ReferralCard";
import Stats from "../components/Stats";
import Leaderboard from "../components/Leaderboard";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [copied, setCopied] = useState(false);

  const [challengeProgress] = useState([
    { day: 1, completed: true, entry: "Introduction video uploaded", date: "2025-09-16" },
    { day: 2, completed: true, entry: "Daily conversation practice", date: "2025-09-17" },
    { day: 3, completed: true, entry: "Grammar exercise completed", date: "2025-09-18" },
    { day: 4, completed: false, entry: null, date: "2025-09-19" },
    { day: 5, completed: false, entry: null, date: "2025-09-20" },
    { day: 6, completed: false, entry: null, date: "2025-09-21" },
    { day: 7, completed: false, entry: null, date: "2025-09-22" },
  ]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/users/leaderboard", {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        setLeaderboard(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    };

    fetchUserProfile();
    fetchLeaderboard();
  }, []);

  const copyReferralCode = () => {
    if (!user?.username) return;
    navigator.clipboard.writeText(`https://langchallenge.com/ref/${user.username}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h6">Loading user info...</Typography>
      </Box>
    );
  }

  const completedDays = challengeProgress.filter((day) => day.completed).length;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f3f4f6" }}>
      <Header user={user} />

      <Box maxWidth="lg" mx="auto" px={2} py={4}>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} lg={8}>
            <ChallengeProgress challengeProgress={challengeProgress} />
            <RecentEntries challengeProgress={challengeProgress} />
          </Grid>

          {/* Right Sidebar */}
          <Grid item xs={12} lg={4}>
            <ReferralCard user={user} copied={copied} onCopy={copyReferralCode} />
            <Stats user={user} completedDays={completedDays} />
            <Leaderboard leaderboard={leaderboard} currentUsername={user.username} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
