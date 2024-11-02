// to-do: deleting current term causes newTaskData to malfunction (no default class)

import React from 'react';
import { useState } from 'react';
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

import getUserData from './functions/getUserData';
import addUserData from './functions/addUserData';

export default function App() {
    const [userData, setUserData] = useState(getUserData());
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showExamModal, setShowExamModal] = useState(false);
    const [currentTerm, setCurrentTerm] = useState(Object.keys(userData.terms)[0]);

    let defaultClass = "";
    for (const [key, value] of Object.entries(userData.classes)) {
        if (value.term === currentTerm) {
            defaultClass = key;
        }
    }

    console.log(location.pathname);

    function resetNewTask() {
        console.log("Reset new task");
        let data = {...userData};
        data.newTask = {classId: defaultClass};
        console.log(data);
        setUserData(data);
    }

    if (!userData.newTask.hasOwnProperty("classId")) resetNewTask();
    console.log(userData);


    function handleModal(action, modal) {
        modal === "task" ? setShowTaskModal(!showTaskModal) : setShowExamModal(!showExamModal);
        if (action === "open") {
            resetNewTask();
        }
        console.log(userData.newTask);
    }

    function updateNewTask(key, value) {
        console.log("updateNewTask", key, value)
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

    // useEffect(() => {
    //     updateNewTask("classId", defaultClass)
    //  },[userData])

    function createTask(type, data) {
        let id = "";
        while (id === "") {
            let tempId = Math.floor(Math.random() * 90000) + 10000;
            if (!userData.assignments.hasOwnProperty(tempId) && !userData.exams.hasOwnProperty(tempId)) {
                id = tempId;
            }
        }
        if (type === "assignment") {
            if (data.hasOwnProperty('name') && data.hasOwnProperty('due') && data.hasOwnProperty('finish') && data.hasOwnProperty('classId')) {
                addUserData(userData, setUserData, "assignments", id, data)
                handleModal("close", "task")
                return(true)
            } else {

                return(false)
            }
        } else if (type === "exam") {
            if (data.hasOwnProperty('name') && data.hasOwnProperty('open') && data.hasOwnProperty('close') && data.hasOwnProperty('finish') && data.hasOwnProperty('classId')) {
                addUserData(userData, setUserData, "exams", id, data)
                handleModal("close", "exam")
                return(true)
            } else {
                return(false)
            }
        }
    }

    let newTaskClassDropdownContent = [];
    for (const [key, value] of Object.entries(userData.classes)) {
        if (value.term === currentTerm) {
            newTaskClassDropdownContent.push(
                <Dropdown.Item
                eventKey={key}
                key={key}
                onClick={() => updateNewTask("classId", key)}>
                {value.name}
                </Dropdown.Item>
            );
        }
    }
        

    // Generate term dropdown
    let termDropdownContent = [];
    for (const [key, value] of Object.entries(userData.terms)) {
        termDropdownContent.push(
            <NavDropdown.Item key={key}>
                <Button variant="tertiary" onClick={() => setCurrentTerm(key)} className="dropdown-item">{value.name}</Button>
            </NavDropdown.Item>
        );
      };

    return (
    <BrowserRouter>
    <div className="d-flex min-vh-100 flex-column">
        
        <header className="sticky-top">
            <Navbar expand="md" className="bg-body-tertiary px-3">
            <Container style={{ flex: "1 1 0" }}>
                <Navbar.Brand className="navbar-brand text-primary d-md-none">
                    <i className="fa-solid fa-book" /> <strong>homework</strong>hub
                </Navbar.Brand>
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
                    { location.pathname === "/home" &&
                    <Nav
                        className="justify-content-end text-center"
                        style={{ flex: "1 1 0" }}
                    >
                        <NavDropdown title={userData.terms[currentTerm].name}>
                            {termDropdownContent}
                            <Dropdown.Divider />
                            <Dropdown.Item to={"../terms"} as={Link} eventKey="0">Manage...</Dropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={userData.username}>
                            <NavDropdown.Item>
                                <Link className="dropdown-item" to="/">Log out</Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    }
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
  
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
                <input onChange={(event) => updateNewTask("due", event.target.value)} type="date" className="form-control" id="duedate" name="duedate"/>
                
                <label className="mt-2 mb-1" htmlFor="finishdate">Finish By</label>
                <input onChange={(event) => updateNewTask("finish", event.target.value)} type="date" className="form-control" id="finishdate" name="finishdate"/>
                
                <label className="mt-2 mb-1" htmlFor="class">Class</label>
                <DropdownButton variant="tertiary" title={getNewTaskClass().name} className="form-style-dropdown text-start">
                    {newTaskClassDropdownContent}
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4" href="classes">Manage...</Dropdown.Item>
                </DropdownButton>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='tertiary' onClick={() => handleModal("close", "task")}>Close</Button>
                <Button variant='primary' onClick={() => createTask("assignment", userData.newTask)}>Create</Button>
            </Modal.Footer>
        </Modal>

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
                <input onChange={(event) => updateNewTask("open", event.target.value)} type="date" className="form-control" id="opendate" name="opendate"/>

                <label className="mt-2 mb-1" htmlFor="closedate">Close Date</label>
                <input onChange={(event) => updateNewTask("close", event.target.value)} type="date" className="form-control" id="closedate" name="closedate"/>
                
                <label className="mt-2 mb-1" htmlFor="finishdate">Finish By</label>
                <input onChange={(event) => updateNewTask("finish", event.target.value)} type="date" className="form-control" id="finishdate" name="finishdate"/>
                
                <label className="mt-2 mb-1" htmlFor="class">Class</label>
                <DropdownButton variant="tertiary" title={getNewTaskClass().name} className="form-style-dropdown text-start">
                    {newTaskClassDropdownContent}
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4" href="classes">Manage...</Dropdown.Item>
                </DropdownButton>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='tertiary' onClick={() => handleModal("close", "exam")}>Close</Button>
                <Button variant='primary' onClick={() => createTask("exam", userData.newTask)}>Create</Button>
            </Modal.Footer>
        </Modal>


        <main className="flex-grow-1 mt-5">

        <Routes>
            <Route path='/' element={<Login userData={userData} setUserData={setUserData}/>} exact />
            <Route path='/home' element={<Home userData={userData} setUserData={setUserData} currentTerm={currentTerm}/>} />
            <Route path='/classes' element={<Classes userData={userData} setUserData={setUserData} currentTerm={currentTerm}/>} />
            <Route path='/terms' element={<Terms userData={userData} setUserData={setUserData} currentTerm={currentTerm} setCurrentTerm={setCurrentTerm}/>} />
            <Route path='*' element={<NotFound />} />
        </Routes>

        </main>

        <footer className="mt-5 py-3 px-5 bg-body-tertiary d-flex flex-row justify-content-between align-items-center">
            <p className="mb-0">123,456 total assignments completed</p>
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
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}
