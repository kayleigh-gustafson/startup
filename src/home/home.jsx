import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TaskRow from '../components/TaskRow';
import ExamRow from '../components/ExamRow';

export function Home({userData, setUserData, currentTerm}) {


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
                <th />
                <th>Task</th>
                <th>Due Date</th>
                <th>Finish By</th>
                <th>Class</th>
                <th />
              </tr>
              {incompleteTasks}
            </tbody>
          </table>
        </Tab>
        <Tab eventKey="completed" title="Completed">
        <table className="tab-table">
            <tbody>
              <tr className="task-table-header">
                <th />
                <th>Task</th>
                <th>Due Date</th>
                <th>Finish By</th>
                <th>Class</th>
                <th />
              </tr>
              {completeTasks}
            </tbody>
          </table>
        </Tab>
        <Tab eventKey="exams" title="Exams">
        <table className='tab-table'>
            <tbody>
              <tr className="exam-table-header">
                <th />
                <th>Exam</th>
                <th>Open Date</th>
                <th>Close Date</th>
                <th>Finish By</th>
                <th>Class</th>
                <th />
              </tr>
              {exams}
            </tbody>
          </table>
        </Tab>
      </Tabs>
    </>
  );
}