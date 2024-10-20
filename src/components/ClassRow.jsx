import React from 'react';

export default function ClassRow({ id, name, color }) {
    return (
      <tr>
        <td className="class-name p-2">
          <input
            className="form-control"
            type="text"
            id={id+"-class-name"}
            defaultValue={name}
          />
        </td>
        <td className="class-color">
          <input
            className="form-control mx-auto custom-color-picker"
            type="color"
            id={id+"-class-color"}
            name="color"
            defaultValue={color}
          />
        </td>
        <td className="class-delete p-2 text-start">
          <a className="btn btn-tertiary hover-red" href="">
            <i className="fa-solid fa-trash" />
          </a>
        </td>
      </tr>
    )
}