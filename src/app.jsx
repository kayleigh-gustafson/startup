import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import './app.css';
import './color.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { Classes } from './classes/classes';
import { Terms } from './terms/terms';

export default function App() {
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
                            <button
                                type="button"
                                className="btn btn-tertiary d-inline w-100"
                                data-bs-toggle="modal"
                                data-bs-target="#newAssignmentModal"
                            >
                                Create Task
                            </button>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                            <button
                                type="button"
                                className="btn btn-tertiary d-inline w-100"
                                data-bs-toggle="modal"
                                data-bs-target="#newExamModal"
                            >
                                Create Exam
                            </button>
                            </NavDropdown.Item>

                        </NavDropdown>
                    </Nav>
                    <Nav
                        className="justify-content-end text-center"
                        style={{ flex: "1 1 0" }}
                    >
                        <NavDropdown title="Fall 2024">
                            <NavDropdown.Item>
                                <Button variant="tertiary" className="dropdown-item">Fall 2024</Button>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                            <Button variant="tertiary" className="dropdown-item">Winter 2025</Button>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                            <Button variant="tertiary" className="dropdown-item">Fall 2025</Button>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <Link className="dropdown-item" to="terms">Manage...</Link>
                            </NavDropdown.Item>
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

        <main className="flex-grow-1 mt-5">

        <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/home' element={<Home />} />
            <Route path='/classes' element={<Classes />} />
            <Route path='/terms' element={<Terms />} />
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
