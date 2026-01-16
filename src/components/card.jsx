import React from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const BookCard = (props) => {
    const navigate = useNavigate();
    return (
        <Card style={{ width: '18rem', margin: '1rem' }}>
            <Card.Img variant="top" src={props.coverPic} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    This book has a title {props.name} and this book is sold by {props.displayName} and this book costs Rs.{props.price}
                </Card.Text>
                <Button variant="primary" onClick={e => navigate(props.link)}>View Details</Button>
            </Card.Body>
        </Card>
    );
};

export default BookCard;
