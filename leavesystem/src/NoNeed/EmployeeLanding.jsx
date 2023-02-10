import FooterSection from "./FooterSection";
import HeaderSection from "./HeaderSection";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const EmployeeLanding=()=>{
    let nm = JSON.parse(localStorage.getItem("loggedinemp"));
    const [employee, setemployee] = useState([]);
    const navigate = useNavigate();
    let logout = () => {
      localStorage.removeItem("loggedinuser");
    }
  
    useEffect(() => {
      fetch("http://localhost:8080/getEmployeebylogin?login_id=" + nm.login_id)
        .then((resp) => resp.json())
        .then((data) => {{
            setemployee(data);localStorage.setItem("loggedinemp", JSON.stringify(data))}
        });
        
    }, []);

  
    return(
        <div>
             <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h6 className="text-light">e-CARGOWARE</h6>
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
              

              <li className="nav-item dropdown">
                <a style={{ backgroundColor: "white", color: "black", borderRadius: "8px" }} className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {employee.first_name}
                </a>
                
              </li>
            </ul>

          </div>
        </div>
      </nav>
      <div className="containers">



        <div className="row m-5">
          <div className="col-sm-3 mb-3 mb-sm-0">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Request Leave </h5>

                <a onClick={() => navigate("/leaverequest")} className="btn btn-primary">Apply Leave </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-5">
          <div className="col-sm-3 mb-3 mb-sm-0">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Leave By Employee</h5>

                <a onClick={() => navigate("/leavebyid")} className="btn btn-primary">Total Leaves</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      
        </div>
    )
}
export default EmployeeLanding;




