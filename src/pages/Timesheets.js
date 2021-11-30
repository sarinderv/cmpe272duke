import { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { useFormFields } from "../lib/hooksLib";
import { API } from 'aws-amplify';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { listTimesheetByEmployee} from '../graphql/customQueries';
import "./Timesheet.css";
import { createTimesheet, deleteTimesheet } from '../graphql/mutations';
import { Link } from 'react-router-dom';

export default function Timesheets() {

    const [userData, setUserData] = useState({ payload: { username: '' } });
    const [errorMessages, setErrorMessages] = useState([]);
    const [timesheets, setTimesheet]= useState([]);
    const [fields, handleFieldChange] = useFormFields({
      hours:"",
      fillDate:""
    });
    const history = useHistory();
  
    useEffect(() => {
      fetchUserData();
      }, [])

    function format(cell, row){
        return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
      }
      
      var selectRowProp = {
        mode: "checkbox",
        clickToSelect: true,
        bgColor: "rgb(238, 193, 213)" 
      };
    
      async function fetchUserData() {
        await Auth.currentAuthenticatedUser()
          .then((userSession) => {
            console.log("userData: ", userSession);
            fetchTimesheetData(userSession.signInUserSession.accessToken.payload.username);
          })
          .catch((e) => console.log("Not signed in", e));
      }

      async function fetchTimesheetData(userName) {
        console.log("inside fetch timesheet" );
        try {
            const apiData = await API.graphql({ query: listTimesheetByEmployee, variables: { employeeID: userName ,fillDate: new Date().toISOString().slice(0, 10) }  });
            console.log(apiData.data.listTimesheets.items);
            function sortFunction(a, b) {
              return a.fillDate < b.fillDate ? 1 : -1;
            }
            const sortedData = apiData.data.listTimesheets.items.sort(sortFunction);
            setTimesheet(sortedData);
        }catch(e){
            console.error('error fetching Timesheet', e);
            setErrorMessages(e.errors);
        }
        
      }

      async function deleteTimesheetById({ id }) {

        try {
          console.log("inside delete appointment " + id);
          const newTimesheetArray = timesheets.filter(timesheet => timesheet.id !== id);
          setTimesheet(newTimesheetArray);
          await API.graphql({ query: deleteTimesheet, variables: { input: { id } }});
   
  
        }catch (e) {
            console.error('error deleting appointment', e);
            setErrorMessages(e.errors);
        }
      
      }

      
    function renderTimesheet(){
        return (
            <div className='tableTimesheet'>
                <h3 style={{textAlign:'left'}}>Employee Name:</h3>
                <h3 style={{textAlign:'left'}}>Employee ID: </h3>

            <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Hours of work</th>
                            <th>Date </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    timesheets.map(timesheet => (
                            <tr key={timesheet.id || timesheet.fillDate} >
                            <td>{timesheet.hours}</td>
                            <td>{timesheet.fillDate}</td>
                            {/* <td> {appointment.doctor != null ? appointment.doctor.firstName +" "+appointment.doctor.lastName : ""}</td>
                            <td>{appointment.description != null ?  appointment.description : ""} </td> */}
                            <td><button onClick={() => deleteTimesheetById(timesheet)}>Delete</button></td>
                            
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
    return <div className="timesheets"> <h1> TIME SHEET</h1> {renderTimesheet()} </div>;
}