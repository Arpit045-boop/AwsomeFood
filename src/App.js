import "./App.css";
import Home from "./Screens/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Screens/Login";
import SignUp from "./Screens/SignUp";
import CartProvider from "./Components/ContextReducer";
import MyOrder from "./Screens/MyOrder";
function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />

            <Route exact path="/createuser" element={<SignUp />} />
            <Route exact path="/myOrderData" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
