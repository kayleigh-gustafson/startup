import React from 'react';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { DropdownToggle } from 'react-bootstrap';
import { Link } from "react-router-dom";
import writeUserData from '../writeUserData';
import deleteUserData from '../deleteUserData';

export default function ExamRow({ userData, setUserData, currentTerm, id, completed, name, open, close, finish, examClass, notifyOpen = false, notifyDue = false, notifyFinish = false }) {
    let classDropdownContent = [];
    for (const [key, value] of Object.entries(userData.classes)) {
        if (value.term == currentTerm) {
            classDropdownContent.push(
            <Dropdown.Item
            onClick={() => writeUserData(userData, setUserData, "exams", id, "classId", key)}
            eventKey={key}
            key={key}>
            {value.name}
            </Dropdown.Item>);
        }
    }
    return (
    <tr>
        <td className="exam-check">
            <Form.Check
            id={id+"-row-checkbox"}
            defaultChecked={completed}
            onChange={() => writeUserData(userData, setUserData, "exams", id, "completed", !completed)}
            />
        </td>
        <td className="exam-name">
            <input
            type="text"
            className="form-control"
            defaultValue={name}
            id={id+"-row-name"}
            onChange={(event) => writeUserData(userData, setUserData, "exams", id, "name", event.target.value)}
            />
        </td>
        <td className="exam-open">
            <input
            type="date"
            className="form-control"
            defaultValue={open}
            id={id+"-row-open"}
            onChange={(event) => writeUserData(userData, setUserData, "exams", id, "open", event.target.value)}
            />
            <label className="d-md-none">Open Date</label>
        </td>
        <td className="exam-close">
            <input
            type="date"
            className="form-control"
            defaultValue={close}
            id={id+"-row-close"}
            onChange={(event) => writeUserData(userData, setUserData, "exams", id, "close", event.target.value)}
            />
            <label className="d-md-none">Close Date</label>
        </td>
        <td className="exam-finish">
            <input
            type="date"
            className="form-control"
            defaultValue={finish}
            id={id+"-row-finish"}
            onChange={(event) => writeUserData(userData, setUserData, "exams", id, "finish", event.target.value)}
            />
            <label className="d-md-none">Finish By</label>
        </td>
        <td className="exam-class">
            <DropdownButton variant="tertiary" id={id+"-row-class"} title={examClass} className="form-style-dropdown">
                {classDropdownContent}
                <Dropdown.Divider />
                <Dropdown.Item to={"../classes"} as={Link} eventKey="4" href="classes">Manage...</Dropdown.Item>
            </DropdownButton>
            <label className="d-md-none">Class</label>
        </td>
        <td className="exam-menu">

            <Dropdown className="no-caret">
                <Dropdown.Toggle variant="tertiary">
                    <i className="fa-solid fa-ellipsis-vertical" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Header>Notifications</Dropdown.Header>
                    <Dropdown.Item>
                        <Form.Check id={id+"-row-notifyOpen"} defaultChecked={notifyOpen} className="d-inline me-2"/>
                        Open Date
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Form.Check id={id+"-row-notifyFinish"} defaultChecked={notifyFinish} className="d-inline me-2"/>
                        Finish Date
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Form.Check id={id+"-row-notifyDue"} defaultChecked={notifyFinish} className="d-inline me-2"/>
                        Due Date
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => deleteUserData(userData, setUserData, "exams", id)}>
                        Delete
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </td>
    </tr>
    )
}