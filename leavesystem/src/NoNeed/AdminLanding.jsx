import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminLanding = () => {
    let nm = JSON.parse(localStorage.getItem("loggedinuser"));
    const [admin, setadmin] = useState([]);
    const navigate = useNavigate();
    let logout = () => {
        localStorage.removeItem("loggedinuser");
    }
    useEffect(() => {
        fetch("http://localhost:8080/getAdminbylogin?login_id=" + nm.login_id)
            .then((resp) => resp.json())
            .then((data) => {
                {
                    setadmin(data); localStorage.setItem("loggedinemp", JSON.stringify(data))
                }
            });

    }, []);
    return (
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

                            <li className="nav-item dropdown" style={{ marginRight: 8 }}>
                                <a className="nav-link dropdown-toggle" style={{ backgroundColor: "white", color: "black", borderRadius: "8px" }} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Register
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" onClick={() => { navigate("/registerm") }}>Manager</a></li>
                                    <li><a className="dropdown-item" onClick={() => { navigate("/registere") }}>Employee</a></li>

                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a style={{ backgroundColor: "white", color: "black", borderRadius: "8px" }} className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {admin.first_Name}
                                </a>
                                {/*} <ul className="dropdown-menu mr-5">
                                    <li><a className="dropdown-item" >Profile</a></li>


    </ul>*/}
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>

            {/*}  <div className="col " >
                <div className="row m-5 ">
                    <div className="col-sm-3 mb-3 mb-sm-0">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Pending Leaves</h5>

                                <a onClick={() => navigate("/leavestatusadmin")} className="btn btn-primary">Employee </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row m-5">
                    <div className="col-sm-3 mb-3 mb-sm-0">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Pending Leaves</h5>

                                <a onClick={() => navigate("/leavestatusmanager")} className="btn btn-primary">Manager</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         <div className="col">
     
                <div className="row m-5">
                    <div className="col-sm-3 mb-3 mb-sm-0">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">All Applied Leaves </h5>

                                <a onClick={() => navigate("/leave")} className="btn btn-primary">Employee</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
*/}

            <div className="row my-5 pb-2  mx-3">
                <div className="col-sm-3 ">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Pending Leave</h5>
                            <p className="card-text"></p>
                            <button
                                onClick={() => navigate("/leavestatusadmin")}
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
                            <h5 className="card-title">Pending Leaves</h5>
                            <p className="card-text"></p>
                            <button
                                className="btn btn-warning"
                                onClick={() => navigate("/leavestatusmanager")}
                            >
                                Manager
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card ">
                        <div className="card-body">
                            <h5 className="card-title text-dark">All Applied Leaves </h5>
                            <p className="card-text"></p>
                            <button
                                onClick={() => navigate("/leave")}
                                className="btn btn-info"
                            >
                                Employee
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-2 pb-2 mx-4">
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">All Applied Leave</h5>
                            <p className="card-text"></p>
                            <button
                                onClick={() => navigate("/managerleave")}
                                className="btn btn-primary"
                            >
                                Manager
                            </button>
                        </div>
                    </div>
                </div>
               {/* <div className="col-sm-3 ">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Pending Leaves</h5>
                            <p className="card-text"></p>
                            <button
                                className="btn btn-warning"
                                onClick={() => navigate("/leavestatusmanager")}
                            >
                                Manager
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card ">
                        <div className="card-body">
                            <h5 className="card-title text-dark">All Applied Leaves </h5>
                            <p className="card-text"></p>
                            <button
                                onClick={() => navigate("/leave")}
                                className="btn btn-info"
                            >
                                Employee
                            </button>
                        </div>
                    </div>
</div>*/}
            </div>
        </div >)

}
export default AdminLanding;