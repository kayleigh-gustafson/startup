import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TaskRow from '../components/TaskRow';
import ExamRow from '../components/ExamRow';

export function Home() {
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
              <TaskRow
                id="12269"
                completed={false}
                name="Reading quiz"
                due="2024-10-01"
                finish="2024-09-29"
                taskClass="A HTG 100"
              ></TaskRow>
              <TaskRow
                id="39462"
                completed={false}
                name="Another assignment"
                due="2024-10-02"
                finish="2024-10-01"
                taskClass="CS 260"
              ></TaskRow>
              <TaskRow
                id="20183"
                completed={false}
                name="Some other assignment"
                due="2024-10-06"
                finish="2024-10-05"
                taskClass="WRTG 150"
              ></TaskRow>
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
              <TaskRow
                id="20378"
                completed={true}
                name="A random assignment"
                due="2024-10-06"
                finish="2024-10-05"
                taskClass="WRTG 150"
              ></TaskRow>
              <TaskRow
                id="20183"
                completed={true}
                name="Some other assignment"
                due="2024-10-06"
                finish="2024-10-05"
                taskClass="A HTG 100"
              ></TaskRow>
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
              <ExamRow
                id="20183"
                completed={true}
                name="Midterm #1"
                open="2024-10-01"
                due="2024-10-06"
                finish="2024-10-03"
                examClass="A HTG 100"
              ></ExamRow>
            </tbody>
          </table>
        </Tab>
      </Tabs>
    </>
  );
}