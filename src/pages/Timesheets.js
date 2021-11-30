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
import UpdateTimesheet from "./UpdateTimesheet";
import CreateTimesheet from "./CreateTimesheet";
import { createTimesheet, deleteTimesheet } from '../graphql/mutations';
import { Link } from 'react-router-dom';

export default function Timesheets() {

    const [userData, setUserData] = useState({ payload: { username: '' } });
    const [errorMessages, setErrorMessages] = useState([]);
    const [timesheets, setTimesheet]= useState([]);
    const [selectedTimesheet, setselectedTimesheet] = useState([]);
    const [updateModalShow, setUpdateModalShow] = React.useState(false);
    const [createModalShow, setCreateModalShow] = React.useState(false);
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
    
      function openUpdateTimesheetModal(timesheet) {
        setselectedTimesheet(timesheet);
        setUpdateModalShow(true);
      }
      function openCreateTimesheetModal() {
        setCreateModalShow(true);
      }

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

            <table className="table striped bordered hover" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Hours of work</th>
                            <th>Date </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    timesheets.map(timesheet => (
                            <tr key={timesheet.id || timesheet.fillDate} >
                            <td>{timesheet.id}</td>
                            <td>{timesheet.hours}</td>
                            <td>{timesheet.fillDate}</td>
                            <td>
                            <Button variant="primary" size="sm" onClick={() => openUpdateTimesheetModal(timesheet)}>Edit</Button>{' '}
                            <Button onClick={() => deleteTimesheetById(timesheet)}>Delete</Button></td>
                            
                            </tr> 
                        ))
                        }
                    </tbody>
                </table>
                <Button variant="success" size="sm" onClick={() => openCreateTimesheetModal()}>Create</Button>
                {/* <UpdateTimesheet
                  show={updateModalShow}
                  timesheet={selectedTimesheet}
                  onUpdated={() => fetchTimesheetData(selectedTimesheet.employeeID)}
                  onHide={() => setUpdateModalShow(false)} 
                />  */}
             <CreateTimesheet
                  show={createModalShow}
                  onUpdated={() => fetchTimesheetData()}
                  onHide={() => setCreateModalShow(false)}
            />
            </div>
        );
    }
    return <div className="Timesheets"> <h1> TIME SHEET</h1> {renderTimesheet()} </div>;
}