import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useFirebase } from "../context/firebase";
import { fakeBooks } from "../seed-data";

const SeedPage = () => {
    const firebase = useFirebase();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const handleSeed = async () => {
        setLoading(true);
        setStatus("Seeding started...");
        try {
            for (const book of fakeBooks) {
                await firebase.handleCreateNewListing(book.name, book.isbnnumber, book.price, book.coverPic);
            }
            setStatus("Seeding completed successfully!");
            alert("Data Seeding Completed!");
        } catch (error) {
            console.error("Error seeding data:", error);
            setStatus("Error seeding data. Check console.");
        } finally {
            setLoading(false);
        }
    };

    if (!firebase.isLoggedIn) {
        return (
            <div className="container mt-5">
                <h1>Please login to seed data</h1>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1>Seed Database</h1>
            <p>Click the button below to add {fakeBooks.length} fake books to the database.</p>
            <Button onClick={handleSeed} disabled={loading} variant="warning">
                {loading ? "Seeding..." : "Seed Data Now"}
            </Button>
            {status && <p className="mt-3">{status}</p>}
        </div>
    );
};

export default SeedPage;
