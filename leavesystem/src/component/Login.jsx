import React from "react";
//import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/login.css';
import logo from '../images/Logo.png';
import ForgetPassword from "./ForgetPassoward";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errormsg, seterror] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {

e.preventDefault();
    const reqOption = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }

    if (email === "" && password === "")
      alert("Enter email and password for login")
    else if (email === "")
      alert("Enter email for login")
    else if (password === "")
    seterror("incorrct password")
    else {
    fetch("http://localhost:8080/checklogindata", reqOption)
        .then(resp => resp.json())
        .then((resp) => {if(resp==true){
      fetch("http://localhost:8080/CheckLogin", reqOption)
        .then(resp => resp.json())
        .then((resp) => {
            if (resp.role === "employee") {
              localStorage.setItem("loggedinuser", JSON.stringify(resp));
              navigate("/home");
            } else if (resp.role === "manager") {
              localStorage.setItem("loggedinuser", JSON.stringify(resp));
              navigate("/home");
            } else if (resp.role === "admin") {
              localStorage.setItem("loggedinuser", JSON.stringify(resp));
              navigate("/home");
            }
          })
         
          }
          else
          alert("Invalid Email or Password or your account is Deactivate");
        })
    }
  }



  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-dark text-dark bg-white " style={{ boxShadow: 10, color: "black" }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">

          <img style={{ maxBlockSize: 30 }} src={logo} />
          <h3 style={{color:"#2C85C9",paddingLeft:"25%"}}>LEAVE MANAGEMENT SYSTEM</h3>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          </div>
        </div>
      </nav>
      <div className="background  ">
        <div className="container-fluids login">
          <div className="container card w-50 mt-5 ">
            <form className="login pt-4">
              <div className="row mb-3">
                <label htmlFor="inputEmail3" className="col-sm-4 col-form-label ">
                  email :
                </label>
                <div className="col-sm-5">
                  <input
                    type="email"
                    placeholder="email"
                    className="form-control "
                    autoComplete="off"
                    id="inputEmail3"
                    onChange={(event) => {
                      setemail(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="row mb-3 p">
                <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
                  Password :
                </label>
                <div className="col-sm-5">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    id="inputPassword3"
                    onChange={(event) => {
                      setpassword(event.target.value);
                    }}
                  />
                </div>
                <span style={{
                  fontWeight: 'bold',
                  color: 'red',
                }}>{errormsg}</span>
              </div>
              <ForgetPassword />
              <button style={{ textAlign: "center", marginLeft: "40%" }}
                type="submit"
                className="btn btn-success  "
                onClick={(e) => {
                  handleSubmit(e);
                }} >
                Login
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}



export default Login;

