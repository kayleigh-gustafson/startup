import React from 'react';
import TermRow from '../components/TermRow';
import { Link } from "react-router-dom";

export function Terms({userData, setUserData, currentTerm, setCurrentTerm}) {
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
          </tr>
          {termRows}
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