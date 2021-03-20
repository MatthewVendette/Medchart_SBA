import React from 'react';
import { BloodWork } from '../../../app/models/bloodWork';
import { Button, Card, Form, Row } from 'react-bootstrap'; 

interface Props {
    bloodWorks: BloodWork[];
    selectBloodWork: (id: string) => void;
    deleteBloodWork: (id: string) => void;
}

export default function BloodWorkList({bloodWorks, selectBloodWork, deleteBloodWork}: Props) {
    return (
        <>
            {bloodWorks.map(bloodWork => (
            <div key={bloodWork.id}>
                <Row>
                    <Card style={{width:"100%"}}>
                        <Card.Body>
                            <Card.Title as='h4'>{bloodWork.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{bloodWork.description}</Card.Subtitle>
                            <Form className="float-right">
                                <Button onClick={() => deleteBloodWork(bloodWork.id)} variant='danger' style={{marginRight:"5px"}}>Delete</Button>
                                <Button onClick={() => selectBloodWork(bloodWork.id)} variant='primary'>View</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
                <br/>
            </div>
            ))}
        </>
    )
}