import React, { useState, useEffect } from "react";
import { Card, Typography, Box } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../service/authService";
import CircularAnalyticsWithLabel from "../utils/CircularAnalyticsWithLabel";

const TiktokComponent = () => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchColors = async () => {
      const querySnapshot = await getDocs(collection(db, "tiktokcheck"));
      const colorsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data };
      });
      setColors(colorsData);
    };

    fetchColors();
  }, []);

  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });
  const currentColor = colors.find((color) =>
    color.id.includes(currentDay.toLowerCase())
  );
  return (
    <>
      <Card
        variant="outlined"
        sx={{ display: "flex", flexDirection: "row", maxWidth: "fit-content" }}
      >
        <Box
          sx={{
            display: "flex",
            p: "8px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularAnalyticsWithLabel percentage={45} />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            paddingX: "16px",
          }}
        >
          <Typography variant="h5">TikTok</Typography>
          <Typography variant="h6">{currentDay}s' forcast:</Typography>
          <Typography>Morning post time {currentColor?.timeone}</Typography>
        </Box>
      </Card>
    </>
  );
};

export default TiktokComponent;
