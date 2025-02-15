import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HelloWorld from "./components/HelloWorld";
import HelloUser from "./components/HelloUser";
import MathQuiz from "./components/MathQuiz";

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Hello World</Link>
          </li>
          <li>
            <Link to="/user">Hello User</Link>
          </li>
          <li>
            <Link to="/math">計算ドリルテスト</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HelloWorld />} />
        <Route path="/user" element={<HelloUser />} />
        <Route path="/math" element={<MathQuiz />} />
      </Routes>
    </Router>
  );
};

export default App;
