import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
// import './Admin.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';

export const Dashboard = (props) => {

    const [typeData, setType] = useState({
        type: '',
        page: 1,
        filterPage: 1,
        filter: false,
        filterValue: null
    });

    useEffect(() => {
        props.getUser();
        props.getPets(typeData.page);
    }, []);

    // console.log(props.pets);
    // console.log(props.filterPage);

    const fetchData = () => {
        console.log(props.filterPage);
        if(typeData.filter){
            props.filterPets(typeData.filterValue,props.filterPage);
        }else{
            props.getPets(props.page);
        }
    }

    const onChange = (e) => {
        setType({ ...typeData, [e.target.name]: e.target.value });
        if (e.target.value === 'Both') {
            props.petClear();
            props.getPets(typeData.page);
        } else {
            props.petClear();
            console.log(props.filterPage);
            props.filterPets(e.target.value, 1);
            setType({filter: true, filterValue: e.target.value});
        }
    }

    const wishlistHandler = (id) => {
        props.addToWishlist(id);
    }

    return (
        <div style={{ backgroundColor: "#f0f0f0", height: "100%", minHeight: "100vh" }}>
            <div className="">
                {props.success &&
                    <div className="success">{props.message}</div>}
                {props.error &&
                    <div className="errorMessageBox">{props.error}</div>}
                <div className="container" style={{ width: "40%", paddingTop: "20px" }}>
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
                        <InfiniteScroll
                            dataLength={props.pets.length} //This is important field to render the next data
                            next={fetchData}
                            hasMore={props.pets.length ? true : false}
                            // loader={<h4>Loading...</h4>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                        >
                            <Row>
                                {props.pets.map(pet => (
                                    <Col sm={6} md={6} xl={4} lg={4}>
                                        <Card style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", width: '18rem', margin: "20px" }}>
                                            <Card.Img variant="top" src={pet.image} />
                                            <Card.Body className="text-center">
                                                <Card.Title>{pet.name}</Card.Title>
                                                <Card.Text>
                                                    {pet.type}
                                                </Card.Text>
                                                <div>
                                                    <Link to={"/show/" + pet._id} className="mr-2 btn btn-primary btn-sm">Show</Link>
                                                    <Button onClick={() => wishlistHandler(pet._id)} variant="success" className="mr-2" size="sm">Add to wishlist</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </InfiniteScroll>

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
        pets: state.pet.pets,
        page: state.pet.page,
        filterPage: state.pet.filterPage,
        message: state.wishlist.message,
        success: state.wishlist.success,
        error: state.wishlist.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => dispatch(actions.loadUser()),
        getPets: (page) => dispatch(actions.getPets(page)),
        filterPets: (type, page) => dispatch(actions.filterPets(type, page)),
        addToWishlist: (id) => dispatch(actions.addToWishlist(id)),
        petClear: () => dispatch(actions.petClear()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
