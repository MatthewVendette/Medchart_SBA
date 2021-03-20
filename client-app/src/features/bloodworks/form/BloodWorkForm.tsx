import React, { ChangeEvent, useState } from 'react';
import { FormControl, InputGroup, Button, ButtonGroup, Modal, Form } from 'react-bootstrap';
import { BloodWork } from '../../../app/models/bloodWork';

interface Props {
    bloodWork: BloodWork | undefined;
    hideModal: () => void;
    isModalFormOpen: boolean;
    createOrEdit: (bloodWork: BloodWork) => void;
}

export default function BloodWorkForm({bloodWork: selectedBloodWork, hideModal, isModalFormOpen, createOrEdit}: Props) {

    //Use the selected blood work if there is one. Otherwise, set a blank blood work to use.
    const initialState = selectedBloodWork ?? {
        id: '',
        title: '',
        examDate: '',
        resultsDate: '',
        description: '',
        hemoglobin: 0,
        hematocrit: 0,
        whiteBloodCellCount: 0,
        redBloodCellCount: 0
    }

    const [bloodWork, setBloodWork] = useState(initialState);

    function handleSubmit() {
       createOrEdit(bloodWork);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const{name, value} = event.target;
        setBloodWork({...bloodWork, [name]: value});
    }   

    return (
        <>
            <Modal 
                show={isModalFormOpen} 
                onHide={hideModal} 
                backdrop="static"
            >
                <div style={{marginRight:"1em", marginLeft:"1em", marginTop:"1em", marginBottom:"1em"}}>
                    <Form onSubmit={handleSubmit} autoComplete="off">
                        <Modal.Header><Modal.Title>Blood Work Report</Modal.Title></Modal.Header>

                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend><InputGroup.Text id="Title">Title</InputGroup.Text></InputGroup.Prepend>
                            <FormControl aria-label="Title" name="title" value={bloodWork.title} onChange={handleInputChange} required/>
                        </InputGroup>

                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend><InputGroup.Text id="ExamDate">Exam Date</InputGroup.Text></InputGroup.Prepend>
                            <FormControl type="date" aria-label="ExamDate" name="examDate" value={bloodWork.examDate} onChange={handleInputChange} required/>
                        </InputGroup>

                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend><InputGroup.Text id="ResultsDate">Results Date</InputGroup.Text></InputGroup.Prepend>
                            <FormControl type="date" aria-label="ResultsDate" name="resultsDate" value={bloodWork.resultsDate} onChange={handleInputChange} required/>
                        </InputGroup>

                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend><InputGroup.Text id="Description">Description</InputGroup.Text></InputGroup.Prepend>
                            <FormControl as="textarea" aria-label="Description" name="description" value={bloodWork.description} onChange={handleInputChange} required/>
                        </InputGroup>

                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend><InputGroup.Text id="Hemoglobin">Hemoglobin</InputGroup.Text></InputGroup.Prepend>
                            <FormControl type="number" aria-label="Hemoglobin" name="hemoglobin" value={bloodWork.hemoglobin} onChange={handleInputChange} required/>
                        </InputGroup>

                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend><InputGroup.Text id="Hematocrit">Hematocrit</InputGroup.Text></InputGroup.Prepend>
                            <FormControl type="number" aria-label="Hematocrit" name="hematocrit" value={bloodWork.hematocrit} onChange={handleInputChange} required/>
                        </InputGroup>

                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend><InputGroup.Text id="WhiteBloodCellCount">White Blood Cell Count</InputGroup.Text></InputGroup.Prepend>
                            <FormControl type="number" aria-label="WhiteBloodCellCount" name="whiteBloodCellCount" value={bloodWork.whiteBloodCellCount} onChange={handleInputChange} required/>
                        </InputGroup>

                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend><InputGroup.Text id="RedBloodCellCount">Red Blood Cell Count</InputGroup.Text></InputGroup.Prepend>
                            <FormControl type="number" aria-label="RedBloodCellCount" name="redBloodCellCount" value={bloodWork.redBloodCellCount} onChange={handleInputChange} required/>
                        </InputGroup>

                        <ButtonGroup className="float-right">
                            <Button variant="success" type="submit">Submit</Button>
                            <Button variant="danger" onClick={hideModal}>Cancel</Button>
                        </ButtonGroup>
                    </Form>
                </div>
            </Modal>
        </>
    )
}