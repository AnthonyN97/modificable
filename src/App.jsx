import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';
import FirstPage from './FirstPage';

function App() {
  const linksNavbar = [
    {
      label: "Inicio",
      dropMenu: []
    },
    {
      label: "Modelo de Internas",
      dropMenu: []
    },
    {
      label: "Examen CEDES",
      dropMenu: []
    },
    {
      label: "Libros",
      dropMenu: [{ text: "Libros de Psicología", link: "/libros/psicologia" }]
    },
  ];

  return (
    <Router>
      <Navbar links={linksNavbar}></Navbar>
      {/* Rutas */}
      <Routes>
        <Route path="/" element={<FirstPage />} />
      </Routes>
    </Router>
  )
}

export default App;