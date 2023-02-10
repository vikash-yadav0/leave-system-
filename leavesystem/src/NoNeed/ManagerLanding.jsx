
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../style/ManagerLanding.css';
import logo from '../images/Logo.png';

const ManagerLanding = () => {
  let nm = JSON.parse(localStorage.getItem("loggedinuser"));
  const [manager, setmanager] = useState([]);
  const navigate = useNavigate();
  let logout = () => {
    localStorage.removeItem("loggedinuser");
  }
  
  useEffect(() => {
    fetch("http://localhost:8080/getManagerbylogin?login_id=" + nm.login_id)
      .then((resp) => resp.json())
      .then((data) => {
        {
          setmanager(data); localStorage.setItem("loggedinemp", JSON.stringify(data))
        }
      });

  }, []);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid d-flex justify-content-between align-items-center">
        <div id="logo">
                   <a href="index.html"> {logo}</a>
                   <h6 className="text-light">e-CARGOWARE</h6>
                </div>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <button
                  type="button"
                  className="btn btn-light "
                  aria-current="page"
                  onClick={() => { logout(); navigate("/login") }}
                >
                  logout
                </button>
              </li>
              <li className="nav-item mx-2">
                <button
                  type="button"
                  className="btn btn-light "
                  aria-current="page"
                  onClick={() => navigate("/registere")}
                >
                  Sign Up
                </button>
              </li>

              <li className="nav-item dropdown">
                <a style={{ backgroundColor: "white", color: "black", borderRadius: "8px" }} className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {manager.first_name}
                </a>

              </li>
            </ul>

          </div>
        </div>
      </nav>
      <div className="row my-5 pb-2  mx-3">
        <div className="col-sm-3 ">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Pending Leave</h5>
              <p className="card-text"></p>
              <button
                onClick={() => navigate("/leavestatus")}
                className="btn btn-primary"
              >
                Employee
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-3 ">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Search  Leaves</h5>
              <p className="card-text"></p>
              <button
                className="btn btn-warning"
                onClick={() => navigate("/leavebyidsearch")}
              >
                Employee
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="card ">
            <div className="card-body">
              <h5 className="card-title text-dark">Total Personal Leaves  </h5>
              <p className="card-text"></p>
              <button
                onClick={() => navigate("/leaveofmanager")}
                className="btn btn-info"
              >
                Personal
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-5 pb-2  mx-3">
        <div className="col-sm-3 ">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Appling Leave</h5>
              <p className="card-text"></p>
              <button
                onClick={() => navigate("/managerleaveapp")}
                className="btn btn-primary"
              >
                Manager
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ManagerLanding;