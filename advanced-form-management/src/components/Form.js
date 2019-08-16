import React from 'react';
import { withFormik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function NewUser(){
    return(
        <Form>
            <Field component='input' 
                    type='text' 
                    name='name' 
                    placeholder='Name' 
                    />
            <Field component='input' 
                    type='email' 
                    name='email' 
                    placeholder='Email' 
                    />
            <Field component='input' 
                    type='password' 
                    name='password' 
                    placeholder='Password' 
                    />
            <label>
                Accept Terms of Service:
            <Field type='checkbox' 
                    name='tos' 
                    placeholder='Terms Of Service'
                    checked={false}
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
    }
})(NewUser);

export default NewUserFormik;