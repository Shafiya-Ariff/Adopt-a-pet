import React from 'react'
import {connect} from 'react-redux';

export const Dashboard = (props) => {

    // if(!props.isAuthenticated && !props.checkToken) {
    //     props.history.push('/');
    // }

    return (
        <div>
            Hi this is a dashboard
        </div>
    )
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

export default connect(mapStateToProps)(Dashboard);
