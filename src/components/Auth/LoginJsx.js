import React from "react";

const LoginJsx = (props) => {
  const {
    error,
    formHandler,
    email,
    emailHandler,
    password,
    passwordHandler,
    emailError,
    passwordError,
    isLoginLoading,
  } = props;

  return (
    <div className="col-sm-10">
      {isLoginLoading && <div className="">Logging in..., please wait</div>}
      <div className="" data-aos="fade-in">
        <div className="card text-center login-card mt-5">
          <div className="card-header text-white bg-primary">Login</div>
          <div className="card-body">
            {error && <p className="alert alert-danger text-center">{error}</p>}
            <form onSubmit={formHandler} method="post" role="form" className="">
              <div className="form-group form-inline">
                <label className="col-sm-4 col-form-label">Your Email</label>
                <div className="col-sm-7">
                  <input
                    type="email"
                    className="form-control mb-2 mr-sm-2"
                    name="email"
                    value={email}
                    onChange={emailHandler}
                  />
                </div>
                <div className="col-sm-4"></div>
                <div className="col-sm-7">
                  {emailError && (
                    <div className="alert alert-danger text-left col-sm-12">
                      {emailError}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group form-inline">
                <label className="col-sm-4 col-form-label">Password</label>
                <div className="col-sm-7">
                  <input
                    type="password"
                    className="form-control mb-2 mr-sm-2"
                    name="password"
                    id="password"
                    value={password}
                    onChange={passwordHandler}
                    // required
                  />
                </div>
                <div className="col-sm-4"></div>
                <div className="col-sm-7">
                  {passwordError && (
                    <div className="alert alert-danger text-left col-sm-12">
                      {passwordError}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginJsx;
