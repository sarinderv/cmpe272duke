import API from '@aws-amplify/api';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { listTimesheets } from '../graphql/queries';
import {
    Container,
    Row,
    Button,
    Table,
} from "react-bootstrap";

export default function Timesheet() {
    const [rows, setRows] = useState([]);
    const history = useHistory();

    useEffect(() => {
        list();
    }, []);

    async function list() {
        try {
            const apiData = await API.graphql({ query: listTimesheets });
            console.log(apiData);
            setRows(apiData.data.listTimesheets.items);
        } catch (e) {
            console.log("Errors fetching rows...", e);
        }
    }

    const handleSubmit = () => history.push("/createtimesheet");
    const handleOpen = (id) => {console.log(id); history.push("/viewtimesheet/"+ id);};

    return (
        <Container>
            <Row>
                <Button variant="primary" onClick={handleSubmit}>Create New Timesheet</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Total Hours</th>
                            <th>Filled Date</th>
                            <th>Created</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(row => (
                            <tr key={row.id}>
                                <td>{row.hours}</td>
                                <td>{new Date(row.fillDate).toLocaleDateString("en-US")}</td>
                                <td>{new Date(row.createdAt).toLocaleString("en-US")}</td>
                                <td><Button variant="secondary" onClick={() => handleOpen(row.id)}>Open</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}