import TemporaryDrawer from "./components/sidebar/sidebar";
import Dashboard from "./components/dashboard/dashboard";
import Guidelines from "./components/guidelines/guidelines";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Chat from "./components/chat/chat";
import Todo from "./components/todo/todo";
import Files from "./components/files/files";
import Accounts from "./components/accounts/accounts";
import { Route, Routes } from "react-router-dom";
import { useNavigate, useLocation } from "react-router";
import { auth } from "./service/authService";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location.pathname;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
    });
    return unsubscribe;
  }, [navigate]);

  return (
    <>
      {currentLocation !== "/signUp" && <TemporaryDrawer />}
      <Routes>
        <>
          <Route path="/" element={<SignIn />} />
        </>

        <>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/todo" element={<Todo />}></Route>
          <Route path="/guidelines" element={<Guidelines />}></Route>
          <Route path="/files" element={<Files />}></Route>
          <Route path="/accounts" element={<Accounts />}></Route>
          <Route path="/signUp" element={<SignUp />} />
        </>
      </Routes>
    </>
  );
}

export default App;
