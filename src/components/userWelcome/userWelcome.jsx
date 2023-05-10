import React, { useState, useEffect } from "react";
import { auth, db } from "../../service/authService";
import { doc, getDoc } from "firebase/firestore";

const UserWelcome = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const userRef = doc(db, "users", authUser.uid);
        getDoc(userRef)
          .then((doc) => {
            if (doc.exists) {
              setUser({ uid: authUser.uid, name: doc.data().name });
            } else {
              console.log("No user data found");
            }
          })
          .catch((error) => {
            console.log("Error getting user data:", error);
          });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <div>{user ? `Hello, ${user.name}` : "Not logged in"}</div>;
};

export default UserWelcome;
