import React, { useState, useEffect } from "react";
import { Card, Typography, Box } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../service/authService";
import CircularAnalyticsWithLabel from "../utils/CircularAnalyticsWithLabel";

const TiktokComponent = () => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const fetchDays = async () => {
      const querySnapshot = await getDocs(collection(db, "tiktokcheck"));
      const daysData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data };
      });
      setDays(daysData);
    };

    fetchDays();
  }, []);

  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });
  const findCurrentDay = days.find((day) =>
    day.id.includes(currentDay.toLowerCase())
  );

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "fit-content",
          borderRadius: "1vw",
          padding: "3vh 3vw",
          boxShadow: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            p: "0 2vw 0 0",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularAnalyticsWithLabel percentage={findCurrentDay?.percentage} />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "left",
            flexDirection: "column",
            paddingX: "2vh",
          }}
        >
          <Typography variant="h5">TikTok</Typography>
          <Typography
            variant="h6"
            sx={{
              padding: "0 0 2vh 0",
            }}
          >
            {currentDay}
          </Typography>
          <Typography variant="h6"> {findCurrentDay?.timeone}</Typography>
          <Typography variant="h6"> {findCurrentDay?.timetwo}</Typography>
        </Box>
      </Card>
    </>
  );
};

export default TiktokComponent;
