import React from 'react';
import TermRow from '../components/TermRow';
import { Link } from "react-router-dom";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import addUserData from '../functions/addUserData';
import { DatePicker } from 'rsuite';
import 'rsuite/DatePicker/styles/index.css';
import {FaCalendar} from 'react-icons/fa';
import format from 'date-fns/format';
import { Navigate } from "react-router-dom";

export function Terms({authenticated, userData, setUserData, currentTerm, setCurrentTerm}) {

  const [newTerm, setNewTerm] = useState({name: "", start: "", end: ""});

  let termRows = [];
  for (const [key, value] of Object.entries(userData.terms)) {
    termRows.push(
      <TermRow
      userData={userData}
      setUserData={setUserData}
      currentTerm={currentTerm}
      setCurrentTerm={setCurrentTerm}
      key={key}
      id={key}
      name={value.name}
      start={value.start}
      end={value.end}
    ></TermRow>); 
  }

  function updateNewTerm(key, value) {
    let data = {...newTerm};
    data[key] = value;
    setNewTerm(data);
  }

  function addTerm() {
    if (newTerm.name !== "" && newTerm.start !== "" && newTerm.end !== "") {
      let termId = "";
        while (termId === "") {
            let tempId = Math.floor(Math.random() * 90000) + 10000;
            if (!userData.terms.hasOwnProperty(tempId)) {
                termId = tempId;
            }
        }
      document.getElementById("new-term-name").value = "";
      document.getElementById("new-term-start").value = "";
      document.getElementById("new-term-end").value = "";
      addUserData(userData, setUserData, "terms", termId, newTerm);
      setNewTerm({name: "", start: "", end: ""})
    }
  }

  if (!authenticated) {
    return(<Navigate to="/" replace={true} />)
  } else {
  return (
    <div id="manage-term-content" className="text-center">
      <h4 className="pb-5">Academic Terms</h4>
      <table className="mx-auto">
        <tbody>
          <tr className="text-start term-table-header">
            <th className="px-2">Term</th>
            <th className="px-2">Start Date</th>
            <th className="px-2">End Date</th>
            <th className="px-2" />
            <th className="px-2" />
          </tr>
          {termRows}
          <tr>
            <td colSpan="4"><hr></hr></td>
          </tr>
          <tr>
            <td className="p-2 term-name">
              <input
                className="form-control"
                type="text"
                id="new-term-name"
                placeholder='New term...'
                onChange={(event) => updateNewTerm("name", event.target.value)}
              />
            </td>
            <td className="p-2 term-start">
              {/* <input
                className="form-control"
                type="date"
                id="new-term-start"
                onChange={(event) => updateNewTerm("start", event.target.value)}
              /> */}
              <DatePicker
                id="new-term-start"
                oneTap={true}
                editable={false}
                cleanable={true}
                placeholder="Choose date"
                renderValue={value => {
                return format(value, 'EEE, MMM d');
                }}
                caretAs={FaCalendar}
                onChange={(date) => updateNewTerm("start", date)}
                className="form-control-date"
            />
              <label className="d-md-none">Start Date</label>
            </td>
            <td className="p-2 term-end">
              {/* <input
                className="form-control"
                type="date"
                id="new-term-end"
                onChange={(event) => updateNewTerm("end", event.target.value)}
              /> */}
              <DatePicker
                id="new-term-end"
                oneTap={true}
                editable={false}
                cleanable={true}
                placeholder="Choose date"
                renderValue={value => {
                return format(value, 'EEE, MMM d');
                }}
                caretAs={FaCalendar}
                onChange={(date) => updateNewTerm("end", date)}
                className="form-control-date"
            />
              <label className="d-md-none">End Date</label>
            </td>
            <td colSpan="2" className="p-2 term-delete text-start">
            <Button className="w-100" variant={(newTerm.name !== "" && newTerm.start !== "" && newTerm.end !== "") ? "primary" : "secondary"} onClick={addTerm}>
              <i className="fa-solid fa-plus" /> Create
            </Button>
            </td>
        </tr>
        </tbody>
      </table>
      <Link className="btn btn-primary mt-4" to="../home">
        Home
      </Link>
    </div>

  );
  }
}