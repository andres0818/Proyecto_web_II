import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import UserService from "../../services/userService";
import { FiUser, FiLock, FiSave, FiShield, FiMail, FiPhone } from 'react-icons/fi';
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password_actual: "",
    password_new: "",
    password_confirmar: ""
  });
  const [msg, setMsg] = useState("");
  const [passMsg, setPassMsg] = useState("");
  
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone_number: user.phone_number || "",
        email: user.email || ""
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await UserService.update(user.userId, {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone_number,
        user_role: user.user_role
      });
      setMsg("Información actualizada correctamente.");
    } catch (err) {
      console.error(err);
      setMsg("Error al actualizar la información.");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPassMsg("");
    
    if (formData.password_new !== formData.password_confirmar) {
      setPassMsg("Error: Las nuevas contraseñas no coinciden.");
      return;
    }
    
    try {
      const payload = {
        currentPassword: formData.password_actual,
        newPassword: formData.password_new,
        confirmPassword: formData.password_confirmar
      };
      
      await UserService.changePassword(user.userId, payload);
      setPassMsg("¡Contraseña actualizada con éxito!");
      
      setFormData(prev => ({
        ...prev,
        password_actual: "",
        password_new: "",
        password_confirmar: ""
      }));
    } catch (err) {
      console.error("Error al cambiar contraseña:", err);
      setPassMsg(err.response?.data || "Error al cambiar la contraseña. Verifica tu contraseña actual.");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Mi Perfil</h1>
        <p>Administra tu información personal y configuración de seguridad.</p>
      </div>

      <div className="profile-content">
        {/* Tarjeta de Información Personal */}
        <div className="profile-card">
          <div className="card-header">
            <div className="icon-wrapper">
              <FiUser />
            </div>
            <h2>Información Personal</h2>
          </div>
          
          {msg && (
            <div className={`alert ${msg.includes("Error") ? "alert-error" : "alert-success"}`}>
              {msg}
            </div>
          )}
          
          <form onSubmit={handleUpdateInfo} className="modern-form">
            <div className="form-row">
              <div className="form-group">
                <label>Nombre(s)</label>
                <div className="input-with-icon">
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    placeholder="Ej. Jean"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Apellidos</label>
                <div className="input-with-icon">
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    placeholder="Ej. Doe"
                  />
                </div>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Teléfono</label>
                <div className="input-with-icon">
                  <FiPhone className="input-icon" />
                  <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                    placeholder="Ej. +57 300 000 0000"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Correo Electrónico</label>
                <div className="input-with-icon">
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="ejemplo@correo.com"
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                <FiSave /> Guardar Cambios
              </button>
            </div>
          </form>
        </div>

        {/* Tarjeta de Seguridad */}
        <div className="profile-card">
          <div className="card-header">
            <div className="icon-wrapper">
              <FiShield />
            </div>
            <h2>Seguridad de la Cuenta</h2>
          </div>
          
          {passMsg && (
            <div className={`alert ${passMsg.includes("Error") || passMsg.includes("no coinciden") ? "alert-error" : "alert-success"}`}>
              {passMsg}
            </div>
          )}
          
          <form onSubmit={handlePasswordChange} className="modern-form">
            <div className="form-group">
              <label>Contraseña Actual</label>
              <div className="input-with-icon">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  name="password_actual"
                  value={formData.password_actual}
                  onChange={handleChange}
                  required
                  placeholder="Ingresa tu contraseña actual"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Nueva Contraseña</label>
                <div className="input-with-icon">
                  <FiLock className="input-icon" />
                  <input
                    type="password"
                    name="password_new"
                    value={formData.password_new}
                    onChange={handleChange}
                    required
                    placeholder="Mínimo 6 caracteres"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Confirmar Contraseña</label>
                <div className="input-with-icon">
                  <FiLock className="input-icon" />
                  <input
                    type="password"
                    name="password_confirmar"
                    value={formData.password_confirmar}
                    onChange={handleChange}
                    required
                    placeholder="Repite la nueva contraseña"
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-secondary">
                <FiSave /> Actualizar Contraseña
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;