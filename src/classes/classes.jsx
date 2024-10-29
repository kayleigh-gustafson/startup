import React from 'react';
import ClassRow from '../components/ClassRow';
import { Link } from "react-router-dom";

export function Classes({userData, setUserData, currentTerm}) {
  let classRows = [];
  for (const [key, value] of Object.entries(userData.classes)) {
    if (value.term == currentTerm) {
        classRows.push(
          <ClassRow
          userData={userData}
          setUserData={setUserData}
          key={key}
          id={key}
          name={value.name}
          color={value.color}
        ></ClassRow>);
      }
  }
  return (
    <div id="manage-class-content" className="text-center">
      <h4 className="pb-5">{userData.terms[currentTerm].name} Classes</h4>
      <table className="mx-auto">
        <tbody>
          <tr className="text-start class-table-header">
            <th className="px-2">Name</th>
            <th className="px-2">Color</th>
            <th className="px-2" />
          </tr>
          {classRows}
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
      <Link className="btn btn-primary mt-4" to="../home">
        Done
      </Link>
    </div>
  );
}