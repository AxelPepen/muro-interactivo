import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../credenciales.js';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Inicio</Link>
        <div className="navbar-nav ">
        <Link className="nav-link" to="/create-post">Crear Publicacion</Link>
        </div>
        <div className="navbar-nav ms-auto">
          <button
            className="btn btn-outline-light"
            onClick={() => signOut(auth)}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
