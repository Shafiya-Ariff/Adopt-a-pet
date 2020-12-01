import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './layout.css';
import Button from '../UI/Button/Button';
import { Form } from 'react-bootstrap';
import * as actions from '../../store/actions/index';

export const Layout = (props) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [authStates, setAuthStates] = useState({
        method: 'Log In',
        text: 'Already registered? ',
        title: 'Register'
    });

    const changeStates = () => {
        setAuthStates({
            ...authStates,
            method: (method === 'Log In' ? 'Sign Up' : 'Log In'),
            text: (text === 'Already registered? ' ? "Don't have an account? " : 'Already registered? '),
            title: (title === 'Register' ? "Login" : 'Register')
        });
    }

    if (props.message ) {
        changeStates();
    }

    // Redirect if logged in
    if (props.isAuthenticated) {
        console.log('to dashboard');
        return <Redirect to='/dashboard' />;
    }

    const { email, password } = formData;
    const { method, text, title } = authStates;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const submitHandler = async e => {
        e.preventDefault();
        props.onLoginClear();
        props.onRegisterClear();
        if (method === 'Log In') {
            await props.onRegister(email, password);
        } else {
            props.onLogin(email, password);
        }
    };

    const changeMethod = () => {
        changeStates();
        props.onLoginClear();
        props.onRegisterClear();
        // setAuthStates({...authStates,});
        console.log(method);
    }

    return (
        <div>
            <div className="overlay" />
            <div className="layout">
                <div className="content">
                    <div className="form">
                        {props.error &&
                            props.error.map(error =>
                                <div key={error.msg} className="errorMessageBox">
                                    <div>{error.msg}</div>
                                </div>
                            )}
                        {props.loginError &&
                            props.loginError.map(error =>
                                <div key={error.msg} className="errorMessageBox">
                                    <div>{error.msg}</div>
                                </div>
                            )}
                        {props.message &&
                            <div className="success">{props.message}</div>}
                        <div className="title">
                            <h1 className="titleText">{title} to Adopt</h1>
                        </div>
                        <Form onSubmit={e => submitHandler(e)}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control onChange={e => onChange(e)} type="email" placeholder="Enter email" name="email" value={email} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control onChange={e => onChange(e)} type="password" placeholder="Password" name="password" value={password} />
                            </Form.Group>
                            <div className="registerButton">
                                <Button className design="normal" type="submit">
                                    Submit
                            </Button>
                            </div>
                        </Form>
                        <div className="login">
                            <p className="loginText">{text}<span onClick={changeMethod} style={{ textDecoration: 'underline', cursor: "pointer" }}>{method}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        error: state.register.error,
        message: state.register.message,
        loginError: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (email, password) => dispatch(actions.register(email, password)),
        onLogin: (email, password) => dispatch(actions.login(email, password)),
        onRegisterClear: () => dispatch(actions.registerClear()),
        onLoginClear: () => dispatch(actions.loginClear()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
