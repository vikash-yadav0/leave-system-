import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import add from '../images/add.png';
import validator from 'validator';


const Leaves = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let nm = JSON.parse(localStorage.getItem("loggedinemp"));


  const [LeaveType, setLeavetype] = useState([]);
  const [Result, setResult] = useState("false");
  const [employee_id, setemployee_id] = useState(0);
  const [start_date, setstart_Date] = useState("");
  const [end_date, setend_Date] = useState("");
  const [nuleaves, setnuleavs] = useState(0);
  const [leavetype_id, setleavetype_id] = useState(0);
  const [comment, setreason] = useState("ss");
  const [status, setstatus] = useState("pending");
  const [errorMessage, seterrorMessage] = useState("");
  const [errorMessag, seterrorMessag] = useState("");
  const [manager, setmanager] = useState([]);
  const [manager_id, setmanager_id] = useState(nm.m_id)




  useEffect(() => {
    fetch("http://localhost:8080/getmanager?manager_id=" + nm.m_id)
      .then(r => r.json())
      .then(d => setmanager(d))
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/allLeavestype")
      .then(r => r.json())
      .then(d => { setLeavetype(d) })
  }, []);

  /*useEffect(() => {
    fetch("http://localhost:8080/allemployeeofmanager?manager_id=" + manager_id)
      .then(resp => resp.json())
      .then(data => setemployeedata(data))
  },[])*/

  const handleSubmitleavemanag = (event) => {
    //event.preventDefault();

    if (start_date == "" || end_date == "" || leavetype_id == "") {
      alert("Please select All Required Feilds ")
    }
    else if (validator.isDate(start_date)) {
      alert(" strat date is less then current date")
    }
    else {
      fetch("http://localhost:8080/saveleave", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          employee_id: nm.e_id,
          start_date: start_date,
          end_date: end_date,
          nuleaves: nuleaves,
          leavetype_id: leavetype_id,
          comment: comment,
          status: status,
          manager_id: manager_id
        })
      }, console.log(employee_id, end_date, start_date))
        .then((resp) => resp.json())
        .then((data) => {
          setResult(data)
          if (Result == "true")
            alert("leave is updated, and assigned");
          else
            alert("leave didn't update");
          //{setleave(data);localStorage.setItem("loggedinemp", JSON.stringify(data))}
        });
    }

  }



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
    return setnuleavs(days);
  }

  function parseDate(input) {
    // Transform date from text to date
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
  }


  return (
    <div>
      <Button variant="" onClick={handleShow}>
        <h5 className="card-title p-0 m-0 text-" style={{ color: "#2C85C9" }}>Request Leave</h5>

      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Employee Leave Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container card ">
            <form className="register-form" >

              <div className="mb-1 pt-2">
                <label htmlFor="Dept" className="form-label">
                  <b>Employee :  </b>
                </label>
                {nm.first_name + " " + nm.last_name}

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
                    setstart_Date(event.target.value);
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
                  setend_Date(event.target.value);
                }}

              /> <span className="btn btn-secondary   " onClick={() => workingDaysBetweenDates()}>
                Leaves
              </span> <br /><span style={{

                color: 'red',
              }}>{errorMessag}</span>


              <div className="mb-1 pt-1">
                <label htmlFor="Dept" className="form-label">
                  <b>Number of Leaves:</b>
                </label>
                {nuleaves}
              </div>

              <div className="mb-1">
                <label htmlFor="Dept" className="form-label">
                  <b>leave type:</b>
                </label>
                <select
                  name="leavetype_id"
                  onChange={(e) => {
                    setleavetype_id(e.target.value);
                  }}>
                  <option value='Select'>Type of Leave</option>
                  {LeaveType.map(
                    (el) => {
                      return <option value={el.l_id}>{el.leave_type}</option>;
                    }
                  )}
                </select>
              </div>


              <div>
                <label htmlFor="Dept" className="form-label " style={{}}><b>
                  Reason : </b>
                </label>
                <textarea
                  type="textarea"
                  name="reason"
                  autoComplete="off"
                  onChange={(event) => {
                    setreason(event.target.value);
                  }}
                ></textarea>

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
      <div >
      </div>
    </div>
  );
}
export default Leaves;