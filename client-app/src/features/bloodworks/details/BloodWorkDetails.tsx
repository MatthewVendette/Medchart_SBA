import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import { useStore } from '../../../app/stores/store';

export default observer(function BloodWorkDetails() {
    const {bloodWorkStore} = useStore();
    const {selectedBloodWork : bloodWork, showModal, cancelSelectBloodWork, showChartModal} = bloodWorkStore;

    if (!bloodWork) return (
        <></>
    );

    return (
        <>
            <Card key={bloodWork.id} style={{marginBottom:'1em'}}>
                <Card.Body>
                    <Card.Title as='h4'>{bloodWork.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{bloodWork.description}</Card.Subtitle><hr />
                    <Card.Text><b>Exam date</b>: {format(bloodWork.examDate!, 'MMMM d, yyyy')} </Card.Text><hr />
                    <Card.Text><b>Results date</b>: {format(bloodWork.resultsDate!, 'MMMM d, yyyy')} </Card.Text><hr />
                    <Card.Text><b>Hemoglobin count</b>: {bloodWork.hemoglobin} <Button variant='info' className="float-right" onClick={() => showChartModal("Hemoglobin")}>Show Chart</Button> </Card.Text> <hr />
                    <Card.Text><b>Hematocrit count</b>: {bloodWork.hematocrit} <Button variant='info' className="float-right" onClick={() => showChartModal("Hematocrit")}>Show Chart</Button> </Card.Text><hr />
                    <Card.Text><b>White blood cell count</b>: {bloodWork.whiteBloodCellCount} <Button variant='info' className="float-right" onClick={() => showChartModal("White blood cell count")}>Show Chart</Button> </Card.Text><hr />
                    <Card.Text><b>Red blood cell count</b>: {bloodWork.redBloodCellCount} <Button variant='info' className="float-right" onClick={() => showChartModal("Red blood cell count")}>Show Chart</Button> </Card.Text> <hr />
                    <div className="float-right">
                        <ButtonGroup aria-label="Report controls">
                            <Button onClick={() => showModal(bloodWork.id)} variant="warning">Edit</Button>
                            <Button onClick={cancelSelectBloodWork} variant="secondary">Cancel</Button>
                        </ButtonGroup>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
})