import React from 'react';
import { Button, Card, Form, Row } from 'react-bootstrap'; 
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer (function BloodWorkList() {

    const {bloodWorkStore} = useStore();
    const {deleteBloodWork, bloodWorksByExamDate} = bloodWorkStore;


    return (
        <>
            {bloodWorksByExamDate.map(bloodWork => (
            <div key={bloodWork.id}>
                <Row>
                    <Card style={{width:"100%"}}>
                        <Card.Body>
                            <Card.Title as='h4'>{bloodWork.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{bloodWork.description}</Card.Subtitle> <hr />
                            <Card.Text><b>Exam date</b>: {bloodWork.examDate}</Card.Text><hr />
                            <Card.Text><b>Results date</b>: {bloodWork.resultsDate}</Card.Text><hr />
                            <Form className="float-right">
                                <Button onClick={() => deleteBloodWork(bloodWork.id)} variant='danger' style={{marginRight:"5px"}}>Delete</Button>
                                <Button onClick={() => bloodWorkStore.selectBloodWork(bloodWork.id)} variant='primary'>View Details</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
                <br/>
            </div>
            ))}
        </>
    )
})