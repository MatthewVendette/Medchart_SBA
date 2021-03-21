import { useEffect } from 'react';
import NavBar from './NavBar';
import { Container } from 'react-bootstrap';
import BloodWorkDashboard from '../../features/bloodworks/dashboard/BloodWorkDashboard';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const {bloodWorkStore, commonStore, userStore} = useStore();

  //get the bloodwork results from database and set in state
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser();
    }
    bloodWorkStore.loadBloodWorks();
  }, [bloodWorkStore, commonStore, userStore])

  return (
    <>
      <NavBar/>
      <Container style={{marginTop:'3em'}}>
        <BloodWorkDashboard/>
      </Container>
    </>
  );
}

export default observer(App);
