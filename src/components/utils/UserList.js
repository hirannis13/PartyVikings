import { Fragment, useEffect, useState } from "react";
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
  //{ id: 1, imgUrl: `${process.env.PUBLIC_URL}/images/viking1.svg` },
  const CustomPerson = ({ imageUrl }) => (
    <div>
      {imageUrl && (
        <img
          style={{ height: "9vh", transform: "translate(0, 1vh)" }}
          src={imageUrl}
          alt="Person"
        />
      )}
    </div>
  );

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
            <Fragment key={user.id}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ margin: "0 2vw 0 0" }}>
                  {user.imgUrl ? (
                    <CustomPerson
                      key={user.imgId}
                      imageUrl={`${process.env.PUBLIC_URL}` + user.imgUrl}
                    />
                  ) : (
                    <Person />
                  )}
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
            </Fragment>
          ))}
        </Card>
      ) : (
        <p>No users found.</p>
      )}
    </Box>
  );
};

export default UserList;
