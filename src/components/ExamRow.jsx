import React from 'react';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { DropdownToggle } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function ExamRow({ id, completed, name, open, close, finish, examClass, notifyOpen = false, notifyDue = false, notifyFinish = false }) {
    return (
    <tr>
        <td className="exam-check">
            <Form.Check
            id={id+"-row-checkbox"}
            defaultChecked={completed}
            />
        </td>
        <td className="exam-name">
            <input
            type="text"
            className="form-control"
            defaultValue={name}
            id={id+"-row-name"}
            />
        </td>
        <td className="exam-open">
            <input
            type="date"
            className="form-control"
            defaultValue={open}
            id={id+"-row-open"}
            />
            <label className="d-md-none">Open Date</label>
        </td>
        <td className="exam-close">
            <input
            type="date"
            className="form-control"
            defaultValue={close}
            id={id+"-row-close"}
            />
            <label className="d-md-none">Close Date</label>
        </td>
        <td className="exam-finish">
            <input
            type="date"
            className="form-control"
            defaultValue={finish}
            id={id+"-row-finish"}
            />
            <label className="d-md-none">Finish By</label>
        </td>
        <td className="exam-class">
            <DropdownButton variant="tertiary" id={id+"-row-class"} title={examClass} className="form-style-dropdown">
                <Dropdown.Item eventKey="1">A HTG 100</Dropdown.Item>
                <Dropdown.Item eventKey="2">CS 260</Dropdown.Item>
                <Dropdown.Item eventKey="3">WRTG 150</Dropdown.Item>
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
                    <Dropdown.Item>
                        Delete
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </td>
    </tr>
    )
}