import React from 'react';

export function Classes() {
  return (
    <div id="manage-class-content" className="text-center">
      <h3 className="pb-5">Fall 2024 Classes</h3>
      <table className="mx-auto">
        <tbody>
          <tr className="text-start class-table-header">
            <th className="px-2">Name</th>
            <th className="px-2">Color</th>
            <th className="px-2" />
          </tr>
          <tr>
            <td className="class-name p-2">
              <input
                className="form-control"
                type="text"
                defaultValue="A HTG 100"
              />
            </td>
            <td className="class-color">
              <input
                className="form-control mx-auto custom-color-picker"
                type="color"
                id="color"
                name="color"
                defaultValue="#d0f069"
              />
            </td>
            <td className="class-delete p-2 text-start">
              <a className="btn btn-tertiary hover-red" href="">
                <i className="fa-solid fa-trash" />
              </a>
            </td>
          </tr>
          <tr>
            <td className="p-2">
              <input className="form-control" type="text" defaultValue="CS 260" />
            </td>
            <td>
              <input
                className="form-control mx-auto custom-color-picker"
                type="color"
                id="color"
                name="color"
                defaultValue="#14ba99"
              />
            </td>
            <td className="p-2 text-start">
              <a className="btn btn-tertiary hover-red" href="">
                <i className="fa-solid fa-trash" />
              </a>
            </td>
          </tr>
          <tr>
            <td className="p-2">
              <input className="form-control" type="text" defaultValue="WRTG 150" />
            </td>
            <td>
              <input
                className="form-control mx-auto custom-color-picker"
                type="color"
                id="color"
                name="color"
                defaultValue="#8dba63"
              />
            </td>
            <td className="p-2 text-start">
              <a className="btn btn-tertiary hover-red" href="">
                <i className="fa-solid fa-trash" />
              </a>
            </td>
          </tr>
          <tr>
            <td className="p-2">
              <input
                className="form-control"
                type="text"
                placeholder="New class..."
              />
            </td>
            <td>
              <input
                className="form-control mx-auto custom-color-picker"
                type="color"
                id="color"
                name="color"
                defaultValue="#a8a8a8"
              />
            </td>
            <td className="p-2 text-start">
              <a className="btn btn-primary" href="">
                <i className="fa-solid fa-plus" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <a className="btn btn-primary mt-4" href="main.html">
        Done
      </a>
    </div>
  );
}