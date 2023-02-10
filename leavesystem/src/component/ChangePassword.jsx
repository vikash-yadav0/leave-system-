import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import add from '../images/add.png';
import { Col, Row } from "react-bootstrap";



const ChangePassword = (props) => {

    const [show, setShow] = useState(false);
    const [oldpwd, setoldpwd] = useState(true);
    const [newpwd, setnewpwd] = useState(false);
    const[checkpwd,setcheckpwd]=useState(true);
    const[updatepwd,setupdatepwd]=useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let nm = JSON.parse(localStorage.getItem("loggedinemp"));
    const navigate = useNavigate();
    let logout = () => {
        localStorage.removeItem("loggedinuser");
    }
    const [email, setemail] = useState(nm.email);
    const [manager_id, setmanager_id] = useState(nm.m_id)
    const [manager, setmanager] = useState([]);
    const [managerdata, setmanagerdata] = useState(false);
    const [password, setpassword] = useState("");
    const [employeedata, setemployeedata] = useState([]);


    const checkpassword = () => {
        if (password == "") {
            alert("Please Enter Password")
        }
        else {
            fetch("http://localhost:8080/checklogindata", {

                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    email: nm.email,
                    password: password

                })
            })
                .then(resp => resp.json())
                .then((resp) => {
                    if (resp == true) {
                        setoldpwd(false);
                        setnewpwd(true);
                        setcheckpwd(false);
                        setupdatepwd(true);
                    }
                    else{
                        alert("Invalid Password")
                    }
                });
        }
    }

    const handleSubmitmanager = () => {

        if (password == "") {
            alert("Please Enter Password")
        }
        else {
            fetch("http://localhost:8080/changePassowardmanager?manager_id=" + nm.m_id + "&Passoward=" + password, {

                method: "POST",
                headers: { "content-type": "application/json" }
            })
                .then(resp => resp.json())
                .then((resp) => {
                   
                    if (resp == true){
                        alert("Password change successfully")
                        setoldpwd(true);
                        setnewpwd(false);
                        setcheckpwd(true);
                        setupdatepwd(false);
                        handleClose();
                    }
                });
        }
    }

    const handelsubmitemployee = () => {
        if (password == "") {
            alert("Please Enter Password")
        }
        else {
            fetch("http://localhost:8080/changePassowardemployee?employee_id=" + nm.e_id + "&Passoward=" + password, {

                method: "POST",
                headers: { "content-type": "application/json" }
            })
                .then(resp => resp.json())
                .then((resp) => {
                   
                    if (resp == true){
                        alert("Password change successfully")
                        setoldpwd(true);
                        setnewpwd(false);
                        setcheckpwd(true);
                        setupdatepwd(false);
                        handleClose();
                    }
                });
        }
    }

    return (
        <div>
            <Button variant="" style={{ border: 0, margin: 0, padding: 0 }} onClick={handleShow}>
                <p style={{ margin: 0 }}>Change Password</p>

            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container card ">
                        <form className="register-form" >
                            <Row>
                                <Col className="m-3">
                                    <label>
                                        <b>Email id :</b>
                                    </label>
                                    {nm.email}
                                </Col>
                            </Row>
                            <Row style={checkpwd?{display:"block"}:{display:"none"}}>
                                <Col className="m-3">
                                    <label>
                                        <b>Enter Old Password:</b>
                                    </label>
                                    <input
                                        type="password"

                                        name="password"
                                        placeholder="Password"
                                        autoComplete="off"
                                        onChange={(e) => {
                                            setpassword(e.target.value)
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row  style={updatepwd?{display:"block"}:{display:"none"}}>
                                <Col className="m-3">
                                    <label>
                                        <b>Enter New Password:</b>
                                    </label>
                                    <input
                                        type="password"

                                        name="password"
                                        placeholder="Password"
                                        autoComplete="off"
                                        onChange={(e) => {
                                            setpassword(e.target.value)
                                        }}
                                    />
                                </Col>
                            </Row>


                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <div id="liveAlertPlaceholder"></div>
                    <button type="button" style={checkpwd?{display:"block"}:{display:"none"}} class="btn btn-primary" id="liveAlertBtn" onClick={(() => {
                        checkpassword()
                    })}>Verify Password</button>
                    <button type="button" style={updatepwd?{display:"block"}:{display:"none"}} class="btn btn-primary" id="liveAlertBtn" onClick={(() => {
                        if (nm.login.role == "manager") handleSubmitmanager()
                        else
                        handelsubmitemployee()
                    })}>Set New Password</button>
                </Modal.Footer>
            </Modal>
            <div >
            </div>
        </div>
    );
}
export default ChangePassword;