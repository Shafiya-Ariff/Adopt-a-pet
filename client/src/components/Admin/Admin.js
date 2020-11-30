import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import './Admin.css';
import Button from '../../components/UI/Button/Button';
import {Link} from 'react-router-dom';

import Unauthorized from '../Unauthourized/Unauthorized';

export const Admin = (props) => {

    useEffect(() => {
        console.log('sdfsdf');
        props.getUser();
    }, []);

    const user = props.user || {};
    if (user.role === 'ROLE_ADMIN') {
        return (
            <div>
            <div className="layout">
                <div className="linkBox">
                <Link to="/add-a-pet" className="link">Add a Pet</Link>
                </div>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => dispatch(actions.loadUser()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
