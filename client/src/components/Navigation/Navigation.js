import React, { Fragment, useEffect } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { withRouter } from 'react-router-dom';

export const Navigation = (props) => {
    const logout = () => {
        props.onLogout();
        console.log('fsdfsd');
    }

    console.log('Auth' + props.isAuthenticated)

    useEffect(() => {
        if (!props.isAuthenticated) {
            props.history.push('/auth');
        }
    }, [props.isAuthenticated]);



    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/" style={{ fontWeight: "bold" }}>Adopt A Pet</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {localStorage.token &&
                            <Fragment>
                                <Nav.Link href="/register" style={{ fontWeight: "bold" }}>Adopt</Nav.Link>
                                <Nav.Link href="/login" style={{ fontWeight: "bold" }}>Wishlist</Nav.Link>
                                <Nav.Link href="/login" style={{ fontWeight: "bold" }}>Donate</Nav.Link>
                                <Button variant="light" onClick={logout} style={{ fontWeight: "bold" }}>Logout</Button>
                            </Fragment>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));
