import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import Card from "react-bootstrap/Card";

const OrdersPage = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (firebase.isLoggedIn)
            firebase
                .fetchMyOrders(firebase.user.uid)
                .then((books) => setBooks(books.docs));
    }, [firebase]);

    if (!firebase.isLoggedIn) return <h1>Please Log In</h1>;

    return (
        <div className="container mt-3">
            {books.map((book) => (
                <BookOrders key={book.id} book={book} />
            ))}
        </div>
    );
};

const BookOrders = ({ book }) => {
    const firebase = useFirebase();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        firebase.getOrders(book.id).then((orders) => setOrders(orders.docs));
    }, [firebase, book.id]);

    const bookData = book.data(); // Get book details

    return (
        <Card className="mt-3 mb-3">
            <Card.Header>{bookData.name}</Card.Header>
            <Card.Body>
                <h5>Orders Received: {orders.length}</h5>
                {orders.map((order) => {
                    const data = order.data();
                    return (
                        <div
                            key={order.id}
                            className="p-2 mt-2 border"
                            style={{ backgroundColor: "#f8f9fa" }}
                        >
                            <p><strong>Order By:</strong> {data.displayName}</p>
                            <p><strong>Qty:</strong> {data.qty}</p>
                            <p><strong>Email:</strong> {data.userEmail}</p>
                        </div>
                    );
                })}
            </Card.Body>
        </Card>
    );
};

export default OrdersPage;
