import { useField } from 'formik';
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string
}

export default function MyTextInput(props: Props) {
    const [field] = useField(props.name);
    return (
        <Form.Group>
            <InputGroup hasValidation>
                <InputGroup.Prepend><InputGroup.Text>{props.label ?? props.placeholder}</InputGroup.Text></InputGroup.Prepend>
                <Form.Control {...field} {...props} required/>
            </InputGroup>
        </Form.Group>
    )
}

