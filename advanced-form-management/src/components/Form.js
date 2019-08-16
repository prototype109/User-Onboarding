import React from 'react';
import { withFormik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function NewUser({ errors, values, touched }){
    return(
        <Form>
            {touched.name && errors.name && <p>{errors.name}</p>}
            <Field component='input' 
                    type='text' 
                    name='name' 
                    placeholder='Name' 
                    />
            {touched.email && errors.email && <p>{errors.email}</p>}
            <Field component='input' 
                    type='email' 
                    name='email' 
                    placeholder='Email' 
                    />
            {touched.password && errors.password && <p>{errors.password}</p>}
            <Field component='input' 
                    type='password' 
                    name='password' 
                    placeholder='Password' 
                    />
            {errors.tos && <p>{errors.tos}</p>}
            <label>
                Accept Terms of Service:
            <Field type='checkbox' 
                    name='tos' 
                    placeholder='Terms Of Service'
                    checked={values.tos}
                    />
            </label>
            <button type='submit'>Submit</button>
        </Form>
    );
}

const NewUserFormik = withFormik({
    mapPropsToValues({name, email, password, tos}){
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || ''
        };
    },
    validationSchema: Yup.object().shape(
        {
            name: Yup.string().required('Name field not filled!'),
            email: Yup.string().required('Email field not filled!'),
            password: Yup.string().required().min(8, 'password must be 8 characters long'),
            tos: Yup.bool().required('Must Accept Terms Of Service to proceed')
        }
    )
})(NewUser);

export default NewUserFormik;