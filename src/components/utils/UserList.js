import { useEffect, useState } from "react";
import { db } from "../../service/authService";
import { collection, getDocs } from "firebase/firestore";
import { Person } from "@mui/icons-material";
import {
  Avatar,
  Typography,
  Divider,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setUsers(userList);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      {users.length > 0 ? (
        <Card
          sx={{
            width: "20vw",
            boxShadow: 4,
            borderRadius: "1vw",
            padding: "3vh 1vw",
          }}
        >
          {users.map((user) => (
            <>
              <CardContent
                key={user.id}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ margin: "0 2vw 0 0" }}>
                  <Person />
                </Avatar>
                <Grid>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    {user.name}
                  </Typography>
                  <Typography variant="body2">{user.email}</Typography>
                </Grid>
              </CardContent>
              <Divider
                orientation="horizontal"
                role="presentation"
                flexItem
                sx={{
                  borderColor: "#48494B",
                  borderRadius: "5px",
                }}
              />
            </>
          ))}
        </Card>
      ) : (
        <p>No users found.</p>
      )}
    </Box>
  );
};

export default UserList;
