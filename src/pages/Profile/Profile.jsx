import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import UserService from "../../services/userService";
import "./Profile.css";

const Profile = () => {

  const { user, login } = useAuth();
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
    try {
      // Create user DTO matching backend expectation
      // Note: Backend might require password when updating, so we might need a separate endpoint for password change
      // For now, we update basic info sending the existing role and a dummy password if it's required by the DTO,
      // or hopefully the backend allows partial updates. Let's assume it requires full DTO.
      await UserService.update(user.userId, {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone_number,
        user_role: user.user_role
      });
      setMsg("Información actualizada correctamente. (Inicia sesión de nuevo para ver los cambios globales si es necesario)");
    } catch (err) {
      console.error(err);
      setMsg("Error al actualizar la información.");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPassMsg("");
    
    if (formData.password_new !== formData.password_confirmar) {
      setPassMsg("Las nuevas contraseñas no coinciden.");
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
      
      // Limpiar los campos de contraseña
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
    <>
      {msg && <div style={{ marginBottom: "1rem", color: "blue" }}>{msg}</div>}
      <form onSubmit={handleUpdateInfo}>
        <fieldset>
          <legend>Información personal</legend>

          <label>
            Nombre(s):
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </label>

          <label>
            Apellidos:
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </label>

          <label>
            Teléfono:
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </label>

          <label>
            Correo Electronico:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </fieldset>
        <button type="submit" style={{ marginTop: "1rem" }}>Actualizar Información</button>
      </form>

      <h3>¿Cambiar contraseña?</h3>
      {passMsg && <div style={{ marginBottom: "1rem", color: passMsg.includes("Error") || passMsg.includes("no coinciden") ? "red" : "green" }}>{passMsg}</div>}

      <form onSubmit={handlePasswordChange}>
        <fieldset>

          <label htmlFor="password_actual">
            Contraseña Actual
            <input
              type="password"
              name="password_actual"
              id="password_actual"
              value={formData.password_actual}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="password_new">
            Nueva contraseña
            <input
              type="password"
              name="password_new"
              id="password_new"
              value={formData.password_new}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="password_confirmar">
            Confirmar nueva contraseña
            <input
              type="password"
              name="password_confirmar"
              id="password_confirmar"
              value={formData.password_confirmar}
              onChange={handleChange}
              required
            />
          </label>

        </fieldset>

        <button type="submit" style={{ marginTop: "1rem" }}>Cambiar Contraseña</button>
      </form>
    </>
  );
};

export default Profile;