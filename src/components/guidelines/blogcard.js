import React from "react";
import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function BlogCard({ data }) {
  const navigate = useNavigate();

  if (!Array.isArray(data) || data.length <= 0) {
    return null;
  }

  const handleOpenPost = (urls) => {
    navigate("/readblog", { state: { data: urls } });
  };

  return (
    <>
      {data.map((urls, index) => (
        <MuiCard
          sx={{
            width: "16vw",
            boxShadow: 4,
          }}
          key={index}
        >
          <CardMedia
            component="img"
            height="250vh"
            image={urls.acf?.mainimg.url}
            alt={urls.acf?.category}
          />
          <CardContent
            sx={{
              display: "flex",
              alignContent: "center",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              sx={{ textAlign: "center", fontSize: "1.8rem" }}
            >
              {urls.acf?.title}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                margin: "1.5vh 0 4vh 0",
                display: "flex",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineClamp: 3,
                boxOrient: "vertical",
                wordBreak: "break-word",
                hyphens: "auto",
                whiteSpace: "nowrap",
                width: "100%",
              }}
            >
              oohelooohelolheloohellohelloheloohelooohelolheloohellohelloheloohelooohelolheloo
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                handleOpenPost(urls);
              }}
              sx={{
                color: "#2A403E",
                border: "#2A403E 0.5px solid",
                boxShadow: 2,
                fontSize: "1rem",
                width: "fit-content",
                "&:hover": {
                  backgroundColor: "#2a4035",
                  color: "#fff",
                },
              }}
            >
              Read more
            </Button>
          </CardContent>
        </MuiCard>
      ))}
    </>
  );
}

export default BlogCard;
