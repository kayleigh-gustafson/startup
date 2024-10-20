import React from 'react';
import ClassRow from '../components/ClassRow';
import { Link } from "react-router-dom";

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
          <ClassRow
            id="19252"
            name="A HTG 100"
            color="#d0f069"
          ></ClassRow>
          <ClassRow
            id="10363"
            name="CS 260"
            color="#14ba99"
          ></ClassRow>
          <ClassRow
            id="39163"
            name="WRTG 150"
            color="#8dba63"
          ></ClassRow>
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