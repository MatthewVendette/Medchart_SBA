import { useEffect } from 'react';
import NavBar from './NavBar';
import { Container } from 'react-bootstrap';
import BloodWorkDashboard from '../../features/bloodworks/dashboard/BloodWorkDashboard';
import { useStore } from '../stores/store';

function App() {

  const {bloodWorkStore} = useStore();

  //get the bloodwork results from database and set in state
  useEffect(() => {
    bloodWorkStore.loadBloodWorks();
  }, [bloodWorkStore])

  return (
    <>
      <NavBar/>
      <Container style={{marginTop:'3em'}}>
        <BloodWorkDashboard/>
      </Container>
    </>
  );
}

export default App;
