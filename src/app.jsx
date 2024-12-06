// to-do: deleting current term causes newTaskData to malfunction (no default class)

import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from "react-router-dom";
import './app.css';
import './color.css';
import { useLocation } from 'react-router-dom';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { Classes } from './classes/classes';
import { Terms } from './terms/terms';
import { DatePicker } from 'rsuite';
import 'rsuite/DatePicker/styles/index.css';
import {FaCalendar} from 'react-icons/fa';
import format from 'date-fns/format';
import getUserData from './functions/getUserData';
import addUserData from './functions/addUserData';


export default function App() {
    // const [userData, setUserData] = useState(getUserData());
    const [dataReady, setDataReady] = useState(false);
    const [userData, setUserData] = useState({});
    const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showExamModal, setShowExamModal] = useState(false);
    const [currentTerm, setCurrentTerm] = useState("0");
    const [authenticated, setAuthenticated] = useState(userId!==""?true:false);
    const [newTaskClassDropdownContent, setNewTaskClassDropdownContent] = useState([]);
    const [termDropdownContent, setTermDropdownContent] = useState([]);
    const [defaultClass, setDefaultClass] = useState("");
    const [notification, setNotification] = useState('');
    const [notificationState, setNotificationState] = useState("active")
    const [lastNotification, setLastNotification] = useState(-1);
    const [socketOpen, setSocketOpen] = useState(false);
    const [webSocket, setWebSocket] = useState(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/userdata/' + userId);
                const data = await response.json();
                let tempData = {...data};
                tempData.userId = userId;
                tempData.newTask = {};
                await setUserData(tempData);
                await setCurrentTerm(Object.keys(tempData.terms)[0]);
                await initialize(tempData, Object.keys(tempData.terms)[0]);
                setDataReady(true);
            } catch (error) {
                console.log(error);
            } 
        }
        if (authenticated) {
            fetchData();
        // console.log("Fetching data...")
        // fetch('/api/userdata/' + userId)
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log(data);
        //     let tempData = {...data};
        //     tempData.userId = userId;
        //     console.log(tempData);
        //     setUserData(tempData);
        //     initialize(tempData);
        //     setCurrentTerm(Object.keys(tempData.terms)[0]);
        //     setDataReady(true);
        //   });
        }
      }, [userId, authenticated]);
    
      React.useEffect(() => {
        if (Object.keys(userData).length !== 0) {
            initialize(userData, currentTerm);
        } 
      }, [userData, currentTerm])
    
    

    // Run this only if the user is authenticated and data is ready to be processed
    // These functions will break if userData is not properly set, so we wait until dataReady is true and the user is authenticated
    function initialize(data, currentTerm) {
        // Set default term that the user is working in
        for (const [key, value] of Object.entries(data.classes)) {
            if (value.term === currentTerm) {
                setDefaultClass(key);
            }
        }
        // Reset new task creation
        
        // if (!data.newTask.hasOwnProperty("classId")) resetNewTask();
        // Generate dropdown list of classes for task creation modal
        let content = [];
        for (const [key, value] of Object.entries(data.classes)) {
            if (value.term === currentTerm) {
                content.push(
                    <Dropdown.Item
                    as="button"
                    eventKey={key}
                    key={key}
                    onClick={() => {updateNewTask("classId", key)}}>
                    {value.name}
                    </Dropdown.Item>
                );
            }
        }
        setNewTaskClassDropdownContent(content);
        // Generate dropdown list of terms for navbar
        let content2 = [];
        for (const [key, value] of Object.entries(data.terms)) {
            content2.push(
                <NavDropdown.Item key={key}>
                    <Button variant="tertiary" onClick={() => setCurrentTerm(key)} className="dropdown-item">{value.name}</Button>
                </NavDropdown.Item>
            );
        };
        setTermDropdownContent(content2);
    }

    function notificationTimeout(ms) {
        setTimeout(() => {
            if (Date.now()-lastNotification >= (ms-100))
            setNotificationState("inactive");
        }, ms);
        
    }

    // WebSocket

    
    useEffect(() => {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        let socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        // Display that we have opened the webSocket
        socket.onopen = (event) => {
            setSocketOpen(true);
            console.log("Socket connected");
        };

        socket.onmessage = async (event) => {
            console.log("Message recieved:", event);
            let message = JSON.parse(event.data);
            console.log(`${message.user} just sent a message of action ${message.action}`);
            if (message.action === "assignment" || message.action === "exam") {
                let options = [
                    `Way to go! ${message.user} just finished an ${message.action}!`,
                    `Time to celebrate! ${message.user} just finished an ${message.action}!`,
                    `Good job! ${message.user} just finished an ${message.action}!`,
                ]
            setNotification(options[Math.floor(Math.random() * options.length)]);
            setNotificationState("active");
            setLastNotification(Date.now());
            notificationTimeout(3000);
        }};

        socket.onclose = (event) => {
            setSocketOpen(false);
            console.log("Socket disconnected");
        };
        setWebSocket(socket);
    
    },[])

    

    function send(user, action) {
        console.log("Send message");
        webSocket.send(`{"user":"${user}", "action":"${action}"}`);
    }
    


    // Utility functions 

    function handleModal(action, modal) {
        modal === "task" ? setShowTaskModal(!showTaskModal) : setShowExamModal(!showExamModal);
        if (action === "open") {
            resetNewTask();
        }
    }

    function updateNewTask(key, value) {
        let data = {...userData};
        data.newTask[key] = value;
        setUserData(data);
    }

    function getNewTaskClass() {
        if (!userData.newTask.hasOwnProperty("classId") || !userData.classes.hasOwnProperty(userData.newTask.classId)) {
            return {name: "No classes found"}
        } else {
            return userData.classes[userData.newTask.classId]
        }
    }

    function createTask(type, data, close=true) {
        console.log("Attempt to create task, data:", data);
        let id = "";
        while (id === "") {
            let tempId = Math.floor(Math.random() * 90000) + 10000;
            if (!userData.assignments.hasOwnProperty(tempId) && !userData.exams.hasOwnProperty(tempId)) {
                id = tempId;
            }
        }
        if (type === "assignment") {
            if (data.hasOwnProperty('name') && data.hasOwnProperty('due') && data.hasOwnProperty('finish') && data.hasOwnProperty('classId')) {
                addUserData(userData, setUserData, "assignments", id, data);
                // resetNewTask();
                if (close) handleModal("close", "task");
                return(true)
            } else {

                return(false)
            }
        } else if (type === "exam") {
            if (data.hasOwnProperty('name') && data.hasOwnProperty('open') && data.hasOwnProperty('close') && data.hasOwnProperty('finish') && data.hasOwnProperty('classId')) {
                addUserData(userData, setUserData, "exams", id, data);
                // resetNewTask();
                if (close) handleModal("close", "exam");
                return(true)
            } else {
                return(false)
            }
        }
    }

    function resetNewTask() {
        if (authenticated && dataReady) {
            let data = {...userData};
            data.newTask = {classId: defaultClass};
            setUserData(data);
        }
    }

    function logout() {
        localStorage.removeItem('userId');
        setAuthenticated(false);
        setUserId("0");
        fetch(`/api/auth/logout`, {
            method: 'delete',
          })
            .catch((error) => {
              console.log(error);
            })
    }

    
        

    
      
    if (dataReady || !authenticated) {
    return (
    <BrowserRouter>
    <div className="d-flex min-vh-100 flex-column">
        
        <header className="sticky-top">
            <Navbar expand="md" className="bg-body-tertiary px-3">
            <Container style={{ flex: "1 1 0" }}>
                <Navbar.Brand className="navbar-brand text-primary d-md-none">
                    <i className="fa-solid fa-book" /> <strong>homework</strong>hub
                </Navbar.Brand>
                {authenticated &&
                <Navbar.Toggle
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                    <i className="fa-solid fa-bars text-primary" />
                </Navbar.Toggle>
                }
                <Navbar.Collapse
                className="justify-content-between align-items-center"
                id="navbarSupportedContent"
                >
                    <Nav
                        className="justify-content-start d-none d-md-inline"
                        style={{ flex: "1 1 0" }}
                    >
                        <Nav.Item className="my-auto">
                        <Navbar.Brand className="me-auto text-primary">
                            <i className="fa-solid fa-book" /> <strong>homework</strong>hub
                        </Navbar.Brand>
                        </Nav.Item>
                    </Nav>

                     {authenticated && dataReady &&
                     <>
                    <Nav
                        className="justify-content-center"
                        style={{ flex: "1 1 0" }}
                    >
                        <NavDropdown className="w-100 dropdown-center justify-content-center text-center m-auto p-0 no-caret" title={<i className="fa-solid fa-plus text-md-end fs-3"></i>}>
                            <NavDropdown.Item>
                            <Button onClick={() => handleModal("open", "task")} variant="tertiary" className="d-inline w-100">
                                Create Task
                            </Button>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                            <Button onClick={() => handleModal("open", "exam")} variant="tertiary" className="d-inline w-100">
                                Create Exam
                            </Button>
                            </NavDropdown.Item>

                        </NavDropdown>
                    </Nav>
                    
                    <Nav
                        className="justify-content-end text-center"
                        style={{ flex: "1 1 0" }}
                    >
                        <NavDropdown title={userData.terms[currentTerm].name}>
                            {termDropdownContent}
                            <Dropdown.Divider />
                            <Dropdown.Item to={"../terms"} as={Link} eventKey="0">Manage...</Dropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={userData.username === "" ? "[User is unauthenticated]" : userData.username}>
                            <NavDropdown.Item>
                                <Link className="btn dropdown-item" onClick={() => logout()} to="/">Log out</Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </>
                    }
                  
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
        {authenticated &&
        <Modal
        show={showTaskModal}
        onHide={() => handleModal("close", "task")}
        >
       <Modal.Header closeButton>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <label className="mt-2 mb-1" htmlFor="assignment">Assignment</label>
                <input onChange={(event) => updateNewTask("name", event.target.value)} type="text" className="form-control" id="assignment" name="assignment"/>
                
                <label className="mt-2 mb-1" htmlFor="duedate">Due Date</label>
                {/* <input onChange={(event) => updateNewTask("due", event.target.value)} type="date" className="form-control" id="duedate" name="duedate"/> */}
                <DatePicker
                placement="autoVerticalStart"
                editable={false}
                placeholder="Choose date"
                format="MM/dd/yyyy hh:mm aa"
                showMeridiem
                renderValue={value => {
                return format(value, 'EEE, MMM d');
                }}
                caretAs={FaCalendar}
                cleanable={false}
                block={true}
                onChange={(date) => updateNewTask("due", date)}
                className="form-control-date"
            />

                <label className="mt-2 mb-1" htmlFor="finishdate">Finish By</label>
                {/* <input onChange={(event) => updateNewTask("finish", event.target.value)} type="date" className="form-control" id="finishdate" name="finishdate"/> */}
                <DatePicker
                placement="autoVerticalStart"
                editable={false}
                placeholder="Choose date"
                format="MM/dd/yyyy hh:mm aa"
                showMeridiem
                renderValue={value => {
                return format(value, 'EEE, MMM d');
                }}
                caretAs={FaCalendar}
                cleanable={false}
                block={true}
                onChange={(date) => updateNewTask("finish", date)}
                className="form-control-date"
            />
                <label className="mt-2 mb-1" htmlFor="class">Class</label>
                <DropdownButton variant="tertiary" title={getNewTaskClass().name} className="form-style-dropdown text-start">
                    {newTaskClassDropdownContent}
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4" href="classes">Manage...</Dropdown.Item>
                </DropdownButton>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='tertiary' onClick={() => handleModal("close", "task")}>Close</Button>
                <Button variant='tertiary' onClick={() => createTask("assignment", JSON.parse(JSON.stringify(userData.newTask)), close=false)}>Create & Copy</Button>
                <Button variant='primary' onClick={() => createTask("assignment", userData.newTask)}>Create</Button>
            </Modal.Footer>
        </Modal>
        }
        {authenticated &&
        <Modal
        show={showExamModal}
        onHide={() => handleModal("close", "exam")}
        >
       <Modal.Header closeButton>
          <Modal.Title>New Exam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <label className="mt-2 mb-1" htmlFor="assignment">Exam</label>
                <input onChange={(event) => updateNewTask("name", event.target.value)} type="text" className="form-control" id="assignment" name="assignment"/>
                
                <label className="mt-2 mb-1" htmlFor="opendate">Open Date</label>
                {/* <input onChange={(event) => updateNewTask("open", event.target.value)} type="date" className="form-control" id="opendate" name="opendate"/> */}
                <DatePicker
                placement="autoVerticalStart"
                editable={false}
                placeholder="Choose date"
                format="MM/dd/yyyy hh:mm aa"
                showMeridiem
                renderValue={value => {
                return format(value, 'EEE, MMM d');
                }}
                caretAs={FaCalendar}
                cleanable={false}
                block={true}
                onChange={(date) => updateNewTask("open", date)}
                className="form-control-date"
            />
                <label className="mt-2 mb-1" htmlFor="closedate">Close Date</label>
                {/* <input onChange={(event) => updateNewTask("close", event.target.value)} type="date" className="form-control" id="closedate" name="closedate"/> */}
                <DatePicker
                placement="autoVerticalStart"
                editable={false}
                placeholder="Choose date"
                format="MM/dd/yyyy hh:mm aa"
                showMeridiem
                renderValue={value => {
                return format(value, 'EEE, MMM d');
                }}
                caretAs={FaCalendar}
                cleanable={false}
                block={true}
                onChange={(date) => updateNewTask("close", date)}
                className="form-control-date"
            />
                <label className="mt-2 mb-1" htmlFor="finishdate">Finish By</label>
                {/* <input onChange={(event) => updateNewTask("finish", event.target.value)} type="date" className="form-control" id="finishdate" name="finishdate"/> */}
                <DatePicker
                placement="autoVerticalStart"
                editable={false}
                placeholder="Choose date"
                format="MM/dd/yyyy hh:mm aa"
                showMeridiem
                renderValue={value => {
                return format(value, 'EEE, MMM d');
                }}
                caretAs={FaCalendar}
                cleanable={false}
                block={true}
                onChange={(date) => updateNewTask("finish", date)}
                className="form-control-date"
            />
                <label className="mt-2 mb-1" htmlFor="class">Class</label>
                <DropdownButton variant="tertiary" title={getNewTaskClass().name} className="form-style-dropdown text-start">
                    {newTaskClassDropdownContent}
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4" href="classes">Manage...</Dropdown.Item>
                </DropdownButton>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='tertiary' onClick={() => handleModal("close", "exam")}>Close</Button>
                <Button variant='tertiary' onClick={() => createTask("exam", userData.newTask, close=false)}>Create & Copy</Button>
                <Button variant='primary' onClick={() => createTask("exam", userData.newTask)}>Create</Button>
            </Modal.Footer>
        </Modal>
        }

        <main className="flex-grow-1 mt-5">

        <Routes>
            <Route path='/' element={<Login authenticated={authenticated} userData={userData} setUserData={setUserData} setUserId={setUserId} setAuthenticated={setAuthenticated}/>} exact />
            <Route path='/home' element={<Home onFinish={send} authenticated={authenticated} userData={userData} setUserData={setUserData} currentTerm={currentTerm}/>} />
            <Route path='/classes' element={<Classes authenticated={authenticated} userData={userData} setUserData={setUserData} currentTerm={currentTerm}/>} />
            <Route path='/terms' element={<Terms authenticated={authenticated} userData={userData} setUserData={setUserData} currentTerm={currentTerm} setCurrentTerm={setCurrentTerm}/>} />
            <Route path='*' element={<NotFound />} />
        </Routes>

        </main>


        <p id="notificationElement" className={(notificationState==="active")?"notification":"notification notification-hidden"}>
                {notification !== "" && <span>🎉</span>}
                {notification}
            </p>
        <footer className="mt-2 py-3 px-5 bg-body-tertiary">
            
            <p className="mb-0">
            © 2024 Kayleigh Gustafson |{" "}
            <a
                className="text-primary"
                href="https://github.com/kayleigh-gustafson/startup"
            >
                GitHub Repository
            </a>
            </p>
        </footer>
    </div>
    </BrowserRouter>
  );
} else {
    return(<p>Loading...</p>)
}
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}
