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

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { Classes } from './classes/classes';
import { Terms } from './terms/terms';

import getUserData from './getUserData';
import databasePlaceholder from './databasePlaceholder';
import getDataById from './getDataById';
let userData;

export default function App() {
    const [userData, setUserData] = useState(databasePlaceholder());
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showExamModal, setShowExamModal] = useState(false);
    const [currentTerm, setCurrentTerm] = useState(userData.terms[0].id)

    // Generate term dropdown
    const termDropdownContent = userData.terms.map((term, index) => {
        return (
            <NavDropdown.Item key={term.id}>
                <Button variant="tertiary" onClick={() => setCurrentTerm(term.id)} className="dropdown-item">{term.name}</Button>
            </NavDropdown.Item>
        );
      });

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
                            <Button onClick={() => setShowTaskModal(true)} variant="tertiary" className="d-inline w-100">
                                Create Task
                            </Button>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                            <Button onClick={() => setShowExamModal(true)} variant="tertiary" className="d-inline w-100">
                                Create Exam
                            </Button>
                            </NavDropdown.Item>

                        </NavDropdown>
                    </Nav>
                    <Nav
                        className="justify-content-end text-center"
                        style={{ flex: "1 1 0" }}
                    >
                        <NavDropdown title={getDataById(userData.terms, currentTerm).name}>
                            {termDropdownContent}
                        </NavDropdown>
                        <NavDropdown title="userName123">
                            <NavDropdown.Item>
                                <Link className="dropdown-item" to="/">Log out</Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>

        <Modal
        show={showTaskModal}
        onHide={() => setShowTaskModal(false)}
        >
       <Modal.Header closeButton>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <label className="mt-2 mb-1" htmlFor="assignment">Assignment</label>
                <input type="text" className="form-control" id="assignment" name="assignment"/>
                
                <label className="mt-2 mb-1" htmlFor="duedate">Due Date</label>
                <input type="date" className="form-control" id="duedate" name="duedate"/>
                
                <label className="mt-2 mb-1" htmlFor="finishdate">Finish By</label>
                <input type="date" className="form-control" id="finishdate" name="finishdate"/>
                
                <label className="mt-2 mb-1" htmlFor="class">Class</label>
                <DropdownButton variant="tertiary" title="A HTG 100" className="form-style-dropdown text-start">
                    <Dropdown.Item eventKey="1">A HTG 100</Dropdown.Item>
                    <Dropdown.Item eventKey="2">CS 260</Dropdown.Item>
                    <Dropdown.Item eventKey="3">WRTG 150</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4" href="classes">Manage...</Dropdown.Item>
                </DropdownButton>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='tertiary' onClick={() => setShowTaskModal(false)}>Close</Button>
                <Button variant='primary' onClick={() => setShowTaskModal(false)}>Create</Button>
            </Modal.Footer>
        </Modal>

        <Modal
        show={showExamModal}
        onHide={() => setShowExamModal(false)}
        >
       <Modal.Header closeButton>
          <Modal.Title>New Exam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <label className="mt-2 mb-1" htmlFor="assignment">Exam</label>
                <input type="text" className="form-control" id="assignment" name="assignment"/>
                
                <label className="mt-2 mb-1" htmlFor="opendate">Open Date</label>
                <input type="date" className="form-control" id="opendate" name="opendate"/>

                <label className="mt-2 mb-1" htmlFor="closedate">Close Date</label>
                <input type="date" className="form-control" id="closedate" name="closedate"/>
                
                <label className="mt-2 mb-1" htmlFor="finishdate">Finish By</label>
                <input type="date" className="form-control" id="finishdate" name="finishdate"/>
                
                <label className="mt-2 mb-1" htmlFor="class">Class</label>
                <DropdownButton variant="tertiary" title="A HTG 100" className="form-style-dropdown text-start">
                    <Dropdown.Item eventKey="1">A HTG 100</Dropdown.Item>
                    <Dropdown.Item eventKey="2">CS 260</Dropdown.Item>
                    <Dropdown.Item eventKey="3">WRTG 150</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4" href="classes">Manage...</Dropdown.Item>
                </DropdownButton>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='tertiary' onClick={() => setShowExamModal(false)}>Close</Button>
                <Button variant='primary' onClick={() => setShowExamModal(false)}>Create</Button>
            </Modal.Footer>
        </Modal>


        <main className="flex-grow-1 mt-5">

        <Routes>
            <Route path='/' element={<Login userData={userData}/>} exact />
            <Route path='/home' element={<Home userData={userData} setUserData={setUserData} currentTerm={currentTerm}/>} />
            <Route path='/classes' element={<Classes userData={userData}/>} />
            <Route path='/terms' element={<Terms userData={userData}/>} />
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
