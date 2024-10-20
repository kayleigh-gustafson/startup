import React from 'react';

export function Terms() {
  return (
    <div id="manage-term-content" className="text-center">
      <h3 className="pb-5">Academic Terms</h3>
      <table className="mx-auto">
        <tbody>
          <tr className="text-start term-table-header">
            <th className="px-2">Term</th>
            <th className="px-2">Start Date</th>
            <th className="px-2">End Date</th>
            <th className="px-2" />
          </tr>
          <tr>
            <td className="p-2 term-name">
              <input
                className="form-control"
                type="text"
                defaultValue="Fall 2024"
              />
            </td>
            <td className="p-2 term-start">
              <input
                className="form-control"
                type="date"
                defaultValue="2024-09-03"
              />
              <label className="d-md-none">Start Date</label>
            </td>
            <td className="p-2 term-end">
              <input
                className="form-control"
                type="date"
                defaultValue="2024-04-26"
              />
              <label className="d-md-none">End Date</label>
            </td>
            <td className="p-2 term-delete text-start">
              <a className="btn btn-tertiary hover-red" href="">
                <i className="fa-solid fa-trash" />
              </a>
            </td>
          </tr>
          <tr>
            <td className="p-2 term-name">
              <input
                className="form-control"
                type="text"
                defaultValue="Fall 2024"
              />
            </td>
            <td className="p-2 term-start">
              <input
                className="form-control"
                type="date"
                defaultValue="2024-09-03"
              />
              <label className="d-md-none">Start Date</label>
            </td>
            <td className="p-2 term-end">
              <input
                className="form-control"
                type="date"
                defaultValue="2024-04-26"
              />
              <label className="d-md-none">End Date</label>
            </td>
            <td className="p-2 term-delete text-start">
              <a className="btn btn-tertiary hover-red" href="">
                <i className="fa-solid fa-trash" />
              </a>
            </td>
          </tr>
          <tr>
            <td className="p-2 term-name">
              <input
                className="form-control"
                type="text"
                defaultValue="Fall 2024"
              />
            </td>
            <td className="p-2 term-start">
              <input
                className="form-control"
                type="date"
                defaultValue="2024-09-03"
              />
              <label className="d-md-none">Start Date</label>
            </td>
            <td className="p-2 term-end">
              <input
                className="form-control"
                type="date"
                defaultValue="2024-04-26"
              />
              <label className="d-md-none">End Date</label>
            </td>
            <td className="p-2 term-delete text-start">
              <a className="btn btn-tertiary hover-red" href="">
                <i className="fa-solid fa-trash" />
              </a>
            </td>
          </tr>
          <tr>
            <td className="p-2 term-name">
              <input
                className="form-control"
                type="text"
                placeholder="New term..."
              />
            </td>
            <td className="p-2 term-start">
              <input className="form-control" type="date" />
              <label className="d-md-none">Start Date</label>
            </td>
            <td className="p-2 term-end">
              <input className="form-control" type="date" />
              <label className="d-md-none">End Date</label>
            </td>
            <td className="p-2 term-delete text-start">
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