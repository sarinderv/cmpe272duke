import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { API, Auth } from 'aws-amplify';
import "./Timesheet.css";
import { updateTimesheet, deleteTimesheet } from '../graphql/mutations';
import { getTimesheet } from '../graphql/queries';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Type } from 'react-bootstrap-table2-editor';
import { Alert, Button } from "react-bootstrap";

var rowid = 0;

export default function ViewTimesheet() {
  const [rows, setRows] = useState([]);
  const [timesheet, setTimesheet] = useState();
  const [error, setError] = useState(false);
  const history = useHistory();

  let location = useLocation();

  useEffect(() => {
    let timesheetId = location.pathname.split('/').pop();
    console.log('timesheetId:', timesheetId);
    fetchData(timesheetId);
  }, []);

  async function fetchData(id) {
    try {
      const apiData = await API.graphql({ query: getTimesheet, variables: { id: id } });
      console.log(apiData);
      let weeks = apiData.data.getTimesheet.weeks;
      if (weeks) {
        let rows = JSON.parse(weeks);
        setRows(rows);
        rowid = rows.map((e) => e.id).reduce((p, c) => { return c > p ? c : p });
        console.log('starting rowid: ', rowid);
      }
      setTimesheet(apiData.data.getTimesheet);
    } catch (e) {
      console.log("Errors fetching rows...", e);
    }
  }

  async function handleDelete() {
    try {
      const apiData = await API.graphql({ query: deleteTimesheet, variables: { input: { id: timesheet.id } } });
      console.log(apiData);
      history.push("/timesheets");
    } catch (e) {
      console.log("Errors deleting timesheet...", e);
      setError(e.errors ? e.errors[0].message : "Errors deleting timesheet");
    }
  }

  async function handleSave() {
    try {
      let weeklyHours = (prev, week) => { return prev + week.mon + week.tue + week.wed + week.thu + week.fri + week.sat + week.sun };
      let hours = rows.reduce(weeklyHours, 0);
      let updatedTimesheet = {
        id: timesheet.id,
        fillDate: new Date(),
        hours: hours,
        weeks: JSON.stringify(rows)
      };
      console.log(updatedTimesheet);
      await API.graphql({
        query: updateTimesheet, variables: {
          input: updatedTimesheet
        }
      });
      history.push("/timesheets");
    } catch (e) {
      console.error('error updating Timesheet', e);
      setError(e.errors[0].message);
    }
  }

  const columns = [{
    dataField: 'task',
    text: 'Task'
  }, {
    dataField: 'week',
    text: 'Week/Date',
    editor: {
      type: Type.DATE,
    }
  }, {
    dataField: 'mon',
    text: 'Monday',
    type: 'number',
    validator: validNumber
  }, {
    dataField: 'tue',
    text: 'Tuesday',
    type: 'number',
    validator: validNumber
  }, {
    dataField: 'wed',
    text: 'Wednesday',
    type: 'number',
    validator: validNumber
  }, {
    dataField: 'thu',
    text: 'Thursday',
    type: 'number',
    validator: validNumber
  }, {
    dataField: 'fri',
    text: 'Friday',
    type: 'number',
    validator: validNumber
  }, {
    dataField: 'sat',
    text: 'Saturday',
    type: 'number',
    validator: validNumber
  }, {
    dataField: 'sun',
    text: 'Sunday',
    type: 'number',
    validator: validNumber
  }];

  function validNumber(newVal, row, column) {
    if (isNaN(newVal))
      return {
        valid: false,
        message: 'invalid'
      }
    else {
      return true;
    }
  }

  function addNewRow() {
    let newRow = { id: ++rowid, task: '', week: '', mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
    console.log('adding', newRow);
    setRows([...rows, newRow]);
  }

  function render() {
    let errorMsg;
    if (error) {
      errorMsg = <Alert variant="danger" onClose={() => setError(false)} dismissible>
        <p> {error} </p>
      </Alert>
    }
    else {
      errorMsg = ''
    }
    return (
      <div class="timesheet">
        {errorMsg}
        <Button variant="primary" onClick={() => handleSave()}>Submit</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="danger" onClick={() => handleDelete()}>Delete</Button>
        <br /><br />Click a cell to update it:
        <BootstrapTable
          keyField="id"
          data={rows}
          columns={columns}
          cellEdit={cellEditFactory({ mode: 'click', blurToSave: 'true' })}
        />
        <Button variant="secondary" onClick={() => addNewRow()}>Add row</Button>
      </div>
    );
  }

  return <div className="timesheet"> <h2>Timesheet</h2>{render()} </div>;
}
