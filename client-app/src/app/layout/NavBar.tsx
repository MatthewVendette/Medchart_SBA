import React from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { useStore } from '../stores/store';


export default function NavBar() {

    const {bloodWorkStore} = useStore();

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand>
                    <img
                        src="..\..\assets\bw_logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Bloodworks Logo"
                        style={{marginRight:'10px'}}
                    />
                    Matt's SBA</Navbar.Brand>
                <Nav className="mr-auto">
                    {/* <Nav.Link>Home</Nav.Link>
                    <Nav.Link style={{marginRight:'10px'}}>Accounts</Nav.Link> */}
                    <Form inline>
                        <Button variant="outline-light" onClick={() => bloodWorkStore.showModal()}>Submit new bloodwork</Button>
                    </Form>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="secondary">Search</Button>
                </Form>
            </Navbar>
        </>
    )
}