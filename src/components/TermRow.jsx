import React from 'react';

export default function TermRow({ id, name, start, end }) {
    return (
        <tr>
            <td className="p-2 term-name">
              <input
                className="form-control"
                type="text"
                id={id+"-term-name"}
                defaultValue={name}
              />
            </td>
            <td className="p-2 term-start">
              <input
                className="form-control"
                type="date"
                id={id+"-term-start"}
                defaultValue={start}
              />
              <label className="d-md-none">Start Date</label>
            </td>
            <td className="p-2 term-end">
              <input
                className="form-control"
                type="date"
                id={id+"-term-end"}
                defaultValue={end}
              />
              <label className="d-md-none">End Date</label>
            </td>
            <td className="p-2 term-delete text-start">
              <a className="btn btn-tertiary hover-red" href="">
                <i className="fa-solid fa-trash" />
              </a>
            </td>
        </tr>
    )
}