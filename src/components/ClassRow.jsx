import React from 'react';
import editUserData from '../functions/editUserData';
import deleteUserData from '../functions/deleteUserData';
import Button from 'react-bootstrap/Button';

export default function ClassRow({ userData, setUserData, currentTerm, id, name, color }) {
    let classesInTerm = {...userData.classes};
    for (const [key, value] of Object.entries(classesInTerm)) {
      if (value.term !== currentTerm) {
          delete classesInTerm[key];
      }
    }
    
    return (
      <tr>
        <td className="class-name p-2">
          <input
            className="form-control"
            type="text"
            id={id+"-class-name"}
            defaultValue={name}
            onChange={(event) => editUserData(userData, setUserData, "classes", id, "name", event.target.value)}
          />
        </td>
        <td className="class-color">
          <input
            className="form-control mx-auto custom-color-picker"
            type="color"
            id={id+"-class-color"}
            name="color"
            defaultValue={color}
            onChange={(event) => editUserData(userData, setUserData, "classes", id, "color", event.target.value)}
          />
        </td>
        <td className="class-delete p-2 text-start">
          <Button className={(Object.keys(classesInTerm)).length > 1 ? "delete-button-active" : "delete-button-inactive"} variant="tertiary" onClick={() => deleteUserData(userData, setUserData, "classes", id, currentTerm)}>
            <i className="fa-solid fa-trash" />
          </Button>
        </td>
      </tr>
    )
}