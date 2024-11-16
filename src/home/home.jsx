import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TaskRow from '../components/TaskRow';
import ExamRow from '../components/ExamRow';
import { Navigate } from "react-router-dom";

export function Home({authenticated, userData, setUserData, currentTerm}) {


  let completeTasks = [];
  for (const [key, value] of Object.entries(userData.assignments)) {
    if (value.completed && userData.classes[value.classId].term === currentTerm) {
      completeTasks.push(
      <TaskRow
        userData={userData}
        setUserData={setUserData}
        currentTerm={currentTerm}
        key={key}
        id={key}
        completed={value.completed}
        name={value.name}
        due={value.due}
        finish={value.finish}
        taskClass={userData.classes[value.classId].name}
      ></TaskRow>
      )
    }
  };
  let incompleteTasks = [];
  for (const [key, value] of Object.entries(userData.assignments)) {
    if (!value.completed && userData.classes[value.classId].term === currentTerm) {
      incompleteTasks.push(
      <TaskRow
        userData={userData}
        setUserData={setUserData}
        currentTerm={currentTerm}
        key={key}
        id={key}
        completed={value.completed}
        name={value.name}
        due={value.due}
        finish={value.finish}
        taskClass={userData.classes[value.classId].name}
      ></TaskRow>
      )
    }
  };
  let exams = [];
  for (const [key, value] of Object.entries(userData.exams)) {
    if (userData.classes[value.classId].term === currentTerm) {
      exams.push(
        <ExamRow
        userData={userData}
        setUserData={setUserData}
        currentTerm={currentTerm}
        key={key}
        id={key}
        completed={value.completed}
        name={value.name}
        open={value.open}
        close={value.close}
        finish={value.finish}
        examClass={userData.classes[value.classId].name}
      ></ExamRow>
      )
    }
  };

  if (!authenticated) {
    return(<Navigate to="/" replace={true} />)
  } else {
  return (
    <>
      <Tabs
        defaultActiveKey="tasks"
        className="justify-content-center nav-tabs-sticky bg-body"
        id="taskTabs"
      >
        <Tab eventKey="tasks" title="Tasks">
        <table className="tab-table">
            <tbody>
              <tr className="task-table-header">
                <th width="30px"/>
                <th>Task</th>
                <th width="170px">Due Date</th>
                <th width="170px">Finish By</th>
                <th width="150px">Class</th>
                <th width="20px" />
              </tr>
              {incompleteTasks}
            </tbody>
          </table>
        </Tab>
        <Tab eventKey="completed" title="Completed">
        <table className="tab-table">
            <tbody>
            <tr className="task-table-header">
                <th width="30px"/>
                <th>Task</th>
                <th width="170px">Due Date</th>
                <th width="170px">Finish By</th>
                <th width="150px">Class</th>
                <th width="20px" />
              </tr>
              {completeTasks}
            </tbody>
          </table>
        </Tab>
        <Tab eventKey="exams" title="Exams">
        <table className='tab-table'>
            <tbody>
              <tr className="exam-table-header">
                <th width="30px" />
                <th>Exam</th>
                <th width="160px">Open Date</th>
                <th width="160px">Close Date</th>
                <th width="160px">Finish By</th>
                <th width="150px">Class</th>
                <th width="20px" />
              </tr>
              {exams}
            </tbody>
          </table>
        </Tab>
      </Tabs>
    </>
  );
  };
}