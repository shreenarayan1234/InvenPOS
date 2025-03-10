import React, { useState } from "react";
import style from "./Login.module.css";
import axios from "axios";
import Constants from "../../../Constants";

const Login = () => {
  const [input, setInput] = useState({}); //it should be object other wise it show error when we write value = {input.email} it show error in email
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e) =>
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  const handleLogin = () => {
    setIsLoading(true);
    axios
      .post(`${Constants.BASE_URL}/login`, input)
      .then((res) => {
        localStorage.email = res.data.email;
        localStorage.name = res.data.name;
        localStorage.phone = res.data.phone;
        localStorage.photo = res.data.photo;
        localStorage.token = res.data.token;
        setIsLoading(false);
        window.location.reload();
      })
      .catch((errors) => {
        setIsLoading(false);
        if (errors.response.status == 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };

  return (
    <div className="container-fluid" id={style.login}>
      <div className="row">
        <div className="col-md-6">
          <div className={`card ${style.card}`}>
            <div className={`card-header ${style["card-header"]}`}>
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <label className="w-100">
                <p>Email/Phone</p>
                <input
                  className={
                    errors.email != undefined
                      ? "is-invalid form-control mt-2"
                      : "form-control mt-2"
                  }
                  type="text"
                  name="email"
                  value={input.email}
                  onChange={handleInput}
                />
                <p className={style.login_error_msg}>
                  <small>
                    {errors.email != undefined ? errors.email[0] : null}
                  </small>
                </p>
              </label>
              <label className="w-100 mt-4">
                <p>Password</p>
                <input
                  className={
                    errors.password != undefined
                      ? "is-invalid form-control mt-2"
                      : "form-control mt-2"
                  }
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleInput}
                />
                <p className={style.login_error_msg}>
                  <small>
                    {errors.password != undefined ? errors.password[0] : null}
                  </small>
                </p>
              </label>
              <div className="d-grid mt-4">
                <button
                  onClick={handleLogin}
                  className="btn btn-success"
                  dangerouslySetInnerHTML={{
                    __html: isLoading
                      ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Login...'
                      : "Login",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
