import { Routes, Route } from "react-router-dom";

//components
import NavbarComponent from "./components/navbar";

//pages
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ListingsPage from "./pages/listings";
import BookDetailPage from "./pages/detail";
import OrdersPage from "./pages/orders";
import Home from "./pages/home";

//css
import "bootstrap/dist/css/bootstrap.min.css";



function App() {
    return (
        <div>
            <NavbarComponent />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/book/list" element={<ListingsPage />} />
                <Route path="/book/view/:bookId" element={<BookDetailPage />} />
                <Route path="/book/orders" element={<OrdersPage />} />
            </Routes>
        </div>
    )
}

export default App
