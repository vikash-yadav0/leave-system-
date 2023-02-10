import React from "react";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UpdateEmployee=()=> {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    let nm = JSON.parse(localStorage.getItem("loggedinemp"));

    const navigate = useNavigate();
    let logout = () => {
        localStorage.removeItem("loggedinuser");
    }
   
    useEffect(() => {
        fetch("http://localhost:8080/getmanager?manager_id=" + nm.m_id)
            .then(r => r.json())
            .then(d => setmanager(d))
            initial();
    }, []);
    const [first_name, setfirst_name] = useState("");
    const [email, setemail] = useState("");
    const [last_name, setlast_Name] = useState("");
    const [phone, setphone] = useState("");
    const [job_title, setjob_title] = useState("");


    const [location, setlocation] = useState("");
    const [join_date, setjoin_date] = useState("");

    const [department_id, setdepartment_id] = useState(0);
    const [gender, setgender] = useState("");
    const [manager, setmanager] = useState([]);


    const initial = () => {
        setfirst_name(nm.first_name);
        setlast_Name(nm.last_name);
            setphone(nm.phone);
            setgender(nm.gender);
            setjob_title(nm.job_title);
            setdepartment_id(nm.department.department_id);
            setlocation(nm.location);
            setjoin_date(nm.join_date);
            setemail(nm.email);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:8080/updateemployee?employee_id="+nm.e_id, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                first_name: first_name,
                last_name: last_name,
                phone: phone,
                gender: gender,
                job_title: job_title,
                department_id: department_id,
                location: location,

                join_date: join_date,

                email: email,
            })
        })
            .then((resp) => resp.json())
            .then((data) => {
              
                /* if(Result=="true")
                 alert("leave is updated, and assigned");
                 else
                 alert("leave didn't update");*/
                //{setleave(data);localStorage.setItem("loggedinemp", JSON.stringify(data))}
            });
    }
    
      var  joindat = new Date(join_date).toLocaleDateString('en-US', {
          month: '2-digit', day: '2-digit', year: 'numeric'
        })
        
      
     
    return (
        <div className="staffreg">
            

                <Button variant="" style={{ border: 0 ,margin:0,padding:0}} onClick={handleShow}>
                    <p style={{ margin: 0 }}>Update Profile</p>

                </Button>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Update Manager </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container card w-100 ">
                            <form className="register-form" onSubmit={handleSubmit}>


                                <Row>
                                    <Col className="md-5">
                                        <label>
                                            <b>First Name:</b>
                                        </label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            placeholder={nm.first_name}

                                            autoComplete="off"
                                            onChange={(event) => {
                                                setfirst_name(event.target.value);
                                            }}
                                        />
                                    </Col>
                                    <Col className="md-5">
                                        <label>
                                            <b>Last Name:</b>
                                        </label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            placeholder={nm.last_name}

                                            autoComplete="off"
                                            onChange={(event) => {
                                                setlast_Name(event.target.value);
                                            }}
                                        />
                                    </Col>
                                </Row>


                                <Row>

                                    <Col className="md-5">
                                        <label>
                                            <b>Email ID :</b>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder={nm.email}

                                            autoComplete="off"
                                            onChange={(event) => {
                                                setemail(event.target.value);
                                            }} />
                                    </Col>



                                    <Col className="md-5">
                                        <label>
                                            <b>Contact :</b>
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder={nm.phone}

                                            autoComplete="off"
                                            onChange={(event) => {
                                                setphone(event.target.value);
                                            }}
                                        />
                                    </Col>

                                </Row>


                                <Row>
                                    <Col className="md-5">
                                        <label>
                                            <b>Department  :</b>
                                        </label>
                                        {nm.department.department_name}
                                    </Col>


                                </Row>

                                <Row>
                                    <Col className="md-5">
                                        <label>
                                            <b>location :</b>
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder={nm.location}

                                            autoComplete="off"
                                            onChange={(event) => {
                                                setlocation(event.target.value);
                                            }}
                                        />
                                    </Col>

                                    <Col className="md-5">
                                        <label>
                                            <b>join_date :</b>
                                        </label>
                                        <input
                                            type="date"
                                            name="join_date"
                                            placeholder={nm.join_date}

                                            autoComplete="off"
                                            onChange={(event) => {
                                                setjoin_date(event.target.value);
                                            }}
                                        />
                                    </Col>
                                </Row>

                                <Row>

                                    <Col className="md-5">
                                        <label>
                                            <b>job_title : </b>
                                        </label>
                                       
                                    
                                      {joindat}
                                    </Col>


                                    <Col className="md-5">
                                        <b>
                                            <label for="gender">Gender : </label>
                                        </b>
                                        {nm.gender}
                                    </Col>

                                </Row>



                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <span className="btn btn-primary   " onClick={() => handleSubmit()}>
                            Submit
                        </span>
                    </Modal.Footer>
                </Modal>


            </div>

     
    );
}

export default UpdateEmployee;
