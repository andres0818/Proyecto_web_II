import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiShield, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    nombre: 'Ana García López',
    email: 'ana.garcia@correo.com',
    telefono: '+57 310 456 7890',
    rol: 'Administrador',
  });

  const [formData, setFormData] = useState({ ...userData });

  const handleEdit = () => {
    setFormData({ ...userData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({ ...userData });
    setIsEditing(false);
  };

  const handleSave = () => {
    setUserData({ ...formData });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getInitials = (nombre) => {
    return nombre.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
  };

  return (
    <section style={{ minHeight: '100vh', background: '#f0faf3', display: 'flex', justifyContent: 'center', 
    alignItems: 'flex-start', padding: '48px 20px', fontFamily: 'sans-serif' }}>
    <div style={{ width: '100%', maxWidth: '580px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Tarjeta cabecera */}
        <div style={{ background: 'linear-gradient(135deg, #2d6a4f, #1a3d2b)', borderRadius: '16px', padding: '28px 24px', display: 'flex', alignItems: 'center', gap: '18px', boxShadow: '0 8px 28px rgba(45,106,79,0.25)' }}>

          {/* Avatar con iniciales */}
          <div style={{ width: '68px', height: '68px', minWidth: '68px', background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>
              {getInitials(userData.nombre)}
            </span>
          </div>

          {/* Nombre y rol */}
          <div style={{ flex: 1 }}>
            <h1 style={{ color: '#fff', margin: '0 0 8px', fontSize: '1.3rem', fontWeight: '700' }}>
              {userData.nombre}
            </h1>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.15)', color: '#d8f3dc', fontSize: '0.78rem', fontWeight: '500', padding: '3px 12px', borderRadius: '20px' }}>
              <FiShield size={12} />
              {userData.rol}
            </span>
          </div>

          {/* Botón editar */}
          {!isEditing && (
            <button onClick={handleEdit} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' }}>
              <FiEdit2 size={14} /> Editar
            </button>
          )}
        </div>

        {/* Tarjeta de datos */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '28px 24px', boxShadow: '0 4px 16px rgba(45,106,79,0.08)' }}>
          <h2 style={{ color: '#1a3d2b', fontSize: '1rem', fontWeight: '600', margin: '0 0 20px' }}>
            Información personal
          </h2>

          {/* Nombre */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 0', borderBottom: '1px solid #e9f5ee' }}>
            <div style={{ width: '38px', height: '38px', minWidth: '38px', background: '#d8f3dc', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2d6a4f' }}>
              <FiUser size={17} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 3px', fontSize: '0.75rem', color: '#8aab97' }}>Nombre completo</p>
              {isEditing
                ? <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} style={{ width: '100%', border: '1.5px solid #74c69d', borderRadius: '8px', padding: '7px 10px', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box', background: '#f6fef8' }} />
                : <p style={{ margin: 0, fontSize: '0.95rem', color: '#1a2e22', fontWeight: '500' }}>{userData.nombre}</p>
              }
            </div>
          </div>

          {/* Email */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 0', borderBottom: '1px solid #e9f5ee' }}>
            <div style={{ width: '38px', height: '38px', minWidth: '38px', background: '#d8f3dc', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2d6a4f' }}>
              <FiMail size={17} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 3px', fontSize: '0.75rem', color: '#8aab97' }}>Correo electrónico</p>
              {isEditing
                ? <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', border: '1.5px solid #74c69d', borderRadius: '8px', padding: '7px 10px', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box', background: '#f6fef8' }} />
                : <p style={{ margin: 0, fontSize: '0.95rem', color: '#1a2e22', fontWeight: '500' }}>{userData.email}</p>
              }
            </div>
          </div>

          {/* Teléfono */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 0', borderBottom: '1px solid #e9f5ee' }}>
            <div style={{ width: '38px', height: '38px', minWidth: '38px', background: '#d8f3dc', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2d6a4f' }}>
              <FiPhone size={17} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 3px', fontSize: '0.75rem', color: '#8aab97' }}>Teléfono</p>
              {isEditing
                ? <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} style={{ width: '100%', border: '1.5px solid #74c69d', borderRadius: '8px', padding: '7px 10px', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box', background: '#f6fef8' }} />
                : <p style={{ margin: 0, fontSize: '0.95rem', color: '#1a2e22', fontWeight: '500' }}>{userData.telefono}</p>
              }
            </div>
          </div>

          {/* Rol */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 0' }}>
            <div style={{ width: '38px', height: '38px', minWidth: '38px', background: '#d8f3dc', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2d6a4f' }}>
              <FiShield size={17} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 3px', fontSize: '0.75rem', color: '#8aab97' }}>Rol</p>
              {isEditing
                ? (
                  <select name="rol" value={formData.rol} onChange={handleChange} style={{ width: '100%', border: '1.5px solid #74c69d', borderRadius: '8px', padding: '7px 10px', fontSize: '0.92rem', outline: 'none', background: '#f6fef8' }}>
                    <option value="Administrador">Administrador</option>
                    <option value="Usuario">Usuario</option>
                  </select>
                )
                : <p style={{ margin: 0, fontSize: '0.95rem', color: '#1a2e22', fontWeight: '500' }}>{userData.rol}</p>
              }
            </div>
          </div>

          {/* Botones guardar / cancelar */}
          {isEditing && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '22px', justifyContent: 'flex-end' }}>
              <button onClick={handleCancel} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', color: '#4a6358', border: '1.5px solid #c5e0cc', borderRadius: '8px', padding: '9px 16px', cursor: 'pointer', fontSize: '0.87rem' }}>
                <FiX size={15} /> Cancelar
              </button>
              <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#2d6a4f', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 18px', cursor: 'pointer', fontSize: '0.87rem', boxShadow: '0 4px 12px rgba(45,106,79,0.3)' }}>
                <FiSave size={15} /> Guardar cambios
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Profile;
