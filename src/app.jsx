import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './app.css';
import './color.css';

export default function App() {
  return (
    <div className="d-flex min-vh-100 flex-column">
        <header className="sticky-top">
            <Navbar expand="md" className="bg-body-tertiary px-3">
            <Container style={{ flex: "1 1 0" }}>
                <Navbar.Brand className="navbar-brand text-primary d-md-none" href="main.html">
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
                        <Navbar.Brand className="me-auto text-primary" href="main.html">
                            <i className="fa-solid fa-book" /> <strong>homework</strong>hub
                        </Navbar.Brand>
                        </Nav.Item>
                    </Nav>
                    <Nav
                        className="justify-content-center"
                        style={{ flex: "1 1 0" }}
                    >
                        <NavDropdown className="dropdown-center text-center m-auto p-0" title="Add">
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
                                <a className="dropdown-item" href="#">Fall 2024</a>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <a className="dropdown-item" href="#">Winter 2025</a>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <a className="dropdown-item" href="#">Fall 2025</a>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <a className="dropdown-item" href="terms.html">Manage...</a>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="userName123">
                            <NavDropdown.Item>
                                <a className="dropdown-item" href="index.html">Log Out</a>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
        <main className="flex-grow-1 mt-5">Page goes here</main>
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
  );
}