import API from '@aws-amplify/api';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { listPayrolls } from '../graphql/queries';
import {
    Container,
    Row,
    Button,
    Table,
} from "react-bootstrap";

export default function Payroll() {
    const history = useHistory();
    const [listPat, setListPat] = useState([]);

    useEffect(() => {
        list();
    }, []);

    async function list() {
        try {
            const apiData = await API.graphql({ query: listPayrolls });
            console.log(apiData);
            setListPat(apiData.data.listPayrolls.items);

            // if (apiData.data.listPatients.items == null) {
            //     history.push('/createpayroll')
            // }
        } catch (e) {
            console.log("Errors fetching Payrolls...", e);
        }
    }

    return (
        <Container>
            <Row>
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
                        {listPat.map(row => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.totalHours}</td>
                                <td>{row.createdAt}</td>
                                <td>{row.updatedAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}