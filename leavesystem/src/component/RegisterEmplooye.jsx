import React from "react";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import validator from 'validator';

function Register() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let nm = JSON.parse(localStorage.getItem("loggedinemp"));

  const navigate = useNavigate();
  let logout = () => {
    localStorage.removeItem("loggedinuser");
  }
  const navigateto = () => {
    if (nm.login.role == "manager")
      navigate("/manager")
    else
      navigate("/admin")

  }
  const [first_name, setfirst_name] = useState("");
  const [email, setemail] = useState("");
  const [last_name, setlast_Name] = useState("");
  const [phone, setphone] = useState("");
  const [job_title, setjob_title] = useState("");
  const [password, setpassword] = useState("");
  const [department, setdepartment] = useState([]);
  const [location, setlocation] = useState("");
  const [join_date, setjoin_date] = useState("");
  const [manager_id, setmanager_id] = useState(0);
  const [department_id, setdepartment_id] = useState(0);
  const [gender, setgender] = useState("");
  const [manager, setmanager] = useState([]);
  const [image, setimage] = useState('');
  const [checkemailcon, setcheckemailcon] = useState(true);

  function handleimage(e) {
    console.log(e.target.files);
    setimage(e.target.files[0]);
  }

  useEffect(() => {

    fetch("http://localhost:8080/getmanagerbydept?department_id=" + department_id)
      .then(r => r.json())
      .then(d => setmanager(d))
  }, [department_id]);

  useEffect(() => {
    fetch("http://localhost:8080/alldepartment")
      .then(r => r.json())
      .then(d => setdepartment(d))
  }, []);

  const checkmail = () => {
    fetch("http://localhost:8080/checkemail", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: email,

      })
    })
      .then(resp => resp.json())
      .then(d => {
       setcheckemailcon(d);    
     
    })
  }
  const handleSubmit = () => {

    if (first_name == "" || last_name == "" || phone == "" || gender == "" || department_id == 0 || password == "" || join_date == "" || manager_id == 0 || email == "" || location == "") {
      alert("Fill all the details");
    }
    else if (!validator.isStrongPassword(password, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      alert('Is Not Strong Password')
    }
    else if (checkemailcon ===true) {
      alert("email already exist");
    }
    else if( phone.match(/\d/g).length===10)
    {
      alert("phone number is less then or more then 10 Digit's ");
    }
    else {

      fetch("http://localhost:8080/registere", {
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
          password: password,
          join_date: join_date,
          manager_id: manager_id,
          email: email,
          image: image,
        })
      })
        .then((resp) => resp.json())
        .then((data) => {
          
         if(data==true)
           alert("New Employee Register");
           else
           alert("Not able to Register");
          //{setleave(data);localStorage.setItem("loggedinemp", JSON.stringify(data))}
        });
    }
   // window.location.reload(true);
  }
  return (
    <div className="staffreg">

      <Button variant="" style={{ border: 0 }} onClick={handleShow}>
        <p style={{ margin: 0 }}>Register Employee</p>

      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Employee Registration Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container card w-100 ">
            <form className="register-form" onSubmit={handleSubmit}>
              <Row style={{ marginTop: 2 }}>
                <Col className="md-2 mt-2" >
                  <label><b>Upload Image : </b></label>
                  <input type="file" name="file" autoComplete="off" placeholder="upload image" onChange={(e) => { setimage(e.target.files) }} />
                </Col>
              </Row>
              <Row>
                <Col className="md-1">
                  <label>
                    <b>First Name:</b><span style={{color:"red"}}>*</span>
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    autoComplete="off"
                    onChange={(event) => {
                      setfirst_name(event.target.value);
                    }}
                  />
                </Col>
                <Col className="md-1">
                  <label>
                    <b>Last Name:</b><span style={{color:"red"}}>*</span>
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    autoComplete="off"
                    onChange={(event) => {
                      setlast_Name(event.target.value);
                    }}
                  />
                </Col>
              </Row>


              <Row>

                <Col className="md-1">
                  <label>
                    <b>Email ID :</b><span style={{color:"red"}}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="off"
                    onChange={(event) => {
                      setemail(event.target.value); 
                    }} />
                </Col>



                <Col className="md-1">
                  <label>
                    <b>Contact :</b><span style={{color:"red"}}>*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Contact"
                    autoComplete="off"
                    onChange={(event) => {
                      setphone(event.target.value);
                    }}
                  />
                </Col>

              </Row>


              <Row>
                <Col className="md-1 mt-3">
                  <label>
                    <b>Department  :</b><span style={{color:"red"}}>*</span>
                  </label>
                  <select
                    name="department_id"
                    onChange={(e) => {
                      setdepartment_id(e.target.value);
                    }}>
                    <option value='Select'>Department</option>
                    {department.map(
                      (el) => {
                        return <option value={el.department_id}> {el.department_name}</option>;
                      }
                    )}
                  </select>
                </Col>

                <Col className="md-1">
                  <label>
                    <b>Password :</b><span style={{color:"red"}}>*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(event) => {
                      setpassword(event.target.value);
                    }}
                  />
                </Col>
              </Row>

              <Row>
                <Col className="md-1">
                  <label>
                    <b>location :</b><span style={{color:"red"}}>*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="location"
                    autoComplete="off"
                    onChange={(event) => {
                      setlocation(event.target.value);
                    }}
                  />
                </Col>

                <Col className="md-1">
                  <label>
                    <b>join_date :</b><span style={{color:"red"}}>*</span>
                  </label>
                  <input
                    type="date"
                    name="join_date"
                    placeholder="join_date"
                    autoComplete="off"
                    onChange={(event) => {
                      setjoin_date(event.target.value);
                    }}
                  />
                </Col>
              </Row>

              <Row>

                <Col className="md-1">
                  <label>
                    <b>job_title : </b>
                  </label>
                  <input
                    type="text"
                    name="job_title"
                    placeholder="job title"
                    autoComplete="off"
                    onChange={(event) => {
                      setjob_title(event.target.value);
                    }}
                  />
                </Col>


                <Col className="md-1">
                  <b>
                    <label for="gender">Gender : </label><span style={{color:"red"}}>*</span>
                  </b>
                  <input
                    type="radio" value="male" name="gender" onChange={(event) => {
                      setgender(event.target.value);
                    }} />
                  Male
                  <input
                    type="radio" value="female" name="gender" onChange={(event) => {
                      setgender(event.target.value);
                    }} />
                  Female
                </Col>

              </Row>

              <Row>
                <Col className="mb-2 mt-2">
                  <b>
                    <label for="manager_id">manager : </label><span style={{color:"red"}}>*</span>
                  </b>
                  <select
                    name="employee_id"
                    onChange={(e) => {
                      setmanager_id(e.target.value);
                    }}>
                    <option value='Select'>Name</option>
                    {manager.map(
                      (el) => {
                        return <option value={el.m_id}>{el.first_name + " " + el.last_name}</option>;
                      }
                    )}
                  </select>
                </Col>
              </Row>

            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <span className="btn btn-primary   " onClick={() => {handleSubmit();checkmail();}}>
            Submit
          </span>
        </Modal.Footer>
      </Modal>


    </div>
  );
}

export default Register;
