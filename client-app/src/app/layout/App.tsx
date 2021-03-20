import { useEffect, useState } from 'react';
import axios from 'axios';
import { BloodWork } from '../models/bloodWork';
import NavBar from './NavBar';
import { Container } from 'react-bootstrap';
import BloodWorkDashboard from '../../features/bloodworks/dashboard/BloodWorkDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [bloodWorks, setBloodWorks] = useState<BloodWork[]>([])
  const [selectedBloodWork, setSelectedBloodWork] = useState<BloodWork | undefined>(undefined);
  const [isModalFormOpen, setIsFormModalOpen] = useState(false);

  //get the bloodwork results from database and set in state
  useEffect(() => {
    axios.get<BloodWork[]>('http://localhost:5000/api/bloodworks').then(response => {
      setBloodWorks(response.data)
    })
  }, []) //only run once

  //When a BloodWork is selected, make it set in the page's state
  function handleSelectBloodWork(id: string) {
    setSelectedBloodWork(bloodWorks.find(x => x.id === id));
  }

  // When a BloodWork is unselected, remove it from state
  function handleCancelSelectBloodWork() {
    setSelectedBloodWork(undefined);
  }

  //Displays the Form Modal
  function showModal(id?: string) {
    id ? handleSelectBloodWork(id) : handleCancelSelectBloodWork();
    setIsFormModalOpen(true);
  }

  function hideModal() {
    setIsFormModalOpen(false);
  }

  function handleCreateOrEditBloodWork(bloodWork: BloodWork) {
    bloodWork.id 
    ? setBloodWorks([...bloodWorks.filter(x => x.id !== bloodWork.id), bloodWork])   //If there's an id, edit the given report
    : setBloodWorks([...bloodWorks, {...bloodWork, id: uuid()}]); //otherwise, append the new bloodwork to the end
    hideModal();
    setSelectedBloodWork(bloodWork);
  }

  function handleDelete(id: string) {
    setBloodWorks([...bloodWorks.filter(x => x.id !== id)]);
    handleCancelSelectBloodWork();
  }


  return (
    <>
      <NavBar isModalFormOpen={isModalFormOpen} showModal={showModal}/>
      <Container style={{marginTop:'3em'}}>
        <BloodWorkDashboard   
          bloodWorks={bloodWorks} 
          selectedBloodWork={selectedBloodWork} 
          selectBloodWork={handleSelectBloodWork} 
          cancelSelectBloodWork={handleCancelSelectBloodWork} 
          isModalFormOpen={isModalFormOpen}
          showModal={showModal}
          hideModal={hideModal}
          createOrEdit={handleCreateOrEditBloodWork}
          deleteBloodWork={handleDelete}
        />
      </Container>
    </>
  );
}

export default App;
