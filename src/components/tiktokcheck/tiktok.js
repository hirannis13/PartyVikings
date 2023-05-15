import React, { useState, useEffect } from "react";
import { Card, Typography } from "@mui/material";
import firebase from "firebase/app";
import "firebase/firestore";

const TiktokComponent = () => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchColors = async () => {
      const snapshot = await firebase
        .firestore()
        .collection("tiktokcheck")
        .get();

      const colorsData = snapshot.docs.reduce((acc, doc) => {
        const { color } = doc.data();
        return { ...acc, [doc.id]: color };
      }, {});

      setColors(colorsData);
    };

    fetchColors();
  }, []);

  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });
  const currentColor = colors[currentDay.toLowerCase()];

  return (
    <Card>
      <Typography variant="h6">Today's Color: {currentColor}</Typography>
    </Card>
  );
};

export default TiktokComponent;
