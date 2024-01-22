import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <div>
        <UserProfile />
      </div>
    </Router>
  );
}

export default App;
