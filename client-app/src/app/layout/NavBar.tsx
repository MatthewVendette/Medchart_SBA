import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Form, Nav, Navbar } from 'react-bootstrap';
import { useStore } from '../stores/store';


export default observer(function NavBar() {

    const {bloodWorkStore, userStore} = useStore();

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
                    <Form inline>
                        <Button variant="outline-light" onClick={() => bloodWorkStore.showModal()}>Submit new bloodwork</Button>
                    </Form>
                </Nav>
                <Form inline>
                    {userStore.IsLoggedIn
                        ?   <>
                                <Navbar.Text style={{color:'white', marginRight:'4em'}}>Hello, {userStore.user?.firstName}!</Navbar.Text>
                                <Button variant='dark' style={{marginRight:'4em'}} onClick={() => userStore.logout()}>Sign out</Button>
                            </>
                        :   <Button variant='light' style={{marginRight:'4em'}} onClick={() => userStore.showLoginModal()}>Sign in</Button>
                    }
                    {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="secondary">Search</Button>         Search functionality probably out of scope for my time remaining*/}
                </Form>
            </Navbar>
        </>
    )
})