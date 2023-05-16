import React from "react";
import "./dashboard.css";
import { Box } from "@mui/material";
import UserWelcome from "../userWelcome/userWelcome";
import TiktokComponent from "../tiktokcheck/tiktok";
import Calendar from "../calendar/Calendar";

function Dashboard() {
  return (
    <>
      <div className="dashboard">Dashboard</div>
      <UserWelcome />
      <TiktokComponent />

      <Box>
        <Calendar />
      </Box>
    </>
  );
}

export default Dashboard;
