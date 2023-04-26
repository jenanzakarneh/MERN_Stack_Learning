
import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRout";
import Home from "./components/Home";
function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/login" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notes" element={
                <PrivateRoute>
                    <Home />
                </PrivateRoute>
            } />
            <Route path="*" element={<Login />} />
        </Routes>)
}

export default App;