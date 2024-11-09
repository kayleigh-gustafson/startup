import React from 'react';
import editUserData from '../functions/editUserData';
import deleteUserData from '../functions/deleteUserData';
import Button from 'react-bootstrap/Button';
import { DatePicker } from 'rsuite';
import 'rsuite/DatePicker/styles/index.css';
import {FaCalendar} from 'react-icons/fa';
import format from 'date-fns/format';

export default function TermRow({ userData, setUserData, currentTerm, setCurrentTerm, id, name, start, end }) {
    
  return (
        <tr>
            <td className="p-2 term-name">
              <input
                className="form-control"
                type="text"
                id={id+"-term-name"}
                defaultValue={name}
                onChange={(event) => editUserData(userData, setUserData, "terms", id, "name", event.target.value)}
              />
            </td>
            <td className="p-2 term-start">
              {/* <input
                className="form-control"
                type="date"
                id={id+"-term-start"}
                defaultValue={start}
                onChange={(event) => editUserData(userData, setUserData, "terms", id, "start", event.target.value)}
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
                defaultValue={new Date(start)}
                onChange={(date) => editUserData(userData, setUserData, "terms", id, "start", date)}
                className="form-control-date"
            />
              <label className="d-md-none">Start Date</label>
            </td>
            <td className="p-2 term-end">
            <DatePicker
                oneTap={true}
                editable={false}
                placeholder="Choose date"
                renderValue={value => {
                return format(value, 'EEE, MMM d');
                }}
                caretAs={FaCalendar}
                cleanable={false}
                defaultValue={new Date(end)}
                onChange={(date) => editUserData(userData, setUserData, "terms", id, "end", date)}
                className="form-control-date"
            />
              <label className="d-md-none">End Date</label>
            </td>
            <td className="p-2 term-delete text-start">
              <Button className={(Object.keys(userData.terms)).length > 1 ? "delete-button-active" : "delete-button-inactive"} variant="tertiary" onClick={() => deleteUserData(userData, setUserData, "terms", id, currentTerm, setCurrentTerm)}>
                <i className="fa-solid fa-trash" />
              </Button>
            </td>
        </tr>
    )
}