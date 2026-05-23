import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
        <p>&copy; {new Date().getFullYear()} EduLend. Todos los derechos reservados.</p>
        <div className="footer-links">
            <a href="#">Términos de Servicio</a>
            <a href="#">Política de Privacidad</a>
            <a href="#">Contacto</a>
        </div>
    </footer>
  );
};

export default Footer;
