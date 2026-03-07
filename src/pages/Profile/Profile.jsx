import "./Profile.css";

const Profile = () => {
  return (
    <>
      <form action="">
        <fieldset>
          <legend>Informacion personal</legend>
          <label>
            Nombre:
            <input type="text" name="nombre" />
          </label>
          <label>
            Apellido:
            <input type="text" name="apellido" />
          </label>
          <label>
            Dirección
            <input type="text" name="direccion" />
          </label>
          <label>
            Correo Electronico:
            <input type="email" name="email" />
          </label>
        </fieldset>
      </form>
      <label>
        <h3> ¿Cambiar contraseña? </h3>
      </label>
      <form>
        <fieldset>
          <label htmlFor="password_actual">
            Contraseña Actual
            <input
              type="password"
              name="password_actual"
              id="password_actual"
              required=""
            />
          </label>
          <label htmlFor="password_new">
            Nueva contraseña
            <input
              type="password"
              name="password_new"
              id="password_new"
              required=""
            />
          </label>
          <label htmlFor="password_confirmar">
            {" "}
            Confirmar nueva contraseña
            <input
              type="password"
              name="password_confirmar"
              id="password_confirmar"
              required=""
            />
          </label>
        </fieldset>
        <button type="submit">Guardar cambios</button>
      </form>
    </>
  );
};

export default Profile;
