import React from 'react';
import ClassRow from '../components/ClassRow';
import { Link } from "react-router-dom";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import addUserData from '../functions/addUserData';
import { Navigate } from "react-router-dom";

export function Classes({authenticated, userData, setUserData, currentTerm}) {

  const [newClass, setNewClass] = useState({name: "", color: "#a8a8a8"});

  let classRows = [];
  for (const [key, value] of Object.entries(userData.classes)) {
    if (value.term == currentTerm) {
        classRows.push(
          <ClassRow
          userData={userData}
          setUserData={setUserData}
          currentTerm={currentTerm}
          key={key}
          id={key}
          name={value.name}
          color={value.color}
        ></ClassRow>);
      }
  }

  function updateNewClass(key, value) {
    let data = {...newClass};
    data[key] = value;
    setNewClass(data);
  }

  function addClass() {
    if (newClass.name !== "" && newClass.color !== "") {
      let classId = "";
      while (classId === "") {
          let tempId = Math.floor(Math.random() * 90000) + 10000;
          if (!userData.classes.hasOwnProperty(tempId)) {
              classId = tempId;
          }
      }
      addUserData(userData, setUserData, "classes", classId, {...newClass, term:currentTerm});
      setNewClass({name: "", color: "#a8a8a8"});
    }
  }

  if (!authenticated) {
    return(<Navigate to="/" replace={true} />)
  } else {
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
            <td colSpan="3"><hr></hr></td>
          </tr>
          <tr>
            <td className="p-2">
              <input
                className="form-control"
                type="text"
                placeholder="New class..."
                onChange={(event) => updateNewClass("name", event.target.value)}
                value={newClass.name}
              />
            </td>
            <td>
              <input
                className="form-control mx-auto custom-color-picker"
                type="color"
                id="color"
                name="color"
                onChange={(event) => updateNewClass("color", event.target.value)}
                value={newClass.color}
              />
            </td>
            <td className="p-2 text-start">
              <Button variant={(newClass.name !== "" && newClass.color !== "") ? "primary" : "secondary"} onClick={addClass}>
                <i className="fa-solid fa-plus" />
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
      <Link className="btn btn-primary mt-4" to="../home">
        Home
      </Link>
    </div>
  );
  }
}