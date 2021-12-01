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

    const handleSubmit = () => history.push("/createtimesheet");;

    return (
        <Container>
            <Row>
                <Button variant="primary" onClick={handleSubmit}>Create New Timesheet</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Total Hours</th>
                            <th>Created</th>
                            <th>Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(row => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.hours}</td>
                                <td>{new Date(row.createdAt).toLocaleString("en-US")}</td>
                                <td>{new Date(row.updatedAt).toLocaleString("en-US")}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}