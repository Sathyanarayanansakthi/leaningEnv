import User from "../models/User.js";

export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({}, "name tickets referrals email joinDate username")
      .sort({ tickets: -1 }) // Sort by most tickets descending
      .limit(20);

    res.json(users);
  } catch (err) {
    console.error("Failed to fetch leaderboard:", err);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};
