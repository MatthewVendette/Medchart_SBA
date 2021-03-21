import { useField } from 'formik';
import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';

interface Props {
    name: string;
    header: string;
    body: string;
}

export default function ErrorMessage(props: Props) {
    const[show, setShow] = useState(true);
    const [field] = useField(props.name);
    return (
        <Alert {...field} show={show} variant="danger">
            <Alert.Heading>{props.header}</Alert.Heading>
            <p>{props.body}</p> <hr />
            <Button onClick={() => setShow(false)} variant="outline-danger">Dismiss</Button>
        </Alert>
    )
}

