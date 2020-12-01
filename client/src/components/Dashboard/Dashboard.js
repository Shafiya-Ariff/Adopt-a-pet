import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
// import './Admin.css';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col, Form } from 'react-bootstrap';

export const Dashboard = (props) => {

    useEffect(() => {
        props.getUser();
        props.getPets();
    }, []);

    console.log(props.pets);

    const [typeData, setType] = useState({
        type: ''
    });

    const onChange = (e) => {
        setType({ ...typeData, [e.target.name]: e.target.value });
        if(e.target.value === 'Both'){
            props.getPets();
        }else{
            props.filterPets(e.target.value);
        }
    }

    return (
        <div style={{ backgroundColor: "#f0f0f0", height: "100%", minHeight: "100vh" }}>
            <div className="">
                <div className="container" style={{width:"40%", paddingTop:"20px"}}>
                <Form>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control as="select" onChange={e => onChange(e)} value={typeData.type} name="type">
                            <option value="Both">Both Dogs and Cats</option>
                            <option value="Dog">Dogs</option>
                            <option value="Cat">Cats</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
                </div>
                {props.pets.length > 0 ?
                    <Container fluid className="cardLayout">
                        <Row>
                            {props.pets.map(pet => (
                                <Col style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} sm={6} md={6} xl={4} lg={4}>
                                    <Card style={{ width: '18rem', margin: "20px" }}>
                                        <Card.Img variant="top" src={pet.image} />
                                        <Card.Body className="text-center">
                                            <Card.Title>{pet.name}</Card.Title>
                                            <Card.Text>
                                                {pet.type}
                                            </Card.Text>
                                            <div>
                                                <Link to={"/show/" + pet._id} className="mr-2 btn btn-primary btn-sm">Show</Link>
                                                <Link className="mr-2 btn btn-success btn-sm">Add to wishlist</Link>
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

};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        pets: state.pet.pets
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => dispatch(actions.loadUser()),
        getPets: () => dispatch(actions.getPets()),
        filterPets: (type) => dispatch(actions.filterPets(type)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
