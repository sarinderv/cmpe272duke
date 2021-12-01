import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { API } from 'aws-amplify';
import "./Timesheet.css";
import { createTimesheet } from '../graphql/mutations';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { getTimesheet } from '../graphql/queries';
import { Alert } from "react-bootstrap";

export default function ViewTimesheet() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    list();
  }, []);

  async function list() {
    try {
      const apiData = await API.graphql({ query: getTimesheet, variables: { id: "1" } });
      console.log(apiData);
      setRows(apiData.data.getTimesheet);
    } catch (e) {
      console.log("Errors fetching rows...", e);
      setError(e) //e.errors[0].message);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await API.graphql({
        query: createTimesheet, variables: {
          input: {
          }
        }
      });
    } catch (e) {
      console.error('error creating Timesheet', e);
      setError(e.errors);
    }
    history.push("/Timesheet");
  }

  const columns = [{
    dataField: 'id',
    text: 'id'
  }, {
    dataField: 'hours',
    text: 'Hours'
  }, {
    dataField: 'created',
    text: 'Created'
  }];

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
    if (!rows) {
      return 'Timesheet not found';
    }
    else {
      return (
        <div class="timesheet">
          {errorMsg}
          <BootstrapTable
            keyField="id"
            data={rows}
            columns={columns}
            cellEdit={cellEditFactory({ mode: 'click' })}
          />
        </div>
      );
    }
  }

  return <div className="timesheet"> <h1>View/Edit Timesheet</h1> {render()} </div>;
}
