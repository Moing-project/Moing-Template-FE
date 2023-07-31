import { Routes, Route } from "react-router-dom";
import Layout from "./page/Layout";
import SignIn from "./page/SignIn";
import Login from "./page/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
