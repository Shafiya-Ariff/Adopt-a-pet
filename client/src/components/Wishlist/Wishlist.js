import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import {Container ,Card ,Col ,Row, Button} from "react-bootstrap";

export const Wishlist = (props) => {

    useEffect(() => {
        props.getWishlist();
    }, []);

    const pets = props.pets || {};

    const adoptHandler = (id) => {
        props.adopt(id);
    }

    const removeHandler = (id) => {
        props.removePetFromWishlist(id);
    }

    if(props.removed){
        window.location.reload(true);
    }

    return (
        <div>
            <div style={{ backgroundColor: "#f0f0f0", height: "100%", minHeight: "100vh" }}>
            <div className="">
                {props.error &&
                    <div className="errorMessageBox">{props.error}</div>}
                    {props.success &&
                    <div className="success">{props.message}</div>}
                    {props.adoptError &&
                    <div className="errorMessageBox">{props.adoptError}</div>}
                <div className="container" style={{ width: "40%", paddingTop: "20px" }}>
                </div>
                {props.pets.length > 0 ?
                    <Container fluid className="cardLayout">
                        <Row>
                            {pets.map(pet => (
                                <Col style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} sm={6} md={6} xl={4} lg={4}>
                                    <Card style={{ width: '18rem', margin: "20px" }}>
                                        <Card.Img variant="top" src={pet.pet.image} />
                                        <Card.Body className="text-center">
                                            <Card.Title>{pet.pet.name}</Card.Title>
                                            <Card.Text>
                                                {pet.pet.type}
                                            </Card.Text>
                                            <div>
                                                <Button onClick={() => adoptHandler(pet.pet._id)} variant="success" className="mr-2" size="sm">Adopt</Button>
                                                <Button onClick={() => removeHandler(pet._id)} variant="danger" className="mr-2" size="sm">Remove</Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container> :
                    <div className="errorMessageBox container">
                        Your wishlist is empty!
                    </div>
                }
            </div>
        </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        pets: state.wishlist.pets,
        error: state.wishlist.error,
        adoptError: state.adopt.error,
        success: state.adopt.success,
        message: state.adopt.message,
        removed: state.wishlist.removed
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getWishlist: () => dispatch(actions.getWishlist()),
        adopt: (id) => dispatch(actions.adopt(id)),
        removePetFromWishlist: (id) => dispatch(actions.removePetFromWishlist(id)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Wishlist);
