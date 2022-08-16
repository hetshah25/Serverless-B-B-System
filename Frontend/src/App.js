import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LexChat from "./components/ChatBot/ChatBot";
import "react-toastify/dist/ReactToastify.min.css";

import "./App.css";
import Routes from "./Routes/routes";

export default function App() {
  return (
    <Router>
      <Routes></Routes>
      <ToastContainer
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <LexChat />
    </Router>
  );
}

const FooterStyle = {
  background: "#222",
  fontSize: ".8rem",
  color: "#fff",
  position: "absolute",
  bottom: 0,
  padding: "1rem",
  margin: 0,
  width: "100%",
  opacity: ".5",
};
