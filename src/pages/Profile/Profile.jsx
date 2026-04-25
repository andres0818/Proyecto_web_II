import { useState } from "react";
import "./Profile.css";

const Profile = () => {

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    email: "",
    password_actual: "",
    password_new: "",
    password_confirmar: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Informacion personal</legend>

          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </label>

          <label>
            Apellido:
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
            />
          </label>

          <label>
            Dirección:
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
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
      </form>

      <h3>¿Cambiar contraseña?</h3>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Guardar cambios</button>
      </form>
    </>
  );
};

export default Profile;