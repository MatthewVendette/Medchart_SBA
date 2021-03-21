import { Formik, Form } from 'formik';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/forms/MyTextInput';
import MyTextArea from '../../../app/common/forms/MyTextArea';
import MyDateInput from '../../../app/common/forms/MyDateInput';
import { BloodWork } from '../../../app/models/bloodWork';
import { observer } from 'mobx-react-lite';

export default observer(function BloodWorkForm() {

    const {bloodWorkStore} = useStore();
    const {selectedBloodWork, isModalFormOpen, hideModal, createBloodWork, updateBloodWork} = bloodWorkStore;

    //Use the selected blood work if there is one. Otherwise, set a blank blood work to use.
    const bloodWork = selectedBloodWork ?? {
        id: '',
        userId: '',
        title: '',
        examDate: null,
        resultsDate: null,
        description: '',
        hemoglobin: 0,
        hematocrit: 0,
        whiteBloodCellCount: 0,
        redBloodCellCount: 0
    }

    const validationSchema = Yup.object({
        title: Yup.string().required('The blood work report title is required.'),
        examDate: Yup.string().required('The blood work report exam date is required.'),
        resultsDate: Yup.string().required('The blood work results date is required.'),
        description: Yup.string().required('The blood work report description is required.'),
        hemoglobin: Yup.string().required('The blood work report hemoglobin count is required.'),
        hematocrit: Yup.string().required('The blood work report hematocrit is required.'),
        whiteBloodCellCount: Yup.string().required('The blood work report white blood cell count is required.'),
        redBloodCellCount: Yup.string().required('The blood work report red blood cell count is required.')
    })

    function handleFormSubmit(bloodWork: BloodWork) {
       bloodWork.id ? updateBloodWork(bloodWork) : createBloodWork(bloodWork);
    }

    return (
        <>
            <Modal 
                show={isModalFormOpen} 
                onHide={hideModal} 
                backdrop="static"
            >
                <div style={{marginRight:"1em", marginLeft:"1em", marginTop:"1em", marginBottom:"1em"}}>
                    <Formik 
                        enableReinitialize 
                        validationSchema={validationSchema} 
                        initialValues={bloodWork} 
                        onSubmit={values => handleFormSubmit(values)}
                    >
                        {({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit} autoComplete="off">
                                <Modal.Header><Modal.Title>Blood Work Report</Modal.Title></Modal.Header>
                                <MyTextInput placeholder='Title' name='title' />
                                <MyTextArea placeholder='Description' name='description' rows={3}/>
                                <MyTextInput placeholder='Hemoglobin' name='hemoglobin' type='number'/>
                                <MyTextInput placeholder='Hematocrit' name='hematocrit' type='number'/>
                                <MyTextInput placeholder='White Blood Cell Count' name='whiteBloodCellCount' type='number'/>
                                <MyTextInput placeholder='Red Blood Cell Count' name='redBloodCellCount' type='number'/>
                                <MyDateInput
                                    placeholderText='Exam Date' 
                                    name='examDate'
                                    dateFormat='MMMM d, yyyy'
                                    title="Exam Date"
                                />
                                <MyDateInput
                                    placeholderText='Results Date' 
                                    name='resultsDate'
                                    dateFormat='MMMM d, yyyy'
                                    title="Results Date"
                                />
                                <Button variant="success" type="submit">Submit</Button>
                                <Button variant="secondary" onClick={hideModal}>Cancel</Button>
                        </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </>
    )
})