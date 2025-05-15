import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./auth/signIn";
import SignUp from "./auth/signUp";
import Home from "./pages/home/home"; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
