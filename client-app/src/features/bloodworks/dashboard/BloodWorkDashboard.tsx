import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap'
import { useStore } from '../../../app/stores/store';
import LoginForm from '../../users/LoginForm';
import BloodWorkChart from '../charts/BloodWorkChart';
import BloodWorkDetails from '../details/BloodWorkDetails';
import BloodWorkForm from '../form/BloodWorkForm';
import BloodWorkList from './BloodWorkList';


export default observer (function BloodWorkDashboard() {

    const {bloodWorkStore, userStore} = useStore();
    const {selectedBloodWork, isModalFormOpen, isModalChartOpen} = bloodWorkStore;
    const {isModalLoginOpen} = userStore;

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

                { isModalLoginOpen &&
                    <LoginForm />}

                { isModalChartOpen &&
                    <BloodWorkChart/>}
                </Col>
            </Row>
        </Container>
    )
})