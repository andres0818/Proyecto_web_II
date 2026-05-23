import React, { useState, useEffect } from 'react';
import CategoryService from '../../services/categoryService';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ categoryName: '' });
  const [isEditing, setIsEditing] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await CategoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = (category = null) => {
    if (category) {
      setIsEditing(true);
      setCurrentCategory(category);
    } else {
      setIsEditing(false);
      setCurrentCategory({ categoryName: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentCategory({ categoryName: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await CategoryService.update(currentCategory.categoryId, { categoryName: currentCategory.categoryName });
      } else {
        await CategoryService.create({ categoryName: currentCategory.categoryName });
      }
      fetchCategories();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving category', error);
      alert('Hubo un error al guardar la categoría.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      try {
        await CategoryService.delete(id);
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category', error);
        alert('Hubo un error al eliminar la categoría.');
      }
    }
  };

  return (
    <div className="categories-container">
      <div className="categories-header">
        <h1>Categorías</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          <FiPlus /> Nueva Categoría
        </button>
      </div>

      <div className="categories-content">
        {loading ? (
          <div className="loading-spinner">Cargando...</div>
        ) : (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <tr key={cat.categoryId}>
                      <td>{cat.categoryId}</td>
                      <td className="fw-bold">{cat.categoryName}</td>
                      <td className="actions-cell">
                        <button className="btn-icon edit" onClick={() => handleOpenModal(cat)}>
                          <FiEdit2 />
                        </button>
                        <button className="btn-icon delete" onClick={() => handleDelete(cat.categoryId)}>
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="empty-state">No hay categorías registradas.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={handleCloseModal}>
              <FiX />
            </button>
            <h2>{isEditing ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre de la Categoría</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Equipos de Computo"
                  value={currentCategory.categoryName}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, categoryName: e.target.value })}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={handleCloseModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {isEditing ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
