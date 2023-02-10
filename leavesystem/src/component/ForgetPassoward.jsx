import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from "react-bootstrap";



const ForgetPassword = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const[email,setemail]=useState("");
    const[result,setresult]=useState(false);

    const generatePassword = () => {
        // Create a random password
        const randomPassword =
          Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
      
        // Set the generated password as state
        setPassword(randomPassword);
      if(password=="")
      {
         generatePassword()
        }
      else{
        fetch("http://localhost:8080/forgetpassword?email="+email+"&password="+password,{
            method: "POST",
            headers: { "content-type": "application/json" }
          })
        .then(resp=>resp.json())
        .then(data=>setresult(data))
        if(result==true)
        alert("password change successfully");

        handleClose();
      }
      };



    return (
        <div>
            <Button variant="" style={{ border: 0, margin: 0, padding: 0 ,paddingLeft:"40%"}} onClick={handleShow}>
                <p style={{color:"blue",}}>Forget Password ?</p>

            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Forget Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container card ">
                        <form className="register-form" >
                            <Row>
                                <Col className="m-3">
                                    <label>
                                        <b>Email id :</b>
                                    </label>
                                    <input type="email" name="email" placeholder="Email" onChange={(e)=>{setemail(e.target.value)}} />
                                </Col>
                            </Row><Row>
                                <Col className="m-3">
                                   <h5 style={{color:"red"}}>Passoward will be send to your email.</h5>
                                  
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
                    <button type="button" className="generate-password  btn btn-primary" id="liveAlertBtn" onClick={(() => {generatePassword() })}>Generate Password</button>
                </Modal.Footer>
            </Modal>
            <div >
            </div>
        </div>
    );
}
export default ForgetPassword;