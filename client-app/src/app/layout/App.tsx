import { useEffect } from 'react';
import NavBar from './NavBar';
import { Container } from 'react-bootstrap';
import BloodWorkDashboard from '../../features/bloodworks/dashboard/BloodWorkDashboard';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const { commonStore, userStore} = useStore();

  //Log in user from previous token
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser();
    }
  }, [commonStore, userStore])

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
