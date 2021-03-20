import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap'
import { useStore } from '../../../app/stores/store';
import BloodWorkDetails from '../details/BloodWorkDetails';
import BloodWorkForm from '../form/BloodWorkForm';
import BloodWorkList from './BloodWorkList';


export default observer (function BloodWorkDashboard() {

    const {bloodWorkStore} = useStore();
    const {selectedBloodWork, isModalFormOpen} = bloodWorkStore;

    return (
        <Container>
            <Row>
                <Col xs={5} >
                    <BloodWorkList/>
                </Col>
                <Col>

                {selectedBloodWork && 
                    <BloodWorkDetails
                    />} {/* Only attempt to load details when one exists to be loaded */}

                { isModalFormOpen &&
                <BloodWorkForm/>}
                </Col>
            </Row>
        </Container>
    )
})