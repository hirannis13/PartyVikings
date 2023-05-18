import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import firebaseConfig from "./firebase";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    console.log("Logged in!");
  } else {
    console.log("No user");
  }
});

export const editUser = (displayName, selectedImage, showSnackbar) => {
  const unsubscribe = onAuthStateChanged(auth, (authUser) => {
    const user = authUser;
    if (authUser && authUser.uid === user.uid) {
      const usersRef = doc(db, "users", authUser.uid);
      getDoc(usersRef)
        .then((doc) => {
          if (doc.exists()) {
            updateDoc(usersRef, {
              name: displayName,
              imgId: selectedImage.id,
              imgUrl: selectedImage.imgUrl,
            })
              .then(() => {
                showSnackbar("Edit successful!", 3000, "var(--green)", "white");
                unsubscribe();
              })
              .catch((updateError) => {
                // Handle update error here
                console.error("Failed to update document:", updateError);
              });
          } else {
            // Handle document not found error here
            console.error("Document does not exist.");
          }
        })
        .catch((getError) => {
          // Handle get document error here
          console.error("Failed to get document:", getError);
        });
    }
  });
};

export const assignName = (navigate, displayName, selectedImage) => {
  const unsubscribe = onAuthStateChanged(auth, (authUser) => {
    const user = authUser;
    if (authUser && authUser.uid === user.uid) {
      const usersRef = doc(db, "users", user.uid);
      setDoc(usersRef, {
        email: user.email,
        name: displayName,
        imgId: selectedImage.id,
        imgUrl: selectedImage.imgUrl,
      });
      unsubscribe();
      navigate("/dashboard");
    }
  });
};

export const fetchTasksFromFirestore = async (selectedDay) => {
  try {
    const todosRef = collection(db, "todos");
    const dateRef = doc(todosRef, selectedDay);
    const tasksRef = collection(dateRef, "tasks");

    const querySnapshot = await getDocs(tasksRef);
    const tasks = [];

    querySnapshot.forEach((doc) => {
      const { startTime, task } = doc.data();
      tasks.push({ id: doc.id, startTime, task });
    });

    return tasks;
  } catch (error) {
    console.error("Error fetching tasks from Firestore:", error);
    return [];
  }
};

export const storeTaskInFirestore = async (
  selectedDayConverted,
  startTime,
  task
) => {
  try {
    const todosRef = collection(db, "todos");
    const dateRef = doc(todosRef, selectedDayConverted);
    const tasksRef = collection(dateRef, "tasks");

    const querySnapshot = await getDocs(tasksRef);
    const taskCount = querySnapshot.size + 1; // Get the count of existing tasks and increment by 1 for the new task

    const data = {
      startTime: startTime,
      task: task,
    };

    const newTaskRef = doc(tasksRef, taskCount.toString());
    await setDoc(newTaskRef, data);

    console.log("Task stored in Firestore successfully!");
  } catch (error) {
    console.error("Error storing task in Firestore: ", error);
  }
};

export const signUp = (email, password) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        resolve(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        reject(error);
      });
  });
};

export const signIn = (navigate, email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      // eslint-disable-next-line no-unused-vars
      const user = userCredential.user;
      navigate("/dashboard");
    })
    .catch((error) => {
      alert(error.code);
    });
};

export const logOut = (navigate) => {
  signOut(auth)
    .then(() => {
      navigate("/");
    })
    .catch((error) => {
      alert(error.code);
    });
};

export { db, auth };
