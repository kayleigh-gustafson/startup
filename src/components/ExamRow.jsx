import React from 'react';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { DropdownToggle } from 'react-bootstrap';
import { Link } from "react-router-dom";
import editUserData from '../functions/editUserData';
import deleteUserData from '../functions/deleteUserData';
import getColorVariant from '../functions/getColorVariant';

export default function ExamRow({ userData, setUserData, currentTerm, id, completed, name, open, close, finish, examClass, notifyOpen = false, notifyDue = false, notifyFinish = false }) {
    let classDropdownContent = [];
    for (const [key, value] of Object.entries(userData.classes)) {
        if (value.term == currentTerm) {
            classDropdownContent.push(
            <Dropdown.Item
            onClick={() => editUserData(userData, setUserData, "exams", id, "classId", key)}
            eventKey={key}
            key={key}>
            {value.name}
            </Dropdown.Item>);
        }
    }
    let color = userData.classes[userData.exams[id].classId].color;
    let colorInput = {'--color': getColorVariant(color, 20, 60), color: getColorVariant(color, 20, 60), borderColor: color, backgroundColor: getColorVariant(color, 95)};
    let colorCheck = {'--checkbox-color': color}
    return (
    <tr>
        <td className="exam-check">
            <Form.Check
            id={id+"-row-checkbox"}
            defaultChecked={completed}
            className="class-color"
            onChange={() => editUserData(userData, setUserData, "exams", id, "completed", !completed)}
            style={colorCheck}
            />
        </td>
        <td className="exam-name">
            <input
            type="text"
            className="class-color form-control"
            defaultValue={name}
            id={id+"-row-name"}
            onChange={(event) => editUserData(userData, setUserData, "exams", id, "name", event.target.value)}
            style={colorInput}
            />
        </td>
        <td className="exam-open">
            <input
            type="date"
            className="class-color form-control"
            defaultValue={open}
            id={id+"-row-open"}
            onChange={(event) => editUserData(userData, setUserData, "exams", id, "open", event.target.value)}
            style={colorInput}
            />
            <label className="d-md-none">Open Date</label>
        </td>
        <td className="exam-close">
            <input
            type="date"
            className="class-color form-control"
            defaultValue={close}
            id={id+"-row-close"}
            onChange={(event) => editUserData(userData, setUserData, "exams", id, "close", event.target.value)}
            style={colorInput}
            />
            <label className="d-md-none">Close Date</label>
        </td>
        <td className="exam-finish">
            <input
            type="date"
            className="class-color form-control"
            defaultValue={finish}
            id={id+"-row-finish"}
            style={colorInput}
            onChange={(event) => editUserData(userData, setUserData, "exams", id, "finish", event.target.value)}
            />
            <label className="d-md-none">Finish By</label>
        </td>
        <td className="exam-class">
            <DropdownButton style={colorInput} variant="tertiary" id={id+"-row-class"} title={examClass} className="class-color form-style-dropdown">
                {classDropdownContent}
                <Dropdown.Divider />
                <Dropdown.Item to={"../classes"} as={Link} eventKey="4">Manage...</Dropdown.Item>
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