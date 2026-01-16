import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { useFirebase } from '../context/firebase';
const ListingsPage = () => {
    const firebase = useFirebase();
  const [name, setName] = useState("")
  const [isbnnumber, setIsbnnumber] = useState("")
  const [price, setPrice] = useState("")
  const [coverPic, setCoverPic] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await firebase.handleCreateNewListing(name, isbnnumber, price, coverPic);
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Book Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enter Book ISBN Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Book ISBN Number"
            value={isbnnumber}
            onChange={(e) => setIsbnnumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enter Book Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Book Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enter Book Cover Pic</Form.Label>
          <Form.Control
            type="text"
             placeholder="Enter Image URL"
             value={coverPic}
             onChange={(e) => setCoverPic(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>

      </Form>
    </div>
  )
}

export default ListingsPage
