import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';

import * as actions from '../../store/actions/index';
import './ShowPet.css';

export const ShowPet = (props) => {

    useEffect(() => {
        props.getPet(props.match.params.id);
    }, []);

    const pet = props.pet || {};

    return (
        <div style={{backgroundColor: "#f0f0f0", height:"100%", minHeight:"100vh"}}>
        <div className="container">
            <div className="details">
                <Row>
                    <Col style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} sm={12} md={12} xl={6} lg={6} >
                        <img width="100%" src={pet.image} alt="pet" />
                    </Col>
                    <Col sm={12} md={12} xl={6} lg={6} style={{paddingTop:"50px", backgroundColor:"#E8E8E8", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                        <p><strong>Name: </strong>{pet.name}</p>
                        <p><strong>Type: </strong>{pet.type}</p>
                        <p><strong>Breed: </strong>{pet.breed}</p>
                        <p><strong>Age: </strong>{pet.age}</p>
                        <p><strong>Location: </strong>{pet.location}</p>
                        <div style={{padding: "20px"}}>
                        <Button className="mr-2" variant="success" size="md">Add to wishlist</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        pet: state.pet.pet
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPet: (id) => dispatch(actions.getPetById(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPet);
