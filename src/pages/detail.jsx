import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";

const BookDetailPage = () => {
    const params = useParams();
    const firebase = useFirebase();
    const [data, setData] = useState(null);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        firebase.getBookById(params.bookId).then((value) => setData(value.data()));
    }, [params.bookId, firebase]);

    const placeOrder = async () => {
        const result = await firebase.placeOrder(params.bookId, qty);
        console.log("Order Placed", result);
        alert("Order Placed Successfully");
    };

    if (data == null) return <h1>Loading...</h1>;

    return (
        <div className="container mt-5">
            <h1>{data.name}</h1>
            <img src={data.coverPic} width="50%" style={{ borderRadius: "10px" }} />
            <h1>Details</h1>
            <p>Price: Rs. {data.price}</p>
            <p>ISBN Number: {data.isbnnumber}</p>
            <h1>Owner Details</h1>
            <p>Name: {data.displayName}</p>
            <p>Email: {data.userEmail}</p>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Qty</Form.Label>
                <Form.Control
                    onChange={(e) => setQty(e.target.value)}
                    value={qty}
                    type="number"
                    placeholder="Enter Qty"
                />
            </Form.Group>
            <Button onClick={placeOrder} variant="success">Buy Now</Button>
        </div>
    );
};

export default BookDetailPage;
