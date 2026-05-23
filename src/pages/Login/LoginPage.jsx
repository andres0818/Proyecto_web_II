import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Yeti from './Yeti';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [textWidth, setTextWidth] = useState(0);
  
  const inputRef = useRef(null);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Función para medir el ancho del texto
  const getTextWidth = (text, font) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;
    return context.measureText(text).width;
  };

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Obtenemos el estilo del input para que la medición sea exacta
    const style = window.getComputedStyle(e.target);
    const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const width = getTextWidth(value, font);
    
    // Limitamos el ancho para que el Yeti no se "desviele" mirando afuera del input
    const maxWidth = e.target.offsetWidth - 40; 
    setTextWidth(Math.min(width, maxWidth));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setIsSuccess(false);
    
    const result = await login(email, password);
    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } else {
      setIsError(true);
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Yeti 
          usernameWidth={textWidth} 
          isPasswordFocused={isPasswordFocused} 
          isSuccess={isSuccess}
          isError={isError}
        />
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Iniciar sesión</h2>
          {errorMsg && <div className="error-message">{errorMsg}</div>}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              ref={inputRef}
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              autoComplete="email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          <p className="register-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
