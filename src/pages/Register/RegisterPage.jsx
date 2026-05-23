import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import EvolvingYeti from './EvolvingYeti';
import UserService from '../../services/userService';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: ''
  });
  const [strengthLevel, setStrengthLevel] = useState(0);
  const [usernameWidth, setUsernameWidth] = useState(0);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getTextWidth = (text, font) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;
    return context.measureText(text).width;
  };

  const calculateStrength = (pass) => {
    if (pass.length === 0) return 0;
    if (pass.length < 6) return 0;
    
    let level = 1;
    const hasNumbers = /\d/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    const hasUpper = /[A-Z]/.test(pass);

    if (hasNumbers) level = 2;
    if (hasNumbers && (hasSpecial || hasUpper)) level = 3;
    
    return level;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      setStrengthLevel(calculateStrength(value));
    }

    if (name === 'first_name') {
      const style = window.getComputedStyle(e.target);
      const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      setUsernameWidth(Math.min(getTextWidth(value, font), 250));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    try {
      await UserService.create({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone_number,
        user_role: 'STUDENT' // default role
      });
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Hubo un error al registrar. Verifica tus datos.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <EvolvingYeti 
          strengthLevel={strengthLevel} 
          usernameWidth={usernameWidth} 
          isPasswordFocused={isPasswordFocused}
        />
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Create Account</h2>
          {error && <div className="error-message">{error}</div>}
          
          <div className="input-group">
            <label>Nombre(s)</label>
            <input name="first_name" type="text" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Apellidos</label>
            <input name="last_name" type="text" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input name="email" type="email" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Teléfono</label>
            <input name="phone_number" type="text" onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              name="password" 
              type="password" 
              onChange={handleChange} 
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              required 
            />
            <div className="strength-bar">
              <div className={`bar level-${strengthLevel}`}></div>
            </div>
            <p className="strength-text">
              {strengthLevel === 0 && "Too short"}
              {strengthLevel === 1 && "Weak - add numbers"}
              {strengthLevel === 2 && "Medium - add symbols/caps"}
              {strengthLevel === 3 && "Strong Yeti!"}
            </p>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input 
              name="confirmPassword" 
              type="password" 
              onChange={handleChange} 
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              required 
            />
          </div>

          <button type="submit" className="register-button">Sign Up</button>
          
          <p className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
