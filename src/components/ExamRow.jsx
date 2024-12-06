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
import { DatePicker } from 'rsuite';
import 'rsuite/DatePicker/styles/index.css';
import {FaCalendar} from 'react-icons/fa';
import format from 'date-fns/format';

export default function ExamRow({ onFinish, userData, setUserData, currentTerm, id, completed, name, open, close, finish, examClass, notifyOpen = false, notifyDue = false, notifyFinish = false }) {
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

    function toggleNotification(key) {
        let data={...userData};
        data.exams[id][key] = !(data.exams[id][key]);
        setUserData(data);
    }

    function handleCheck() {
        console.log("handleCheck");
        if (!completed) {
            onFinish(userData.username, "exam");
        }
        editUserData(userData, setUserData, "exams", id, "completed", !completed);
    }

    let color = userData.classes[userData.exams[id].classId].color;
    let colorInput = {'--color': getColorVariant(color, 20, 60), color: getColorVariant(color, 20, 60), "--borderColor": color, borderColor: color, "--backgroundColor": getColorVariant(color, 95), backgroundColor: getColorVariant(color, 95)};
    let colorCheck = {'--checkbox-color': color}
    return (
    <tr>
        <td className="exam-check">
            <Form.Check
            id={id+"-row-checkbox"}
            defaultChecked={completed}
            className="class-color"
            onChange={handleCheck}
            style={colorCheck}
            />
        </td>
        <td className="exam-name">
            <input
            type="text"
            className="class-color form-control"
            defaultValue={name}
            title={name}
            id={id+"-row-name"}
            onChange={(event) => editUserData(userData, setUserData, "exams", id, "name", event.target.value)}
            style={colorInput}
            />
        </td>
        <td className="show-large exam-open">
            {/* <input
            type="date"
            className="class-color form-control"
            defaultValue={open}
            id={id+"-row-open"}
            onChange={(event) => editUserData(userData, setUserData, "exams", id, "open", event.target.value)}
            style={colorInput}
            /> */}
            <DatePicker
                oneTap={true}
                editable={false}
                placeholder="Choose date"
                renderValue={value => {
                return format(value, 'EEE, MMM d');
                }}
                caretAs={FaCalendar}
                cleanable={false}
                defaultValue={new Date(open)}
                onChange={(date) => editUserData(userData, setUserData, "exams", id, "open", date)}
                style={colorInput}
                className="class-color form-control-date"
            />
        </td>
        <td className="show-large exam-close">
        <DatePicker
                oneTap={true}
                editable={false}
                placeholder="Choose date"
                renderValue={value => {
                return format(value, 'EEE, MMM d');
                }}
                caretAs={FaCalendar}
                cleanable={false}
                defaultValue={new Date(close)}
                onChange={(date) => editUserData(userData, setUserData, "exams", id, "close", date)}
                style={colorInput}
                className="class-color form-control-date"
            />
        </td>
        <td className="exam-finish">
        <DatePicker
                oneTap={true}
                editable={false}
                placeholder="Choose date"
                renderValue={value => {
                return format(value, 'EEE, MMM d');
                }}
                caretAs={FaCalendar}
                cleanable={false}
                defaultValue={new Date(finish)}
                onChange={(date) => editUserData(userData, setUserData, "exams", id, "finish", date)}
                style={colorInput}
                className="class-color form-control-date"
            />
        </td>
        <td className="show-large exam-class">
            <DropdownButton style={colorInput} variant="tertiary" id={id+"-row-class"} title={examClass} className="class-color form-style-dropdown">
                {classDropdownContent}
                <Dropdown.Divider />
                <Dropdown.Item to={"../classes"} as={Link} eventKey="4">Manage...</Dropdown.Item>
            </DropdownButton>
            <label className="d-md-none">Class</label>
        </td>
        <td className="exam-menu">

            <Dropdown className="no-caret" autoClose={false}>
                <Dropdown.Toggle variant="tertiary">
                    <i className="fa-solid fa-ellipsis-vertical" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Header className="show-small">Open Date</Dropdown.Header>
                    <DatePicker
                        oneTap={true}
                        editable={false}
                        placeholder="Choose date"
                        renderValue={value => {
                        return format(value, 'EEE, MMM d');
                        }}
                        caretAs={FaCalendar}
                        cleanable={false}
                        defaultValue={new Date(open)}
                        onChange={(date) => editUserData(userData, setUserData, "exams", id, "open", date)}
                        className="show-small form-control-date"
                    />
                    <Dropdown.Header className="show-small dropdown-header-compress">Close Date</Dropdown.Header>
                    <DatePicker
                        oneTap={true}
                        editable={false}
                        placeholder="Choose date"
                        renderValue={value => {
                        return format(value, 'EEE, MMM d');
                        }}
                        caretAs={FaCalendar}
                        cleanable={false}
                        defaultValue={new Date(close)}
                        onChange={(date) => editUserData(userData, setUserData, "exams", id, "close", date)}
                        className="show-small form-control-date"
                    />
                    <Dropdown.Header className="show-small dropdown-header-compress">Class</Dropdown.Header>
                    <DropdownButton variant="tertiary" id={id+"-row-class"} title={examClass} className="show-small form-style-dropdown">
                        {classDropdownContent}
                        <Dropdown.Divider />
                        <Dropdown.Item to={"../classes"} as={Link} eventKey="4">Manage...</Dropdown.Item>
                    </DropdownButton>
                    <Dropdown.Divider className="show-small"/>
                    <Dropdown.Header>Notifications</Dropdown.Header>
                    <Dropdown.Item onClick={() => toggleNotification("notifyFinish")}>
                        {userData.exams[id].notifyFinish ? <i className="fa-solid fa-square-check"></i>:<i className="fa-regular fa-square"></i>} Finish Date
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => toggleNotification("notifyOpen")}>
                        {userData.exams[id].notifyOpen ? <i className="fa-solid fa-square-check"></i>:<i className="fa-regular fa-square"></i>} Open Date
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => toggleNotification("notifyClose")}>
                        {userData.exams[id].notifyClose ? <i className="fa-solid fa-square-check"></i>:<i className="fa-regular fa-square"></i>} Close Date
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => toggleNotification("notifyLate")}>
                        {userData.exams[id].notifyLate ? <i className="fa-solid fa-square-check"></i>:<i className="fa-regular fa-square"></i>} Late
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