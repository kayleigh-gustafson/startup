import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TaskRow from '../components/TaskRow';
import ExamRow from '../components/ExamRow';
import databasePlaceholder from '../databasePlaceholder';
import getDataById from '../getDataById';

export function Home({userData, setUserData, currentTerm}) {

  // Generating lists for each tab
  console.log(userData.terms, userData.classes)
  console.log(getDataById(userData.classes, "32913").term)
  const completeTasksList = userData.assignments.filter(assignment => {
    return assignment.completed && getDataById(userData.classes, assignment.classId).term === currentTerm
  });
  const incompleteTasksList = userData.assignments.filter(assignment => {
    return !assignment.completed && getDataById(userData.classes, assignment.classId).term === currentTerm
  });
  const examList = userData.exams.filter(exam => {
    return getDataById(userData.classes, exam.classId).term === currentTerm
  });
  const completeTasks = completeTasksList.map((task, index) => {
    return (
      <TaskRow
        key={task.id}
        id={task.id}
        completed={task.completed}
        name={task.name}
        due={task.due}
        finish={task.finish}
        taskClass={getDataById(userData.classes, task.classId).name}
      ></TaskRow>
    );
  });
  const incompleteTasks = incompleteTasksList.map((task, index) => {
    return (
      <TaskRow
        key={task.id}
        id={task.id}
        completed={task.completed}
        name={task.name}
        due={task.due}
        finish={task.finish}
        taskClass={getDataById(userData.classes, task.classId).name}
      ></TaskRow>
    );
  });
  const exams = examList.map((task, index) => {
    return (
      <ExamRow
        key={task.id}
        id={task.id}
        completed={task.completed}
        name={task.name}
        open={task.open}
        due={task.close}
        finish={task.finish}
        examClass={getDataById(userData.classes, task.classId).name}
      ></ExamRow>
    );
  });

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