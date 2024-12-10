import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TaskRow from '../components/TaskRow';
import ExamRow from '../components/ExamRow';
import { Navigate } from "react-router-dom";

export function Home({onFinish, authenticated, userData, setUserData, currentTerm}) {

  if (!authenticated) return (<Navigate to="/" replace={true} />);

  let completeTasks = [];
  for (const [key, value] of Object.entries(userData.assignments)) {
    if (value.completed && userData.classes[value.classId].term.toString() === currentTerm.toString()) {
      completeTasks.push(
      <TaskRow
        onFinish={onFinish}
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
  completeTasks.sort((a, b) => new Date(a.props.finish) - new Date(b.props.finish));
  if (completeTasks.length < 1) {
    completeTasks.push(
      <tr key="0">
        <td colSpan="6" className="no-tab-content">Nothing to see here...</td>
      </tr>
    )
  }
  let incompleteTasks = [];
  for (const [key, value] of Object.entries(userData.assignments)) {
    if (!value.completed && userData.classes[value.classId].term.toString() === currentTerm.toString()) {
      incompleteTasks.push(
      <TaskRow
        onFinish={onFinish}
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
  incompleteTasks.sort((a, b) => new Date(a.props.finish) - new Date(b.props.finish));
  if (incompleteTasks.length < 1) {
    incompleteTasks.push(
      <tr key="0">
        <td colSpan="6" className="no-tab-content">Nothing to see here...</td>
      </tr>
    )
  }
  let exams = [];
  for (const [key, value] of Object.entries(userData.exams)) {
    if (userData.classes[value.classId].term.toString() === currentTerm.toString()) {
      exams.push(
        <ExamRow
        onFinish={onFinish}
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
  exams.sort((a, b) => new Date(a.props.finish) - new Date(b.props.finish));
  if (exams.length < 1) {
    exams.push(
      <tr key="0">
        <td colSpan="7" className="no-tab-content">Nothing to see here...</td>
      </tr>
    )
  }

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
                <th className="show-large" width="170px">Due Date</th>
                <th width="170px">Finish By</th>
                <th className="show-large" width="150px">Class</th>
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
                <th className="show-large" width="170px">Due Date</th>
                <th width="170px">Finish By</th>
                <th className="show-large" width="150px">Class</th>
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
                <th className="show-large" width="160px">Open Date</th>
                <th className="show-large" width="160px">Close Date</th>
                <th width="160px">Finish By</th>
                <th className="show-large" width="150px">Class</th>
                <th width="20px" />
              </tr>
              {exams}
            </tbody>
          </table>
        </Tab>
      </Tabs>
    </>
  );

}