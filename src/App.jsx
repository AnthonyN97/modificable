import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';
import FirstPage from './FirstPage';
import Footer from './Footer';

function App() {
  const linksNavbar = [
    {
      label: "Inicio",
      dropMenu: [{ text: "Ejemplo 1", link: "/linkEjemplo1" }]
    },
    {
      label: "Ejemplo",
      dropMenu: [{ text: "Ejemplo 2", link: "/linkEjemplo2" }]
    },
  ];

  return (
    <Router>
      <Navbar links={linksNavbar}></Navbar>
      {/* Rutas */}
      <Routes>
        <Route path="/" element={<FirstPage />} />
      </Routes>
      <Footer></Footer>
    </Router>
  )
}

export default App;