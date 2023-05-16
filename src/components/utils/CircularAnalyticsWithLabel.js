import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularAnalyticsWithLabel({ percentage }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={percentage}
        thickness={7}
        size={"13vh"}
        sx={{ color: "#2A403E", strokeLinecap: "round" }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          fontSize={"2.3vh"}
        >{`${percentage}%`}</Typography>
      </Box>
    </Box>
  );
}

export default CircularAnalyticsWithLabel;