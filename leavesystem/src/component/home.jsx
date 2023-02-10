import { useState, useEffect } from "react";
//import Login from "./Login";
import { useNavigate } from "react-router-dom/dist";

const HomeLand = () => {
  // const navigate = useNavigate();
  let nm = JSON.parse(localStorage.getItem("loggedinuser"));

  const [manager_id, setmanager_id] = useState(0);
  const [manager, setmanager] = useState([]);
  const [condition, setcondition] = useState(false);
  const [empcondition, setempcomdition] = useState(false);
  const [leaveofemployee, setLeaveofemployee] = useState([]);
  const [leave, setleave] = useState([]);
  const [status, setStatus] = useState("pending");
  const [leave_id, setLeaveId] = useState(0);
  const [employee, setEmployee] = useState([])
  const [leavesearch, setleavesearch] = useState([]);
  const [LeaveType, setLeavetype] = useState([]);
  const [Result, setResult] = useState("false");
  const [start_date, setstart_Date] = useState("");
  const [end_date, setend_Date] = useState("");
  const [nuleaves, setnuleavs] = useState(0);
  const [leavetype_id, setleavetype_id] = useState(0);
  const [comment, setreason] = useState("ss");
  const [errorMessag, seterrorMessag] = useState("");
  const [employeedata, setemployeedata] = useState([]);
  const [employee_id, setEmployee_id] = useState(0);
  const[managerdata,setmanagerdata]=useState([]);
  const navigate = useNavigate();
  let logout = () => {
    localStorage.removeItem("loggedinuser");
  }
  const [empdata, setempdata] = useState(0);


/* loging according to the role and get data of that employee or manager */
  useEffect(() => {
    if(nm.role=="manager"){
    fetch("http://localhost:8080/getManagerbylogin?login_id=" + nm.login_id)
      .then((resp) => resp.json())
      .then((data) => {
        { 
           fetch("http://localhost:8080/getleavebymangid?manager_id=" + data.m_id)
        .then((resp) => resp.json())
        .then((d) => {
          {
            setleave(d);
          }
        });
          setmanager_id(data.m_id); setmanager(data);
        };
      })    
    }
  else  if(nm.role=="employee"){
      fetch("http://localhost:8080/getEmployeebylogin?login_id=" + nm.login_id)
        .then((resp) => resp.json())
        .then((data) => {
          { 
            
            setmanager_id(data.E_id); setmanager(data);
          };
        }) 
        fetch("http://localhost:8080/getleavebyempid?employee_id=" + manager_id)
        .then((resp) => resp.json())
        .then((d) => {
          {
            setleave(d);console.log(manager)
          }
        });
        fetch("http://localhost:8080/getmanager?manager_id=" + manager.manager.manager_id)
        .then(r => r.json())
        .then(d => setmanagerdata(d))   
      }

  }, []);

  /* we can get there personal leaves by role */

/* hide and show the data according to the role */
  useEffect(() => {

    if (nm.role == "manager")
      setcondition(true);
    else if (nm.role == "employee")
      setempcomdition(true);

  }, []);



  /* manager/admin accept or reject leave of employee  login */
  const handleSubmit = () => {

    fetch("http://localhost:8080/updateleave?leave_id=" + leave_id + "&status=" + status, {

      method: "POST",
      headers: { "content-type": "application/json" }
    })
      .then(resp => resp.json())
      .then((resp) => { setEmployee(resp); });
    if (employee != null)
      alert("Leave is " + status)
  }
  /* manager will get all pending leaves  of employee of its department  */
  useEffect(() => {
    fetch("http://localhost:8080/allpendingleavesbydept?manager_id=" + manager_id)
      .then(r => r.json())
      .then(d => { setLeaveofemployee(d) })
  }, [manager_id]);

  const approve = (a) => {


    setStatus("approve")
    setLeaveId(a)
    handleSubmit()

  }
  const Reject = (a) => {


    setStatus("reject")
    setLeaveId(a)
    handleSubmit()
  }

  /* we want to see the leave of individual employee search leave by id */
 

  useEffect(() => {
    fetch("http://localhost:8080/allemployee", {

      headers: { "content-type": "application/json" }
    })
      .then(req => req.json())
      .then(data => { setemployeedata(data) })
  }, []);

  const FetchEmployee = () => {

    if (employee_id == null)
      alert("please select any employee")
    else {

      fetch("http://localhost:8080/getleavebyempid?employee_id=" + employee_id)
        .then(r => r.json())
        .then(d => { setleavesearch(d) });
    }
  }
  /* counting the number of leave taken */
  const callfun = (p) => {
    if ((p.status) == "approve")
      if ((p.leavetype.leave_type) == "AL")
        countal += (p.nuleavs);
      else if ((p.leavetype.leave_type) == "PL")
        countpl += (p.nuleavs);
      else if ((p.leavetype.leave_type) == "SLs")
        countsl += (p.nuleavs);

  }
  var countpl = 0;
  var countal = 0;
  var countsl = 0;

  /*  manager leave apply*/
  const handleSubmitleavemanag = () => {
   


    fetch("http://localhost:8080/savemangleave", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        manager_id: manager.m_id,
        start_date: start_date,
        end_date: end_date,
        nuleaves: nuleaves,
        leavetype_id: leavetype_id,
        comment: comment,
        status: status,

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

/*  useEffect(() => {
    fetch("http://localhost:8080/getmanager?manager_id=" + manager.m_id)
      .then(r => r.json())
      .then(d => setmanager(d))
  }, []);*/

  const handleSubmitforemployee = () => {
  
    fetch("http://localhost:8080/saveleave", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        employee_id: employee_id,
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
      <div className="managerpage" style={empcondition ? { display: "block" } : { display: 'none' }}>
        <div className="pendingleavemanag"  >
          <table className="table mt-5">
            <thead className="bg-dark text-light">

              <tr style={{ textAlign: "center" }}>
                <th>Name</th>
                <th>Start Date</th>
                <th>End date</th>
                <th>Number of leave</th>
                <th>typle of leave</th>
                <th colSpan={2}>Status</th>

              </tr>
            </thead>
            {leaveofemployee.map((p) => {

              return (
                <tr key={Math.random()} style={{ textAlign: "center" }}>
                  <td style={{ backgroundColor: "lightseagreen" }}>{p.employee.first_name + " " + p.employee.last_name}</td>
                  <td style={{ backgroundColor: "lightgray" }}>{p.start_date}</td>
                  <td style={{ backgroundColor: "lightgray" }}>{p.end_date}</td>
                  <td style={{ backgroundColor: "lightskyblue" }}>{p.nuleavs}</td>
                  <td style={{ backgroundColor: "lightpink" }}>{p.leavetype.leave_type}</td>

                  <td style={{ backgroundColor: "lightgoldenrodyellow" }}><button style={{ backgroundColor: "green", borderRadius: 10, marginRight: 5 }} onClick={() => approve(p.leave_id)} >Approve</button>
                  </td>
                  <td style={{ backgroundColor: "lightgoldenrodyellow" }}> <button style={{ backgroundColor: "red", borderRadius: 10 }} onClick={() => Reject(p.leave_id)}  >Reject </button></td>
                </tr>
              );
            })}


          </table>
        </div>


        <div className="searchbyidmanag">
          <div className="container card w-25 ">
            <label htmlFor="Dept" className="form-label"><b>
              Employee :</b>
            </label>
            <select
              name="employee_id"
              onChange={(e) => {
                setEmployee_id(e.target.value);
              }}
            >
              <option value='Select'>Select Employee</option>
              {employeedata.map(
                (el) => {
                  return (<option value={el.employee_id}>{el.first_name}  {el.last_name}</option>)
                }
              )}

            </select>
            <button className='btn btn-primary mx-5' style={{ marginLeft: "10px", marginTop: "10px" }} onClick={FetchEmployee}>Search</button>
          </div>

          <table className="table  my-4">
            <thead className="bg-dark text-light">

              <tr>
                <th>Name</th>
                <th>Start Date</th>
                <th>End date</th>
                <th>Number of leave</th>
                <th>typle of leave</th>
                <th>Status</th>

              </tr>
            </thead>
            {leavesearch.map((p) => {

              return (
                <tr>
                  <td style={{ backgroundColor: "lightseagreen" }}>{p.employee.first_name + " " + p.employee.last_name}</td>
                  <td style={{ backgroundColor: "lightgray" }}>{p.start_date}</td>
                  <td style={{ backgroundColor: "lightgray" }}>{p.end_date}</td>
                  <td style={{ backgroundColor: "lightskyblue" }}>{p.nuleavs}</td>
                  <td style={{ backgroundColor: "lightpink" }}>{p.leavetype.leave_type}</td>
                  <td style={{ backgroundColor: "lightgoldenrodyellow" }}>{p.status}</td>
                  {() => { callfun(p) }}
                </tr>

              );
            })}

            <tr style={{ backgroundColor: "lightcyan" }}>
              <td><b>Total leaves :</b>{countpl + countsl + countal}/20</td>
              <td><b>Remaning leave :</b>{20 - (countpl + countsl + countal)}/20</td>
              <td><b>Pl leaves :</b>{countpl}</td>
              <td><b>Al leaves :</b>{countal}</td>
              <td><b>Sl leave :</b>{countsl}</td>
              <td></td>
            </tr>
          </table>
        </div>


        <div className="selfleavemanag">
          <table className="table  my-4">
            <thead className="bg-dark text-light">

              <tr>
                <th>Name</th>
                <th>Start Date</th>
                <th>End date</th>
                <th>Number of leave</th>
                <th>typle of leave</th>
                <th>Status</th>

              </tr>
            </thead>

            {leave.map((p) => {

              return (

                <tr>

                  <td style={{ backgroundColor: "lightseagreen" }}>{p.manager.first_name + " " + p.manager.last_name}</td>
                  <td style={{ backgroundColor: "lightgray" }}>{p.start_date}</td>
                  <td style={{ backgroundColor: "lightgray" }}>{p.end_date}</td>
                  <td style={{ backgroundColor: "lightskyblue" }}>{p.nuleavs}</td>
                  <td style={{ backgroundColor: "lightpink" }}>{p.leavetype.leave_type}</td>
                  <td style={{ backgroundColor: "lightgoldenrodyellow" }}>{p.status}</td>
                  {callfun(p)}


                </tr>
              )
            })}

            <tr style={{ backgroundColor: "lightcyan" }} >
              <td><b>Total leaves :</b>{countpl + countsl + countal}/20</td>
              <td><b>Remaning leave :</b>{20 - (countpl + countsl + countal)}/20</td>
              <td><b>Pl leaves :</b>{countpl}</td>
              <td><b>Al leaves :</b>{countal}</td>
              <td><b>Sl leave :</b>{countsl}</td>
              <td></td>
            </tr>


          </table>

        </div>

        <div className="applyleavemanag">
          <div >

            <div className="container card my-2 w-25">
              <form className="register-form" onSubmit={handleSubmit}>
                <h3 style={{ textAlign: "center", backgroundColor: "lightgray" }} className="mt-2"> Leave Application </h3>
                <div className="mb-3 pt-2">
                  <label htmlFor="Dept" className="form-label">
                    <b>Manager :  </b>
                  </label>
                  {" " + manager.first_name + " " + manager.last_name}

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
                    {LeaveType.map(
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
                      setreason(event.target.value);
                    }}
                  />

                </div>
                <br />
                <span className="btn btn-primary  container " onClick={() => handleSubmitleavemanag()}>
                  Submit
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="employeepage" style={condition ? { display: "block" } : { display: 'none' }}>
      <div className="employeeapplingleave">
        <div className="container card my-2 w-25">
          <form className="register-form" onSubmit={handleSubmitforemployee}>
            <h3 style={{ textAlign: "center", backgroundColor: "lightgray" }} className="mt-2"> Leave Application </h3>
            <div className="mb-3 pt-2">
              <label htmlFor="Dept" className="form-label">
                <b>Employee :  </b>
              </label>
              {" " + nm.first_name + " " + nm.last_name}

            </div>


            <div>

              <label><b>Start date:</b></label>
              <input
                type="Date"
                disableToolbar
                minDate={new Date()}

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
                {LeaveType.map(
                  (el) => {
                    return <option value={el.l_id}>{el.leave_type}</option>;
                  }
                )}
              </select>
            </div>


            <div>
              <label htmlFor="Dept" className="form-label"><b>
                Reason : </b>
              </label>
              <input
                type="text"
                name="reason"
                autoComplete="off"
                onChange={(event) => {
                  setreason(event.target.value);
                }}
              />

            </div>
            <br />
            <div className="mb-3">
              <label htmlFor="Dept" className="form-label">
                <b>Manager:</b>
              </label>
              {managerdata.first_name + " " + managerdata.last_name}
            </div>
            <span className="btn btn-primary  container " onClick={() => handleSubmitforemployee()}>
              Submit
            </span>
          </form>
        </div>
      </div>
    
      </div>
    </div>
  );
};
export default HomeLand;
