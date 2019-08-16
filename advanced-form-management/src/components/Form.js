import React, { useState, useEffect } from 'react';
import { withFormik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function NewUser({ errors, values, touched, status }){
    const [users, setUsers] = useState([]);

    const style = {
        margin: '0 auto',
        width: '25%'
    }

    const input = {
        maxWidth: '30%'
    }

    const submit = {
        width: '12%'
    }

    useEffect(() => {
        if(status){
            setUsers([...users, status]);
        }
    },[status]);

    return(
        <div style={style}>
            <Form className='form-container'>
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field component='input' 
                        type='text' 
                        name='name' 
                        placeholder='Name'
                        style={input}
                        />
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field component='input' 
                        type='email' 
                        name='email' 
                        placeholder='Email'
                        style={input}
                        />
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field component='input' 
                        type='password' 
                        name='password' 
                        placeholder='Password'
                        style={input}
                        />
                {touched.tos && errors.tos && <p>{errors.tos}</p>}
                <label>
                    Accept Terms of Service:
                <Field type='checkbox' 
                        name='tos' 
                        placeholder='Terms Of Service'
                        checked={values.tos}
                        />
                </label>
                <button type='submit' style={submit}>Submit</button>
            </Form>
            <div>
                {users.map(user => (
                    <p key={user.id}>{user.name}</p>
                ))}
            </div>
        </div>
    );
}

const NewUserFormik = withFormik({
    mapPropsToValues({name, email, password, tos}){
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false
        };
    },
    validationSchema: Yup.object().shape(
        {
            name: Yup.string().required('Name field not filled!'),
            email: Yup.string().required('Email field not filled!'),
            password: Yup.string().required().min(8, 'password must be 8 characters long'),
            tos: Yup.bool().oneOf([true], 'Must accept Terms Of Service to continue')
        }
    ),
    handleSubmit(values, { setStatus, resetForm }){
        axios.post('https://reqres.in/api/users', values)
            .then(res => {
                console.log('Posted successfully: ', res)
                setStatus(res.data);
                resetForm();
            })
            .catch(err => console.log('ERROR: ', err));
    }
})(NewUser);

export default NewUserFormik;