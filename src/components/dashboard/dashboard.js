import React from "react";
import "./dashboard.css";
import UserWelcome from "../userWelcome/userWelcome";
import TiktokComponent from "../tiktokcheck/tiktok";

function Dashboard() {
  return (
    <>
      <div className="dashboard">Dashboard</div>
      <UserWelcome />
      <TiktokComponent />
    </>
  );
}

export default Dashboard;
