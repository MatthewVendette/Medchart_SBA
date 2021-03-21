import { useField } from 'formik';
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

interface Props {
    placeholder: string;
    name: string;
    rows: number;
    label?: string;
}

export default function MyTextArea(props: Props) {
    const [field] = useField(props.name);
    return (
        <Form.Group>
            <InputGroup hasValidation>
                <InputGroup.Prepend><InputGroup.Text>{props.label ?? props.placeholder}</InputGroup.Text></InputGroup.Prepend>
                <Form.Control as="textarea" {...field} {...props} required/>
            </InputGroup>
        </Form.Group>
    )
}

