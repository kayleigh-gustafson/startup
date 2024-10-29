import React from 'react';
import editUserData from '../functions/editUserData';
import deleteUserData from '../functions/deleteUserData';
import Button from 'react-bootstrap/Button';

export default function TermRow({ userData, setUserData, currentTerm, setCurrentTerm, id, name, start, end }) {
    
  console.log(currentTerm, setCurrentTerm);
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
              <input
                className="form-control"
                type="date"
                id={id+"-term-start"}
                defaultValue={start}
                onChange={(event) => editUserData(userData, setUserData, "terms", id, "start", event.target.value)}
              />
              <label className="d-md-none">Start Date</label>
            </td>
            <td className="p-2 term-end">
              <input
                className="form-control"
                type="date"
                id={id+"-term-end"}
                defaultValue={end}
                onChange={(event) => editUserData(userData, setUserData, "terms", id, "end", event.target.value)}
              />
              <label className="d-md-none">End Date</label>
            </td>
            <td className="p-2 term-delete text-start">
              <Button className="hover-red" variant="tertiary" onClick={() => deleteUserData(userData, setUserData, "terms", id, currentTerm, setCurrentTerm)}>
                <i className="fa-solid fa-trash" />
              </Button>
            </td>
        </tr>
    )
}