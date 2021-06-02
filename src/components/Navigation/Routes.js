import React from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import Login from "../Auth/Login";
import CategoryDetails from "../Category/CategoryDetails";
import Dashboard from "../Dashboard/Dashboard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Home from "../Home/Home";

const Routes = () => {
  function LogoutHandler() {
    localStorage.removeItem("credentials");
    window.location.href = "/login";
  }
  const user = useSelector((state) => state.user);
  let credentials = JSON.parse(localStorage.getItem("credentials"));

  function NoMatch() {
    const location = useLocation();
    return (
      <div className="container">
              <h2>Page Not Found at this Url: {location.pathname}</h2>   {" "}
      </div>
    );
  }
  function PrivateRoute({ children, ...rest }) {
    let credentials = JSON.parse(localStorage.getItem("credentials")); // console.log("in pvt route:", credentials); //   const location = useLocation(); //   let { from } = location.state || { from: { pathname: "/" } };
    return (
      <Route
        {...rest}
        render={({ location }) =>
          credentials ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }
  function LoginRoute({ children, ...rest }) {
    let credentials = JSON.parse(localStorage.getItem("credentials")); //   const location = useLocation(); //   let { from } = location.state || { from: { pathname: "/" } };
    return (
      <Route
        {...rest}
        render={({ location }) =>
          credentials ? (
            <Redirect
              to={{
                pathname: "/dashboard",
                state: { from: location },
              }}
            />
          ) : (
            children
          )
        }
      />
    );
  }
  return (
    <>
      <div className="container custom-container">
        <div className="row">
          <div className="col-sm-12">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary text-white">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                  data-toggle="collapse"
                  // data-target=".navbar-collapse"
                >
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link
                        to="#"
                        className="text-white nav-link"
                        onClick={() => window.location.reload()}
                      >
                        <i className="fa fa-refresh"></i>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/" className="text-white nav-link">
                        Home
                      </Link>
                    </li>

                    {credentials && credentials.isLoggedIn && (
                      <>
                        <li className="nav-item">
                          <Link to="/dashboard" className="text-white nav-link">
                            Dashboard
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                  {/* </div>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          > */}
                  <div className="align-right justify-content-end">
                    <ul className="navbar-nav ">
                      {credentials && credentials.isLoggedIn && (
                        <>
                          <li className="nav-item">
                            <span className="text-white nav-link">
                              Hello {credentials.name} !!
                            </span>
                          </li>
                          <li className="nav-item">
                            <Link to="/logout" className="text-white nav-link">
                              Logout
                            </Link>
                          </li>
                        </>
                      )}
                      {!credentials && (
                        <li className="nav-item">
                          <Link to="/login" className="text-white nav-link">
                            Login
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div
          className="row content-div"
          style={{ minHeight: "30em", background: "#7abaff" }}
        >
          <div className="col-sm-12 p-0">
            <Switch>
              <LoginRoute path="/login" exact>
                <Login />
              </LoginRoute>
              <PrivateRoute path="/logout">
                <LogoutHandler />
              </PrivateRoute>
              <PrivateRoute path="/dashboard" exact>
                <Dashboard />
              </PrivateRoute>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/categories/:categoryId">
                <CategoryDetails />
              </Route>
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};

export default Routes;
