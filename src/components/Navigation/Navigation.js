import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navigation = () => {
  const user = useSelector((state) => state.user);
  let credentials = JSON.parse(localStorage.getItem("credentials")); // console.log("in pvt route:", credentials); //   const location = useLocation(); //   let { from } = location.state || { from: { pathname: "/" } };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary text-white mb-2">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/dashboard" className="text-white nav-link">
              Home
            </Link>
          </li>
          {credentials.isLoggedIn && (
            <>
              <li className="nav-item">
                <Link to="/" className="text-white nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="text-white nav-link">
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
