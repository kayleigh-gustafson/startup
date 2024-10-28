import React from 'react';
import writeUserData from '../writeUserData';
import deleteUserData from '../deleteUserData';
import Button from 'react-bootstrap/Button';

export default function ClassRow({ userData, setUserData, id, name, color }) {
    return (
      <tr>
        <td className="class-name p-2">
          <input
            className="form-control"
            type="text"
            id={id+"-class-name"}
            defaultValue={name}
            onChange={(event) => writeUserData(userData, setUserData, "classes", id, "name", event.target.value)}
          />
        </td>
        <td className="class-color">
          <input
            className="form-control mx-auto custom-color-picker"
            type="color"
            id={id+"-class-color"}
            name="color"
            defaultValue={color}
            onChange={(event) => writeUserData(userData, setUserData, "classes", id, "color", event.target.value)}
          />
        </td>
        <td className="class-delete p-2 text-start">
          <Button className="hover-red" variant="tertiary" onClick={() => deleteUserData(userData, setUserData, "classes", id)}>
            <i className="fa-solid fa-trash" />
          </Button>
        </td>
      </tr>
    )
}