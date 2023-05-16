import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const PostCard = ({ imageUrl, title, description, buttonText, postId }) => {
  const handleOpenPost = () => {
    //Do something yet unknown
  };
  return (
    <MuiCard sx={{ maxWidth: "15%" }}>
      <CardMedia component="img" height="140" image={imageUrl} alt={title} />
      <CardContent
        sx={{
          display: "flex",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Button variant="contained" onClick={handleOpenPost}>
          {buttonText}
        </Button>
      </CardContent>
    </MuiCard>
  );
};

export default PostCard;
