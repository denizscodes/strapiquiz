import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Turs from "./pages/Turs";
import Turdetayi from "./pages/Turdetayi";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Turs />}></Route>
        <Route path="/turs/:id" element={<Turdetayi />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
