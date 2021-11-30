{/* <BootstrapTable
                    selectRow = {selectRowProp}
                    striped
                    hover
                    condensed
                    pagination
                    insertRow
                    deleteRow
                    search
                >
                    <TableHeaderColumn dataField="id" isKey dataAlign="right" dataSort>Hours</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" dataSort>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="price" dataAlign="center" dataFormat={format}>Product Price</TableHeaderColumn>
                </BootstrapTable>
                <h3>User List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>DoB</th>
                            <th>Marital Status</th>
                            <th>Smoking</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                         { this.userList() } 
                    </tbody>
                </table> */}

    //   async function handleSubmit(event) {
    //     event.preventDefault();
    //     try {
    //       await API.graphql({ query: createTimesheet, variables: { input: {hours: fields.hours, fillDate: fields.fillDate, id: userData.payload.username, employeeID: userData.payload.username} } });
    //     } catch (e) {
    //       console.error('error with timesheet', e);
    //       setErrorMessages(e.errors);
    //     }
    //     history.push("/timesheet");
    //   }

                    {/* <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="hours" size="lg">
                        <Form.Label>No. of hours worked</Form.Label>
                        <Form.Control
                        type="text"
                        value={fields.hours}
                        onChange={handleFieldChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="fillDate" size="lg">
                        <Form.Label>Date of work</Form.Label>
                        <Form.Control
                        type="date"
                        value={fields.fillDate}
                        onChange={handleFieldChange}
                        />
                    </Form.Group>
                    <Button block size="lg" type="submit" disabled={!validateForm()}>
                        Create Timesheet
                    </Button>
            </Form> */}