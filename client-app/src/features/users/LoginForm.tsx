import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import ErrorMessage from '../../app/common/forms/ErrorMessage';
import MyTextInput from '../../app/common/forms/MyTextInput';
import { useStore } from '../../app/stores/store';

export default observer(function LoginForm() {

    const { userStore } = useStore();
    const {isModalLoginOpen, hideLoginModal, login} = userStore;

    return (
        <>
            <Modal
                show={isModalLoginOpen}
                onHide={hideLoginModal}
                backdrop='static'
            >
                <div style={{marginRight:"1em", marginLeft:"1em", marginTop:"1em", marginBottom:"1em"}}>
                    <Formik
                        initialValues={{email:'', password:'', error: null}}
                        onSubmit={(values, {setErrors})=>login(values)
                            .catch(error => setErrors({error: 'Invalid login credentials, please check that your email and password are correct.'}))}
                    >
                        {({handleSubmit, errors}) => (
                            <Form onSubmit={handleSubmit} autoComplete='off'>
                                <Modal.Header><Modal.Title>Log in</Modal.Title></Modal.Header>
                                <MyTextInput name='email' placeholder='Email'></MyTextInput>
                                <MyTextInput name='password' placeholder='Password' type='password'></MyTextInput>
                                {errors.error &&
                                    <ErrorMessage name="loginError" header="Error logging in" body={errors.error}></ErrorMessage>
                                }
                                <Button className="float-right" variant='success' type='submit'>Login</Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </>
    )
})