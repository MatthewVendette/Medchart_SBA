import React from 'react';
import { Col, Container, Row } from 'react-bootstrap'
import { BloodWork } from '../../../app/models/bloodWork';
import BloodWorkDetails from '../details/BloodWorkDetails';
import BloodWorkForm from '../form/BloodWorkForm';
import BloodWorkList from './BloodWorkList';

interface Props {
    bloodWorks: BloodWork[];
    selectedBloodWork: BloodWork | undefined;
    selectBloodWork: (id: string) => void;
    cancelSelectBloodWork: () => void;
    isModalFormOpen: boolean;
    showModal: (id: string) => void;
    hideModal: () => void;
    createOrEdit: (bloodWork: BloodWork) => void;
    deleteBloodWork: (id: string) => void;
}

export default function BloodWorkDashboard({bloodWorks, selectedBloodWork, selectBloodWork,
    cancelSelectBloodWork, isModalFormOpen, showModal, hideModal, createOrEdit, deleteBloodWork}: Props) {
    return (
        <Container>
            <Row>
                <Col xs={4} >
                    <BloodWorkList 
                        bloodWorks={bloodWorks} 
                        selectBloodWork={selectBloodWork}
                        deleteBloodWork={deleteBloodWork}
                    />
                </Col>
                <Col>

                {selectedBloodWork && 
                    <BloodWorkDetails 
                        bloodWork={selectedBloodWork} 
                        cancelSelectBloodWork={cancelSelectBloodWork}
                        showModal={showModal}
                    />} {/* Only attempt to load details when one exists to be loaded */}

                { isModalFormOpen &&
                <BloodWorkForm 
                    bloodWork={selectedBloodWork} 
                    isModalFormOpen={isModalFormOpen} 
                    hideModal={hideModal}
                    createOrEdit={createOrEdit}
                />}
                </Col>
            </Row>
        </Container>
    )
}