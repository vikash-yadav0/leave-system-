import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import validator from 'validator';

function LeavAppl(p) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    /* condition on basis of role which part need to show */
    const [mangcondition, setmangcondition] = useState(false);
    const [empcondition, setempcondition] = useState(false);
    /*conditions to show */
    const [displaypendingleaves, setdisplaypendingleaves] = useState(true);
    const [displayappliedleaves, setdisplayappliedleaves] = useState(false);
  const[displaysearchleaves,setdisplaysearchleaves]=useState(false);
  
    /* manager data */
    const [persondata, setpersondata] = useState({});
    const [manager_id, setmanager_id] = useState(0);
    const [employee_id, setemployee_id] = useState(0);
    const [Employee_id, setEmployee_id] = useState(0);
  
    /* leave data store */
    const [leave, setleave] = useState([]);
    const [leavetype, setLeavetype] = useState([]);
  
    /*manager data from employee  */
    const [managerdata, setmanagerdata] = useState([]);
  
    /*pending leaves of employee */
    const [pendingLeaveofemployee, setpendingLeaveofemployee] = useState([]);
  
    /*update and save leave of employee */
    const [leave_id, setleave_id] = useState(0);
    const [status, setStatus] = useState("pending");
    const [leaveupdate, setleaveupdate] = useState([]);
  
    /*all employee data  */
    const [employeedata, setemployeedata] = useState([]);
  
    /* set search by employee id */
    const [leavesearch, setleavesearch] = useState([]);
  
    /* save manager leave  */
    const [start_date, setstart_date] = useState("");
    const [end_date, setend_date] = useState("");
    const [nuleaves, setnuleavs] = useState(0);
    const [leavetype_id, setleavetype_id] = useState(0);
    const [comment, setcomment] = useState("");
    const [Result, setResult] = useState(false);
    const [errorMessag, seterrorMessag] = useState("");
  
   
  
    /* login information */
    let nm = JSON.parse(localStorage.getItem("loggedinemp"));
   
  
  
  
    const fetchdataformanagerleaves = () => {
      fetch("http://localhost:8080/getleavebymangid?manager_id=" + p.m_id)
        .then((resp) => resp.json())
        .then((d) => { setleave(d) })
    }
  
    /* data from loging */
    useEffect(() => {
      if (nm.role == "manager") {
    
        fetchdataformanagerleaves();
        /*fetch("http://localhost:8080/getManagerbylogin?login_id=" + nm.login_id)
          .then((resp) => resp.json())
          .then((data) => {
            setpersondata(data); setmanager_id(data.m_id);console.log(data);
  
          });*/
      }
    }, [manager_id]);
    /* leave data of manager/employee */
  
   


    /* we want to see the leave of individual employee search leave by id */
    useEffect(() => {
      if (nm.role == "manager") {
        fetch("http://localhost:8080/allemployee", {
  
          headers: { "content-type": "application/json" }
        })
          .then(req => req.json())
          .then(data => { setemployeedata(data) })
      }
    }, []);
 
   
   
    /*  manager leave apply*/
    const handleSubmitleavemanag = () => {
      if (start_date == "" || end_date == "" || leavetype_id == "") {
        alert("Please select All Required Feilds ")
      }
      else if (validator.isDate(start_date)) {
        alert(" strat date is less then current date")
      }
      else {

      fetch("http://localhost:8080/savemangleave", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          manager_id: nm.m_id,
          start_date: start_date,
          end_date: end_date,
          nuleaves: nuleaves,
          leavetype_id: leavetype_id,
          comment: comment,
          status: status,
  
        })
      })
        .then((resp) => resp.json())
        .then((data) => {
          
          if (data ===true)
            alert("Leave Request is send");
          else
            alert("Leave Request didn't Send");
          //{setleave(data);localStorage.setItem("loggedinemp", JSON.stringify(data))}
        })
      }
    }
    /* counting the leaves and leaving the weekend days and holidays given by company */
    const workingDaysBetweenDates = () => {
      /* Two working days and an sunday (not working day) */
      var holidays = ['2023-01-01', '2023-01-15', '2023-01-16', '2023-01-26', '2023-04-14', '2023-04-22 ', '2023-05-01', '2023-06-29', '2023-08-15', '2023-09-19', '2023-10-02', '2023-10-24', '2023-11-12', '2023-11-13', '2023-12-25'];
      var startDate = parseDate(start_date);
      var endDate = parseDate(end_date);
  
      // Validate input
      if (endDate <= startDate) {
        setnuleavs(0);
        seterrorMessag("End date cannot be less then Start date")
      }
      else
        seterrorMessag("")
      // Calculate days between dates
      var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
      startDate.setHours(0, 0, 0, 1);  // Start just after midnight
      endDate.setHours(23, 59, 59, 999);  // End just before midnight
      var diff = endDate - startDate;  // Milliseconds between datetime objects    
      var days = Math.ceil(diff / millisecondsPerDay);
  
      // Subtract two weekend days for every week in between
      var weeks = Math.floor(days / 7);
      days -= weeks * 2;
  
      // Handle special cases
      var startDay = startDate.getDay();
      var endDay = endDate.getDay();
  
      // Remove weekend not previously removed.   
      if (startDay - endDay > 1) {
        days -= 2;
      }
      // Remove start day if span starts on Sunday but ends before Saturday
      if (startDay == 0 && endDay != 6) {
        days--;
      }
      // Remove end day if span ends on Saturday but starts after Sunday
      if (endDay == 6 && startDay != 0) {
        days--;
      }
      /* Here is the code */
      holidays.forEach(day => {
        if ((day >= start_date) && (day <= end_date)) {
          /* If it is not saturday (6) or sunday (0), substract it */
          if ((parseDate(day).getDay() % 6) != 0) {
            days--;
          }
        }
      });
      setnuleavs(days);
    }
  
    function parseDate(input) {
      // Transform date from text to date
      var parts = input.match(/(\d+)/g);
      // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
      return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
    }
    useEffect(() => {
      fetch("http://localhost:8080/allLeavestype")
        .then(r => r.json())
        .then(d => { setLeavetype(d) })
    }, []);
    /* save  employee leave */
   
    /* convert date time into date format  
    let date1=new Date("2020-06-16T02:55:08.151437Z").toDateString()
    console.log(date1)
    
    let date2=new Date("2020-06-16T02:55:08.151437Z").toUTCString()
    console.log(date2)
    
    let date3=new Date("2020-06-16T02:55:08.151437Z").toLocaleDateString()
    console.log(date3)
    
    let date4=new Date("2020-06-16T02:55:08.151437Z").toLocaleDateString('en-US', {
    month: '2-digit',day: '2-digit',year: 'numeric'})
    console.log(date4)
    
    let date5=new Date("2020-06-16T02:55:08.151437Z").toString()
    console.log(date5)
    
    let date6=new Date("2020-06-16T02:55:08.151437Z").toLocaleString()
    console.log(date6)
    */
  
  

  return (
    <>
      <Button variant="" onClick={handleShow}>
      
      <h5 className="card-title p-0 m-0 text- " style={{color:"#2C85C9"}}>Request Leave</h5>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Manager Leave Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container card ">
            <form className="register-form" >

              <div className="mb-3 pt-2">
                <label htmlFor="Dept" className="form-label">
                  <b>Manager :  </b>
                </label>
                {" " + nm.first_name + " " + nm.last_name}

              </div>
              <div>

                <label><b>Start date:</b></label>
                <input
                  type="Date"
                  disableToolbar
                  mindate={new Date()}

                  value={start_date}
                  name="start_Date"
                  autoComplete="off"
                  onChange={(event) => {
                    setstart_date(event.target.value);
                  }}
                />
                <br /><span style={{
                  fontWeight: 'bold',
                  color: 'red',
                }}>{ }</span>
              </div>
              <br />
              <label><b>End date:</b></label>
              <input
                type="Date"
                name="end_Date"
                autoComplete="off"
                onChange={(event) => {
                  setend_date(event.target.value);
                }}

              /> <span className="btn btn-secondary   " onClick={() => workingDaysBetweenDates()}>
                Leaves
              </span> <br /><span style={{

                color: 'red',
              }}>{errorMessag}</span>


              <div className="mb-3 pt-4 ">
                <label htmlFor="Dept" className="form-label">
                  <b>Number of Leaves:</b>
                </label>
                {nuleaves}
              </div>

              <div className="mb-3">
                <label htmlFor="Dept" className="form-label">
                  <b>leave type:</b>
                </label>
                <select
                  name="leavetype_id"
                  onChange={(e) => {
                    setleavetype_id(e.target.value);
                  }}>
                  <option value='Select'>Type of Leave</option>
                  {leavetype.map(
                    (el) => {
                      return <option value={el.l_id}>{el.leave_type}</option>;
                    }
                  )}
                </select>
              </div>


              <div>
                <label htmlFor="reason" className="form-label"><b>
                  Reason : </b>
                </label>
                <input
                  type="text"
                  name="reason"
                  autoComplete="off"
                  onChange={(event) => {
                    setcomment(event.target.value);
                  }}
                />

              </div>


            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <span className="btn btn-primary   " onClick={() => handleSubmitleavemanag()}>
            Submit
          </span>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default LeavAppl;