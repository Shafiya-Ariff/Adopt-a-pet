import React from 'react'
import { Button } from 'react-bootstrap';
import './button.css';

export const button = (props) => (
    <Button variant="light" className={props.design} type={props.type} onClick={props.onClick}>{props.children}</Button>
)

export default button;
