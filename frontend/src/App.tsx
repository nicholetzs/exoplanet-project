import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddPlanet from "./pages/AddPlanet";
import PlanetDetail from "./pages/PlanetDetail";

console.log("App.jsx carregado"); // Debug

function App() {
  console.log("App component loaded"); // Debug
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <nav className="bg-gray-800 p-4 mb-8">
          <div className="container mx-auto flex gap-4">
            <Link to="/" className="text-blue-400 hover:text-blue-300">
              Home
            </Link>
            <Link to="/add" className="text-blue-400 hover:text-blue-300">
              Adicionar
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddPlanet />} />
          <Route path="/planet/:id" element={<PlanetDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
