import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';

import Button from '../UI/Button/Button';
import * as actions from '../../store/actions/index';

export const AddPet = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        type: 'Dog',
        breed: '',
        location: '',
        age: 0,
        image: ''
    });

    const { name, type, breed, location, age, image } = formData;

    const onChange = e => {
        console.log(e.target.files);
        if(e.target.files){
            console.log(e.target.files[0]);
            setFormData({ ...formData, [e.target.name]: e.target.files[0] })
        }else{
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    };

    const submitHandler = async e => {
        e.preventDefault();
        console.log(formData);
        props.onAddPet(name, type, breed, age, location, image);
    };

    if(props.message) {
        props.history.push('/admin');
    }

    return (
        <div>
            <div className="layout">
                <div className="content">
                    <div className="form">
                        {props.error && 
                        props.error.constructor === Array ?
                            props.error.map(error =>
                                <div key={error.msg} className="errorMessageBox">
                                    <div>{error.msg}</div>
                                </div>
                            ) :
                            <div key={props.error} className="errorMessageBox">
                            <div>{props.error}</div>
                        </div> }
                        {props.message &&
                            <div className="success">{props.message}</div>}
                        <div className="title">
                            <h1 className="titleText">Add a Pet</h1>
                        </div>
                        <Form onSubmit={e => submitHandler(e)} encType="multipart/form-data">
                            <Form.Group controlId="formBasicName">
                                <Form.Control onChange={e => onChange(e)} type="text" placeholder="Enter name" name="name" value={name} />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Control as="select" onChange={e => onChange(e)} value={type} name="type">
                                    <option value="Dog">Dog</option>
                                    <option value="Cat">Cat</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicBreed">
                                <Form.Control onChange={e => onChange(e)} type="text" placeholder="Enter breed" name="breed" value={breed} />
                            </Form.Group>
                            <Form.Group controlId="formBasicAge">
                                <Form.Control onChange={e => onChange(e)} type="number" placeholder="Enter age" name="age" value={age} />
                            </Form.Group>
                            <Form.Group controlId="formBasicLocation">
                                <Form.Control onChange={e => onChange(e)} type="text" placeholder="Enter location" name="location" value={location} />
                            </Form.Group>
                            <Form.Group>
                                <Form.File onChange={e => onChange(e)} id="exampleFormControlFile1" label="Upload Image" style={{ color: "white" }} name="image" />
                            </Form.Group>
                            <div className="registerButton">
                                <Button className design="normal" type="submit">
                                    Submit
                            </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        error: state.pet.error,
        message: state.pet.message,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPet: (name, type, breed, age, location, image) => dispatch(actions.addAPet(name, type, breed, age, location, image))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPet);
