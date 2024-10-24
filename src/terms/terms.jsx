import React from 'react';
import TermRow from '../components/TermRow';
import { Link } from "react-router-dom";

export function Terms(userData) {
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
          <TermRow
            id="12104"
            name="Fall 2024"
            start="2024-09-03"
            end="2024-12-11"
          ></TermRow>
          <TermRow
            id="12104"
            name="Winter 2025"
            start="2024-09-03"
            end="2024-12-11"
          ></TermRow>
          <TermRow
            id="12104"
            name="Fall 2025"
            start="2024-09-03"
            end="2024-12-11"
          ></TermRow>
          <tr>
            <td className="p-2 term-name">
              <input
                className="form-control"
                type="text"
                id="new-term-name"
                placeholder='New term...'
              />
            </td>
            <td className="p-2 term-start">
              <input
                className="form-control"
                type="date"
                id="new-term-start"
              />
              <label className="d-md-none">Start Date</label>
            </td>
            <td className="p-2 term-end">
              <input
                className="form-control"
                type="date"
                id="new-term-end"
              />
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
      <Link className="btn btn-primary mt-4" to="../home">
        Done
      </Link>
    </div>

  );
}