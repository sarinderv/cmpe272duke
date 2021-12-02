import { API, Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { listTimesheets } from '../graphql/queries';
import { listEmployeeIdsByManager } from '../graphql/customQueries';
import {
    Container,
    Row,
    Button,
    Table,
} from "react-bootstrap";

export default function Timesheet() {
    const [rows, setRows] = useState([]);
    const [userData, setUserData] = useState({ payload: { username: '' } });
    const [employeesByManager, setEmployeesByManager] = useState([]);
    const history = useHistory();

    useEffect(() => {
        list();
        fetchUserData();
    }, []);

    async function fetchUserData() {
        await Auth.currentAuthenticatedUser()
            .then((userSession) => {
                console.log("userData: ", userSession);
                setUserData(userSession.signInUserSession.accessToken);
                fetchEmployeesByManager(userSession.signInUserSession.accessToken.payload.username);
            })
            .catch((e) => console.log("Not signed in", e));
    }

    function isAdmin() {
        return userData.payload['cognito:groups'] && userData.payload['cognito:groups'][0] === "Admins";
    }

    function isManager() {
        return userData.payload['cognito:groups'] && userData.payload['cognito:groups'][0] === "Manager";
    }

    function isHrManager() {
        return userData.payload['cognito:groups'] && userData.payload['cognito:groups'][0] === "HrManager";
    }

    async function list() {
        try {
            const apiData = await API.graphql({ query: listTimesheets });
            console.log(apiData);
            setRows(apiData.data.listTimesheets.items);
        } catch (e) {
            console.log("Errors fetching rows...", e);
            alert(e.errors ? e.errors[0].message : e);
        }
    }

    async function fetchEmployeesByManager(userName) {
        try {
            const apiData = await API.graphql({ query: listEmployeeIdsByManager, variables: { managerId: userName } });
            setEmployeesByManager(apiData.data.listEmployees.items.map((e) => e.id));
        } catch (e) {
            console.error('error fetching employees', e);
            alert(e.errors ? e.errors[0].message : e);
        }
    }

    const handleSubmit = () => history.push("/createtimesheet");
    const handleOpen = (id) => { console.log(id); history.push("/viewtimesheet/" + id); };
    const comparator = (a, b) => { return a.updatedAt < b.updatedAt ? -1 : 1 };
    const filter = (e) => { return !isManager() || employeesByManager.includes(e.owner) || e.owner === userData.payload.username };

    return (
        <Container>
            <Row>
                <br />
            </Row>
            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {isAdmin() || isManager() || isHrManager() ? <th>Owner</th> : ""}
                            <th>Total Hours</th>
                            <th>Filled Date</th>
                            <th>Updated</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.sort(comparator).filter(filter).map(row => (
                            <tr key={row.id}>
                                {isAdmin() || isManager() || isHrManager() ? <td>{row.owner}</td> : ""}
                                <td>{row.hours}</td>
                                <td>{new Date(row.fillDate).toLocaleDateString("en-US")}</td>
                                <td>{new Date(row.updatedAt).toLocaleString("en-US")}</td>
                                <td><Button variant="secondary" onClick={() => handleOpen(row.id)}>Open</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
            <Row>
                <Button variant="primary" onClick={handleSubmit}>Create New Timesheet</Button>
            </Row>
        </Container>
    )
}