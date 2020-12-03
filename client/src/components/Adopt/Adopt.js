import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import * as actions from '../../store/actions/index';

export const Adopt = (props) => {

    useEffect(() => {
        props.getAdoptions();
    }, []);

    console.log(props.pets);

    return (
        <div>
            <div className="container">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Pet Name</th>
                            <th>Type</th>
                            <th>Inquired By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.pets.map(pet => (
                            <tr>
                                <td>{pet.pet._id}</td>
                                <td>{pet.pet.name}</td>
                                <td>{pet.pet.type}</td>
                                <td>{pet.user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        pets: state.adopt.pets,
        error: state.adopt.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAdoptions: () => dispatch(actions.getAdoptions()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Adopt);
