import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import './Admin.css';
import { Link, Redirect } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

import Unauthorized from '../Unauthourized/Unauthorized';

export const Admin = (props) => {

    useEffect(() => {
        props.getUser();
        props.getPets();
    }, []);

    const deleteHandler = (id) => {
        console.log('delete');
        props.deletePet(id);
    }

    if(props.deleted){
        window.location.reload(true);
    }

    const user = props.user || {};
    if (user.role === 'ROLE_ADMIN') {
        return (
            <div style={{backgroundColor: "#f0f0f0", height:"100%", minHeight:"100vh"}}>
                <div className="">
                    <div className="linkBox">
                        <Link to="/add-a-pet" className="btn btn-sm btn-primary">Add a Pet</Link>
                    </div>
                    {props.pets.length > 0 ?
                        <Container fluid className="cardLayout">
                            <Row>
                                {props.pets.map(pet => (
                                    <Col style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} sm={6} md={6} xl={4} lg={4}>
                                        <Card style={{ width: '18rem', margin: "20px" }}>
                                            <Card.Img variant="top" src={pet.image} />
                                            <Card.Body className="text-center">
                                                <Card.Title>{pet.name}</Card.Title>
                                                <Card.Text>
                                                    {pet.type}
                                                </Card.Text>
                                                <div>
                                                    <Link to={"/show/" + pet._id} className="mr-2 btn btn-primary btn-sm">Show</Link>
                                                    <Link to={"/edit/" + pet._id} className="mr-2 btn btn-success btn-sm">Edit</Link>
                                                    <Button variant="danger" onClick={() => deleteHandler(pet._id)} size="sm">Delete</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Container> :
                        <div className="errorMessageBox container">
                            No Pets available to adopt. Please check again later.
                        </div>
                    }
                </div>
            </div>
        )
    }
    return (
        <div>
            <Unauthorized />
        </div>
    )
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        pets: state.pet.pets,
        deleted: state.pet.deleted
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => dispatch(actions.loadUser()),
        getPets: () => dispatch(actions.getPets()),
        deletePet: (id) => dispatch(actions.deletePet(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
