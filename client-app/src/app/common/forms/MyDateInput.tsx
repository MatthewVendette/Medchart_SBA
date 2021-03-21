import { useField } from 'formik';
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import DatePicker, {ReactDatePickerProps} from 'react-datepicker';

export default function MyTextInput(props: Partial<ReactDatePickerProps>) {
    const [field, , helpers] = useField(props.name!); //We don't need meta props
    return (
        <Form.Group>
            <InputGroup hasValidation>
                <Form.Label>{props.title}</Form.Label>
                <DatePicker 
                    {...field} 
                    {...props} 
                    selected={(field.value && new Date(field.value)) || null}
                    onChange={value => helpers.setValue(value)}
                    required
                />
            </InputGroup>
        </Form.Group>
    )
}

