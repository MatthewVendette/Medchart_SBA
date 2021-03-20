import React from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import { BloodWork } from '../../../app/models/bloodWork';

interface Props {
    bloodWork: BloodWork;
    cancelSelectBloodWork: () => void;
    showModal: (id: string) => void;
}

export default function BloodWorkDetails({bloodWork, cancelSelectBloodWork, showModal}: Props) {
    return (
        <>
            <Card key={bloodWork.id} style={{marginBottom:'1em'}}>
                <Card.Body>
                    <Card.Title as='h4'>{bloodWork.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{bloodWork.description}</Card.Subtitle> <hr />
                    <Card.Text>
                        <b>Exam date</b>: {bloodWork.examDate} <hr />
                        <b>Results date</b>: {bloodWork.resultsDate} <hr />
                        <b>Hemoglobin count</b>: {bloodWork.hemoglobin} <hr />
                        <b>Hematocrit count</b>: {bloodWork.hematocrit} <hr />
                        <b>White blood cell count</b>: {bloodWork.whiteBloodCellCount} <hr />
                        <b>Red blood cell count</b>: {bloodWork.redBloodCellCount}
                    </Card.Text>
                    <div className="float-right">
                        <ButtonGroup aria-label="Report controls">
                            <Button onClick={() => showModal(bloodWork.id)} variant="warning">Edit</Button>
                            <Button onClick={cancelSelectBloodWork} variant="danger">Cancel</Button>
                        </ButtonGroup>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}