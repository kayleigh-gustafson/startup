import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { DropdownToggle } from 'react-bootstrap';
import { Link } from "react-router-dom";
import editUserData from '../functions/editUserData';
import deleteUserData from '../functions/deleteUserData';
import getColorVariant from '../functions/getColorVariant';
import { DatePicker } from 'rsuite';
import 'rsuite/DatePicker/styles/index.css';
import {FaCalendar} from 'react-icons/fa';
import format from 'date-fns/format';

export default function TaskRow({ onFinish, userData, setUserData, currentTerm, id, completed, name, due, finish, taskClass}) {
    // useState[notificationPrefs, setNotificationPrefs] = useState({due: false, finish: false, late: false})
    // function updateNotificationPrefs(key, value) {
    //     data = {...notificationPrefs};
    //     notificationPrefs[key] = value;
    //     setNotificationPrefs(data);
    // }

    
    // const today = new Date();
 
    

    let classDropdownContent = [];
    for (const [key, value] of Object.entries(userData.classes)) {
        if (value.term == currentTerm) {
            classDropdownContent.push(
            <Dropdown.Item
            onClick={() => editUserData(userData, setUserData, "assignments", id, "classId", key)}
            eventKey={key}
            key={key}>
            {value.name}
            </Dropdown.Item>);
        }
    }
   
    function toggleNotification(key) {
        let data={...userData};
        data.assignments[id][key] = !(data.assignments[id][key]);
        setUserData(data);
    }

    function handleCheck() {
        console.log("handleCheck");
        if (!completed) {
            onFinish(userData.username, "assignment");
        }
        editUserData(userData, setUserData, "assignments", id, "completed", !completed);
    }
    
    let color = userData.classes[userData.assignments[id].classId].color;
    let colorInput = {'--color': getColorVariant(color, 20, 60), color: getColorVariant(color, 20, 60), "--borderColor": color, borderColor: color, "--backgroundColor": getColorVariant(color, 95), backgroundColor: getColorVariant(color, 95)};
    let colorCheck = {'--checkbox-color': color}

    return (
    <tr>
        <td className="task-check">
            <Form.Check
            id={id+"-row-checkbox"}
            defaultChecked={completed}
            className="class-color"
            onChange={handleCheck}
            style={colorCheck}
            />
        </td>
        <td className="task-name">
            <input
            type="text"
            className="class-color form-control"
            defaultValue={name}
            id={id+"-row-name"}
            onBlur={(event) => editUserData(userData, setUserData, "assignments", id, "name", event.target.value)}
            style={colorInput}
            />
        </td>
        <td className="show-large task-due">
            
            <DatePicker
                editable={false}
                placeholder="Choose date"
                format="MM/dd/yyyy hh:mm aa"
                showMeridiem
                renderValue={value => {
                return format(value, 'EEE, MMM d');
                }}
                caretAs={FaCalendar}
                cleanable={false}
                defaultValue={new Date(due)}
                onChange={(date) => editUserData(userData, setUserData, "assignments", id, "due", date)}
                style={colorInput}
                className="class-color form-control-date"
            />
            <label className="d-md-none">Due Date</label>
        </td>
        <td className="task-finish">
            {/* <DatePicker id={id+"-row-finish"} format="MMM dd, yyyy" /> */}
            <DatePicker
                editable={false}
                placeholder="Choose date"
                format="MM/dd/yyyy hh:mm aa"
                showMeridiem
                renderValue={value => {
                return format(value, 'EEE, MMM d');
                }}
                caretAs={FaCalendar}
                cleanable={false}
                defaultValue={new Date(finish)}
                onChange={(date) => editUserData(userData, setUserData, "assignments", id, "finish", date)}
                style={colorInput}
                className="class-color form-control-date"
            />
            {/* <input type="text" id={id+"-row-finish"}></input> */}
            {/* <input
            type="date"
            className="class-color form-control"
            defaultValue={finish}
            id={id+"-row-finish"}
            onChange={(event) => editUserData(userData, setUserData, "assignments", id, "finish", event.target.value)}
            style={colorInput}
            /> */}
        </td>
        <td className="show-large task-class">
            <DropdownButton style={colorInput} variant="tertiary" id={id+"-row-class"} title={taskClass} className="class-color form-style-dropdown">
                {classDropdownContent}
                <Dropdown.Divider />
                <Dropdown.Item to={"../classes"} as={Link} eventKey="0">Manage...</Dropdown.Item>
            </DropdownButton>
            <label className="d-md-none">Class</label>
        </td>
        <td className="task-menu">

            <Dropdown className="no-caret" autoClose={false}>
                <Dropdown.Toggle variant="tertiary">
                    <i className="fa-solid fa-ellipsis-vertical" />
                </Dropdown.Toggle>
                
                <Dropdown.Menu>
                    <Dropdown.Header className="show-small">Due Date</Dropdown.Header>
                    <DatePicker
                        className="show-small form-control-date"
                        placement="autoHorizontalStart"
                        editable={false}
                        placeholder="Choose date"
                        format="MM/dd/yyyy hh:mm aa"
                        showMeridiem
                        renderValue={value => {
                        return format(value, 'EEE, MMM d');
                        }}
                        caretAs={FaCalendar}
                        cleanable={false}
                        defaultValue={new Date(due)}
                        onChange={(date) => editUserData(userData, setUserData, "assignments", id, "due", date)}
                    />
                    <Dropdown.Divider className="show-small"/>
                    <Dropdown.Header className="show-small">Class</Dropdown.Header>
                    <DropdownButton variant="tertiary" id={id+"-row-class"} title={taskClass} className="show-small form-style-dropdown">
                        {classDropdownContent}
                        <Dropdown.Divider />
                        <Dropdown.Item to={"../classes"} as={Link} eventKey="0">Manage...</Dropdown.Item>
                    </DropdownButton>
                    <Dropdown.Divider className="show-small"/>
                    <Dropdown.Header>Notifications</Dropdown.Header>
                    <Dropdown.Item onClick={() => toggleNotification("notifyFinish")}>
                        {userData.assignments[id].notifyFinish ? <i className="fa-solid fa-square-check"></i>:<i className="fa-regular fa-square"></i>} Finish Date
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => toggleNotification("notifyDue")}>
                        {userData.assignments[id].notifyDue ? <i className="fa-solid fa-square-check"></i>:<i className="fa-regular fa-square"></i>} Due Date
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => toggleNotification("notifyLate")}>
                        {userData.assignments[id].notifyLate ? <i className="fa-solid fa-square-check"></i>:<i className="fa-regular fa-square"></i>} Late
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => deleteUserData(userData, setUserData, "assignments", id)}>
                        Delete
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </td>
    </tr>
    )
}