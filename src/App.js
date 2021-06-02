import "./App.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Routes from "./components/Navigation/Routes";
import { useEffect } from "react";

function App() {
  // keeping the js code together as its small
  useEffect(() => {
    let credentials = JSON.parse(localStorage.getItem("credentials"));
    if (credentials) {
      let expirationTime = new Date(credentials.expirationTime);
      let token = credentials.token;
      if (token && credentials) {
        const remainingTime = expirationTime.getTime() - new Date().getTime();
        setTimeout(() => {
          localStorage.removeItem("credentials");
          window.location.href = "/login";
        }, remainingTime);
      }
    }
  }, []);
  return (
    <main>
      <Router>
        <Routes />
      </Router>
    </main>
  );
}

export default App;
