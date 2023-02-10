import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import check from '../images/righte.png';
import cross from '../images/crossremain.png';
import pending from '../images/pending.png';
import pen from '../images/resc.png';
import logo from '../images/Logo.png';
import app from '../images/2126884.png';
import pend from '../images/clip1.png';
import clip from '../images/clip.png';
import LeavAppl from "./applic";
import approv from '../images/Approved.png';
import reject from '../images/Rejected.png';
import LeaveApplication from "./LeaveApplication";
import Register from "./RegisterEmplooye";
import add from '../images/add.png';
import ChangePassword from "./ChangePassword";
import UpdateManager from "./UpdateManager";
import Leaves from "./Leaves";
import UpdateEmployee from "./UpdateEmployee";
const LandingPage = () => {

  /* condition on basis of role which part need to show */
  const [mangcondition, setmangcondition] = useState(false);
  const [empcondition, setempcondition] = useState(false);
  /*conditions to show */
  const [displaypendingleaves, setdisplaypendingleaves] = useState(true);
  const [displayappliedleaves, setdisplayappliedleaves] = useState(false);
  const [displaysearchleaves, setdisplaysearchleaves] = useState(false);
  const[displayemployeeonleave,setdisplayemployeeonleave]=useState(false);
  const [displayemployeeofmanager, setdisplayemployeeofmanager] = useState(false);
  const[searchemployee,setsearchemployee]=useState(true);
  const[displayemployeeonleavetable,setdisplayemployeeonleavetable]=useState(false);
  const [employeeshow, setemployeeshow] = useState(false);
  const [managershow, setmanagershow] = useState(false);
  const[active,setactive]=useState(true);
  /* manager data */
  const [persondata, setpersondata] = useState({});
  const [manager_id, setmanager_id] = useState(0);
  const [employee_id, setemployee_id] = useState(0);
  const [Employee_id, setEmployee_id] = useState(0);

  /* leave data store */
  const [leave, setleave] = useState([]);
  const [leavetype, setLeavetype] = useState([]);
  const[end_date,setend_date]=useState();
  const[start_date,setstart_date]=useState();
const[allemployeeonleave,setallemployeeonleave]=useState([]);

  /*manager data from employee  */
  const [managerdata, setmanagerdata] = useState([]);
  const [employeeofmanager, setemployeeofmanager] = useState([]);

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

  /* login information */
  let nm = JSON.parse(localStorage.getItem("loggedinuser"));
  let logout = () => {
    localStorage.removeItem("loggedinuser");
  }

  const navigate = useNavigate();

  /* show data according to role */
  useEffect(() => {

    if (nm.role == "manager")
      setmangcondition(true);
    else if (nm.role == "employee")
      setempcondition(true);

  }, []);
  const fetchdataformanager = () => {
    fetch("http://localhost:8080/getManagerbylogin?login_id=" + nm.login_id)
      .then((resp) => resp.json())
      .then((data) => {localStorage.setItem("loggedinemp", JSON.stringify(data));
        setpersondata(data); setmanager_id(data.m_id); 
     

      });
  }
  const fetchmanagerpendingleaves = () => {

    fetch("http://localhost:8080/allpendingleavesofemployee?manager_id=" + manager_id, {
      method: "GET",
      headers: { "content-type": "application/json" }
    })
      .then(r => r.json())
      .then(d => { setpendingLeaveofemployee(d) });


  }

  const fetchdataformanagerleaves = () => {
    fetch("http://localhost:8080/getleavebymangid?manager_id=" + manager_id)
      .then((resp) => resp.json())
      .then((d) => { setleave(d) })
  }

  const allemployeeofmanager = () => {
    fetch("http://localhost:8080/allemployeeofmanager?manager_id=" + manager_id)
      .then(resp => resp.json())
      .then((d) => { setemployeeofmanager(d) })

  }

  /* data from loging */
  useEffect(() => {
    if (nm.role == "manager") {
      fetchdataformanager();
      fetchmanagerpendingleaves();
      fetchdataformanagerleaves();
      allemployeeofmanager();
      fetchmanageremployee();
      setmanagershow(true);
      setemployeeshow(false);
      setdisplayemployeeonleave(false);

    }

  }, [manager_id]);
  /* leave data of manager/employee */




  const fetchdataforemployee = () => {
    fetch("http://localhost:8080/getmanager?manager_id=" + manager_id)
      .then(r => r.json())
      .then(d => setmanagerdata(d));
  }
  const fetchdataofemployeeleave = () => {
    fetch("http://localhost:8080/getleavebyempid?employee_id=" + employee_id)
      .then((resp) => resp.json())
      .then((d) => { setleave(d); });
  }
  useEffect(() => {
    if (nm.role == "employee") {
      fetchdataofemployeeleave();
      fetchdataforemployee();
      fetchemployeedata();
      setmanagershow(false);
      setemployeeshow(true);
      setdisplaypendingleaves(true);
      setdisplayemployeeonleave(false);
      

      /*fetch("http://localhost:8080/getleavebyempid?employee_id=" + persondata.e_id)
        .then((resp) => resp.json())
        .then((d) => { setleave(d); });*/
    }
  }, [employee_id]);

  const fetchemployeedata = () => {
    fetch("http://localhost:8080/getEmployeebylogin?login_id=" + nm.login_id)
      .then((resp) => resp.json())
      .then((data) => { localStorage.setItem("loggedinemp", JSON.stringify(data)); setpersondata(data); setemployee_id(data.e_id); setmanager_id(data.manager.m_id); });
  }

 


  /* manager/admin accept or reject leave of employee  login */
  const updatePendingLeaveOfEmployee = () => {

    fetch("http://localhost:8080/updateleave?leave_id=" + leave_id + "&status=" + status, {

      method: "POST",
      headers: { "content-type": "application/json" }
    })
      .then(resp => resp.json())
      .then((resp) => { setleaveupdate(resp); });
    if (leaveupdate != null)
      alert("Leave is " + status)
  }


  const approve = (a) => {


    setStatus("approve");
    setleave_id(a);

    updatePendingLeaveOfEmployee();

  }


  const Reject = (a) => {


    setStatus("reject")
    setleave_id(a)
    updatePendingLeaveOfEmployee()
  }

  const activateemployee = (login_id) => {

fetch("http://localhost:8080/updatestatus?login_id="+login_id+"&status="+"active",{
  method: "POST",
  headers: { "content-type": "application/json" }
})
.then(resp=>resp.json())
.then(d=>{
  if(d==true)
  {
    alert("Employee account is activate");
  }
  else
  {
    alert("Try again");
  }
})

  }


  const deactivateemployee = (login_id) => {

    fetch("http://localhost:8080/updatestatus?login_id="+login_id+"&status=deactive",{
    method: "POST",
    headers: { "content-type": "application/json" }})
    .then(resp=>resp.json())
    .then(d=>{
      if(d==true)
      {
        alert("Employee account is deactivate");
      }
      else
      {
        alert("Try again");
      }
    })

  }

  /* we want to see the leave of individual employee search leave by id */
  const fetchmanageremployee = () => {

    fetch("http://localhost:8080/allemployeeofmanager?manager_id=" + manager_id, {

      headers: { "content-type": "application/json" }
    })
      .then(req => req.json())
      .then(data => { setemployeedata(data) })

  }
  const fetchemployeeonleave = () => {

    setsearchemployee(false);
    setdisplayemployeeonleave(true);
    setdisplayemployeeonleavetable(true);
    fetch("http://localhost:8080/employeeonleave?start_date=" + start_date+"&end_date="+end_date, {

      headers: { "content-type": "application/json" }
    })
      .then(req => req.json())
      .then(data => { setallemployeeonleave(data) })

  }
  const FetchEmployee = () => {


    {
      setdisplaypendingleaves(false);
      setdisplayappliedleaves(false);
      setdisplayemployeeofmanager(false);
      setdisplaysearchleaves(true);
      fetch("http://localhost:8080/getleavebyempid?employee_id=" + Employee_id)
        .then(r => r.json())
        .then(d => { setleavesearch(d) });
    }
  }

  /* counting the number of leave taken */
  const callfun = (p) => {
    if ((p.status) == "approve") {
      if ((p.leavetype.leave_type) == "AL")
        countal += (p.nuleavs);
      else if ((p.leavetype.leave_type) == "PL")
        countpl += (p.nuleavs);
      else if ((p.leavetype.leave_type) == "SL")
        countsl += (p.nuleavs);
    }
    else if ((p.status) == "pending")
      countpend += (p.nuleavs);

  }
  var countpl = 0;
  var countal = 0;
  var countsl = 0;
  var countpend = 0;




  useEffect(() => {
    fetch("http://localhost:8080/allLeavestype")
      .then(r => r.json())
      .then(d => { setLeavetype(d) })
  }, []);


  const displaypendigleave = () => {

    setdisplaypendingleaves(true);
    setdisplayappliedleaves(false);
    setdisplaysearchleaves(false);
    setdisplayemployeeofmanager(false);
    setdisplayemployeeonleave(false);
    setsearchemployee(true);
    setdisplayemployeeonleavetable(false);
    
  }

  const displayappliedleave = () => {

    setdisplaypendingleaves(false);
    setdisplayappliedleaves(true);
    setdisplaysearchleaves(false);
    setdisplayemployeeofmanager(false);
    setdisplayemployeeonleave(false);
    setsearchemployee(true);
    setdisplayemployeeonleavetable(false);
  }
  const displayemployeeofmanagerony = () => {
    setdisplayemployeeofmanager(true);
    setdisplaypendingleaves(false);
    setdisplayappliedleaves(false);
    setdisplaysearchleaves(false);
    setdisplayemployeeonleave(false);
    setsearchemployee(true);
    setdisplayemployeeonleavetable(false);
  }
  const displayemployeeonleaveon=()=>{
    setdisplayemployeeonleave(true);
    setdisplayemployeeofmanager(false);
    setdisplaypendingleaves(false);
    setdisplayappliedleaves(false);
    setdisplaysearchleaves(false);
    setsearchemployee(false);
    setdisplayemployeeonleavetable(false);
    

  }

  const date = (p) => {

    startdate = new Date(p.start_date).toLocaleDateString('en-Uk', {
      month: '2-digit', day: '2-digit', year: 'numeric'
    })

    enddate = new Date(p.end_date).toLocaleDateString('en-Uk', {
      month: '2-digit', day: '2-digit', year: 'numeric'
    })
    
  }
  var startdate = 0;
  var enddate = 0;

const joindate=(p)=>{
  joindat = new Date(p.join_date).toLocaleDateString('en-Uk', {
    month: '2-digit', day: '2-digit', year: 'numeric'
  })

}
var joindat=0;


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark  " style={{ boxShadow: 10, color: "black" }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">

          <img style={{ maxBlockSize: 30 }} src={logo} />
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb- mb-lg-0">


              <li className="nav-item dropdown ">
                <a style={{ backgroundColor: "white", color: "black", }} className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Welcome {persondata.first_name}
                </a>
                <ul class="dropdown-menu pr-" >
                  <li className="nav-item mx- mr-" style={managershow ? { display: "block" } : { display: "none" }}>
                    <Register />
                  </li>
                  <li style={managershow ? { display: "block" } : { display: "none" }}><hr class="dropdown-divider" /></li>
                  <li className="nav-item mx-2" style={managershow ? { display: "block" } : { display: "none" }}>
                    <UpdateManager />
                  </li>
                  <li className="nav-item mx-2" style={employeeshow ? { display: "block" } : { display: "none" }}>
                    <UpdateEmployee />
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li className="nav-item mx-2">
                    <ChangePassword />
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li className="nav-item mx-2">
                    <a href="#"
                      type="button"
                      className=" " style={{ textDecoration: "none", textAlign: "center", color: "black" }}
                      aria-current="page"
                      onClick={() => { logout(); navigate("/login") }}
                    >
                      logout
                    </a>
                  </li>

                </ul>
              </li>

            </ul>

          </div>
        </div>
      </nav>
      <div className=" p-1 " style={{ backgroundColor: "lightgray" }}>

      </div>


      <div className="row row-cols-1 row-cols-md-5 g-4 mt-1 " style={{ marginLeft: "1%" , marginRight:"1%"}} >
        <a href="#" style={managershow ? { display: "block", textDecoration: "none", textAlign: "center" } : { display: "none" }} onClick={() => { displaypendigleave() }} >
          <div className="col" >
            <div className="card h-100 border-warning "  >
              <img src={clip} style={{ marginTop: 3, width: 65, height:65, marginLeft: '35%' }} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title" style={{color:"#2C85C9"}}>Pending Approvals</h5>
              </div>

            </div>
          </div>
        </a>
        <a href="#" style={{ textDecoration: "none", textAlign: "center" }} onClick={() => { displayappliedleave() }} >
          <div className="col">
            <div className="card h-100 border-warning">
              <img src={app} style={{ marginTop: 3, width: 65, marginLeft: '35%' }} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title" style={{color:"#2C85C9"}}>My Applied Leaves</h5>
              </div>

            </div>
          </div>
        </a>
        <a href="#" style={{ color:"#2C85C9",textDecoration: "none", textAlign: "center" }} onClick={() => { }} >
          <div className="col">
            <div className="card h-100 border-warning">
              <img src={pend} style={{ marginTop: 3, width: 60, marginLeft: '40%', paddingBottom: 0 }} className="card-img-top" alt="..." />

              <div className="card-body" style={managershow ? { display: "block" } : { display: "none" }}>

                <LeavAppl  id={persondata}/>
              </div>
              <div className="card-body" style={employeeshow ? { display: "block"  ,color:"#2C85C9"} : { display: "none" }}>

                <Leaves />
              </div>
            </div>

          </div></a>
        <a href="#" style={managershow ? { display: "block", textDecoration: "none", textAlign: "center" } : { display: "none" }} onClick={() => { displayemployeeofmanagerony() }} >
          <div className="col">
            <div className="card h-100 border-warning">
              <img src={pen} style={{ marginTop: 1, width: 80, marginLeft: '35%' }} className="card-img-top" alt="..." />
              <div className="card-body m-0 p-2">
                <h5 className="card-title" style={{color:"#2C85C9"}}>All Employees </h5>
                
              </div>
            </div>
          </div>
        </a>
        <a href="#" style={managershow ? { display: "block", textDecoration: "none", textAlign: "center" } : { display: "none" }} onClick={() => { displayemployeeonleaveon() }} >
          <div className="col">
            <div className="card h-100 border-warning">
            <i class="bi bi-calendar3 text-dark" style={{fontSize:50}}></i>
              <div className="card-body m-0 p-2">
                <h5 className="card-title" style={{color:"#2C85C9"}}> Employees On Leave </h5>
              </div>
            </div>
          </div>
        </a>
      </div>

      <div className="container-fluid pt-2 mt-2" style={managershow ?searchemployee? { display: "block", backgroundColor: "whitesmoke" } : { display: "none" }:{ display: "none" }}>
        <label style={{ marginTop: 1, marginLeft: 20 }} htmlFor="Dept" className="form-label"><b>
          Employee :</b>
        </label>
        <select
          name="employee_id"
          onChange={(e) => {
            setEmployee_id(e.target.value);
          }}
          style={{ marginTop: 10 }}
        >
          < option value='Select' style={{ borderRadius: 5 }} >Select</option>
          {employeedata.map(
            (el) => {
              return (<option value={el.employee_id}>{el.first_name}  {el.last_name}</option>)
            }
          )}

        </select>
        <button type="button" className=' ' style={{ borderRadius: 4, marginLeft: "5px", marginTop: "0px", paddingInline: 4, paddingLeft: 5, paddingRight: 5 }} onClick={FetchEmployee}>Search</button>
      </div>
      <div className="container-fluid pt-2 mt-2" style={managershow ?displayemployeeonleave? { display: "block", backgroundColor: "whitesmoke" } : { display: "none" }:{ display: "none" }}>
        <label style={{ marginTop: 1, marginLeft: 20 }} htmlFor="Dept" className="form-label"><b>
          Start Date :</b>
        </label>
        <input
        type="date"
          name="start_dtae"
          onChange={(e) => {
            setstart_date(e.target.value);
          }}
          style={{ marginTop: 10 }}
        />
         <label style={{ marginTop: 1, marginLeft: 20 }} htmlFor="Dept" className="form-label"><b>
          End Date :</b>
        </label>
        <input
        type="date"
          name="end_dtae"
          onChange={(e) => {
            setend_date(e.target.value);
          }}
          style={{ marginTop: 10 }}
        />
   
        <button type="button" className=' ' style={{ borderRadius: 4, marginLeft: "5px", marginTop: "0px", paddingInline: 4, paddingLeft: 5, paddingRight: 5 }} onClick={fetchemployeeonleave}>Search</button>
      </div>
      <div className="managerpage" id="" style={mangcondition ? { display: "block" } : { display: "none" }} >

        {/* pending leaves */}
        <div className="pendingleavemanag" id="pending" style={displaypendingleaves ? { display: "block" } : { display: "none" }}>
          <table className="table mt-" style={{ border: 1 }}>
            <thead className="bg- text-light" style={{ backgroundColor: "#2C85C9" }}>

              <tr style={{ textAlign: "center" }}>
                <th>Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Number of leave</th>
                <th>Type of leave</th>
                <th colSpan={2}>Status</th>

              </tr>
            </thead>

            {pendingLeaveofemployee.map((p, i) => {
              return (

                <tr key={i} style={i % 2 == 0 ? { textAlign: "center", backgroundColor: "white" } : { textAlign: "center", backgroundColor: "whitesmoke" }}>
                  {date(p)}
                  <td>{p.employee.first_name + " " + p.employee.last_name}</td>
                  <td >{startdate}</td>
                  <td >{enddate}</td>
                  <td  >{p.nuleavs}</td>
                  <td >{p.leavetype.leave_type}</td>

                  <td ><button style={{ border: "none", borderRadius: 10, marginRight: 5 }} onClick={() => approve(p.leave_id)} ><i class="bi bi-check-circle-fill  " style={{fontSize:25,color:"green"}} ></i></button>
                  </td>
                  <td > <button style={{ border: "none", borderRadius: 10 }} onClick={() => Reject(p.leave_id)}  ><i class="bi bi-x-circle-fill" style={{fontSize:25,color:"red"}}></i> </button></td>
                </tr>
              );
            })}
          </table>
        </div>

        <div className="searchbyidmanag" style={displaysearchleaves ? { display: "block" } : { display: "none" }}>
          {/*  <div className="container card w-25 ">
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
              */}
          <table className="table  my-" >
            <thead className="bg- text-light" style={{ backgroundColor: "#2C85C9" }}>

              <tr>
                <th>Name</th>
                <th>Start Date</th>
                <th>End date</th>
                <th>Number of leave</th>
                <th>Type of leave</th>
                <th>Status</th>

              </tr>
            </thead>
            {leavesearch.map((p, i) => {

              return (
                <tr key={i} style={i % 2 == 0 ? { textAlign: "", backgroundColor: "white" } : { textAlign: "", backgroundColor: "whitesmoke" }}>
                  {date(p)}
                  <td >{p.employee.first_name + " " + p.employee.last_name}</td>
                  <td >{startdate}</td>
                  <td >{enddate}</td>
                  <td >{p.nuleavs}</td>
                  <td >{p.leavetype.leave_type}</td>
                  <td >{p.status == "approve" ? <i class="bi bi-check-circle-fill  " style={{fontSize:25,color:"green"}} ></i> : p.status == "pending" ?<i class="bi bi-hourglass-split" style={{fontSize:25,color:"orange"}}></i> : <i class="bi bi-x-circle-fill" style={{fontSize:25,color:"red"}}></i>}</td>
                  {callfun(p)}
                </tr>

              );

            })}
            <tr className="text-light" style={{ backgroundColor: "#2C85C9" }}>
              <td><b>Total leaves :</b>{countpl + countsl + countal}/20</td>
              <td><b>Pending leave :</b>{countpend}/20</td>
              <td><b>Pl leaves :</b>{countpl}</td>
              <td><b>Al leaves :</b>{countal}</td>
              <td><b>Sl leave :</b>{countsl}</td>
              <td></td>
            </tr>

            {/*    <tr className="text-light"  style={{backgroundColor:"#2C85C9"}}>
              <td><b>Total leaves :</b>{countpl + countsl + countal}/20</td>
              <td><b>Pending leave :</b>{countpend}/20</td>
              <td><b>Pl leaves :</b>{countpl}</td>
              <td><b>Al leaves :</b>{countal}</td>
              <td><b>Sl leave :</b>{countsl}</td>
              <td></td>
          </tr>*/}
          </table>
        </div>

        <div className="manageremployee" style={displayemployeeofmanager ? { display: "block" } : { display: "none" }}>
          <table className="table  my-">
            <thead className="bg- text-light" style={{ backgroundColor: "#2C85C9",textAlign:"center" }}>

              <tr textAlign="center">

                <th>First Name</th>
                <th>Gender </th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Job Title</th>
                <th>Location</th>
                <th>Join Date</th>
                <th>Add Leave</th>
                <th style={{ textAlign: "center" }} colSpan={2}>Employee Status</th>
              </tr>
            </thead>

            {employeeofmanager.map((p, i) => {

              return (

                <tr key={i} style={i % 2 == 0 ? { textAlign: "center", backgroundColor: "white" } : { textAlign: "center", backgroundColor: "whitesmoke" }}>
              {joindate(p)}
               
                  <td >{p.first_name} {p.last_name}</td>
                  <td >{p.gender}</td>
                  <td >{p.phone}</td>
                  <td >{p.email}</td>
                  <td >{p.job_title}</td>
                  <td >{p.location}</td>
                  <td >{joindat}</td>
                  
                  <td><LeaveApplication id={p} /></td>
                  
                  <td style={p.login.status=="active"?{display:"none"}:{display:"block"}} ><button style={{ border: "none", borderRadius: 10, marginRight: 5 }} onClick={() => activateemployee(p.login.login_id)} ><i class="bi bi-person-fill-check" style={{fontSize:45,color:"green"}}></i></button>
                  </td>
                  <td style={p.login.status=="deactive"?{display:"none"}:{display:"block"}}> <button style={{ border: "none", borderRadius: 10 }} onClick={() => deactivateemployee(p.login.login_id)}  ><i class="bi bi-person-fill-slash" style={{fontSize:45,color:"red"}}></i> </button></td>

                </tr>
              )
            })}

         

          </table>

        </div>
        <div className="manageremployee" style={displayemployeeonleavetable?  { display: "block" }:{display:"none"} }>
          <table className="table  my-">
            <thead className="bg- text-light" style={{ backgroundColor: "#2C85C9", textAlign:"center" }}>

              <tr textAlign="center">

                <th>First Name</th>
             
                <th> Phone Number</th>
                <th>Email</th>
                <th>Start date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th style={{ textAlign: "center" }} colSpan={2}>Employee Status</th>
              </tr>
            </thead>

            {allemployeeonleave.map((p, i) => {

              return (

                <tr key={i} style={i % 2 == 0 ? { textAlign: "center", backgroundColor: "white" } : { textAlign: "center", backgroundColor: "whitesmoke" }}>
             
             {date(p)}
                  <td >{p.employee.first_name} {p.employee.last_name}</td>
                  <td >{p.employee.phone}</td>
                  <td>{p.employee.email}</td>
                  <td >{startdate}</td>
                <td >{enddate}</td>
                  <td >{p.comment}</td>
                  <td >{p.status == "approve" ? <i class="bi bi-check-circle-fill  " style={{fontSize:25,color:"green"}} ></i> : p.status == "pending" ?<i class="bi bi-hourglass-split" style={{fontSize:25,color:"orange"}}></i> : <i class="bi bi-x-circle-fill" style={{fontSize:25,color:"red"}}></i>}</td>
               
                </tr>
              )
            })}



          </table>

        </div>
      </div>
      <div className="selfleavemanag" style={displayappliedleaves ? managershow ? { display: "block" } : { marginTop: 8, paddingTop: 3, display: "block" } : { display: "none" }}>
        <table className="table  my-">
          <thead className="bg- text-light" style={{ backgroundColor: "#2C85C9" ,textAlign:"center"}}>

            <tr>

              <th>Start Date</th>
              <th>End date</th>
              <th>Number of leave</th>
              <th>Typle of leave</th>
              <th>Status</th>

            </tr>
          </thead>

          {leave.map((p, i) => {

            return (

              <tr key={i} style={i % 2 == 0 ? { textAlign: "center", backgroundColor: "white" } : { textAlign: "center", backgroundColor: "whitesmoke" }}>
                {date(p)}
                <td >{startdate}</td>
                <td >{enddate}</td>
                <td >{p.nuleavs}</td>
                <td >{p.leavetype.leave_type}</td>
                <td >{p.status == "approve" ? <i class="bi bi-check-circle-fill  " style={{fontSize:25,color:"green"}} ></i> : p.status == "pending" ?<i class="bi bi-hourglass-split" style={{fontSize:25,color:"orange"}}></i> : <i class="bi bi-x-circle-fill" style={{fontSize:25,color:"red"}}></i>}</td>
                 {callfun(p)}
              </tr>
            )
          })}

          <tr className="text-light" style={{ backgroundColor: "#2C85C9" }}>
            <td><b>Total leaves :</b>{countpl + countsl + countal}/20</td>
            <td><b>Pending leave :</b>{countpend}/20</td>
            <td><b>Pl leaves :</b>{countpl}</td>
            <td><b>Al leaves :</b>{countal}</td>
            <td><b>Sl leave :</b>{countsl}</td>
            <td></td>
          </tr>


        </table>
      </div>
     
    </div>
  )

}

export default LandingPage;