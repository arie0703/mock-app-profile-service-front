import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import MemberList from "./components/MemberList";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ConfirmUserPage from "./components/ConfirmUserPage";
import {
  ColorMode,
  defaultDarkModeOverride,
  ThemeProvider,
} from "@aws-amplify/ui-react";

function App() {
  const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    return !!accessToken;
  };
  const theme = {
    name: "dark-theme",
    overrides: [defaultDarkModeOverride],
  };

  const colorMode: ColorMode = "dark";

  return (
    <ThemeProvider theme={theme} colorMode={colorMode}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <Navigate replace to="/home" />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/confirm" element={<ConfirmUserPage />} />
          <Route
            path="/home"
            element={
              isAuthenticated() ? (
                <MemberList />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
