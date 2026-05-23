import React, { useState, useEffect } from 'react';
import ArticleService from '../../services/articleService';
import CategoryService from '../../services/categoryService';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import './Inventory.css';

const Inventory = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({
    name: '',
    description: '',
    categoryId: '',
    quantity_total: 1,
    quantity_damaged: 0
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [articlesData, categoriesData] = await Promise.all([
        ArticleService.getAll(),
        CategoryService.getAll()
      ]);
      setArticles(articlesData || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (article = null) => {
    if (article) {
      setIsEditing(true);
      setCurrentArticle({
        itemId: article.itemId,
        name: article.name,
        description: article.description,
        categoryId: article.category?.categoryId || '',
        quantity_total: article.quantity_total !== undefined ? article.quantity_total : article.quantity_available,
        quantity_damaged: article.quantity_damaged || 0
      });
    } else {
      setIsEditing(false);
      setCurrentArticle({
        name: '',
        description: '',
        categoryId: categories.length > 0 ? categories[0].categoryId : '',
        quantity_total: 1,
        quantity_damaged: 0
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: currentArticle.name,
        description: currentArticle.description,
        categoryId: parseInt(currentArticle.categoryId),
        quantity_total: parseInt(currentArticle.quantity_total),
        quantity_damaged: parseInt(currentArticle.quantity_damaged)
      };

      if (isEditing) {
        await ArticleService.update(currentArticle.itemId, payload);
      } else {
        await ArticleService.create(payload);
      }
      fetchData();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving article', error);
      alert('Hubo un error al guardar el artículo.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
      try {
        await ArticleService.delete(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting article', error);
        alert('Hubo un error al eliminar el artículo.');
      }
    }
  };

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h1>Inventario de Artículos</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          <FiPlus /> Nuevo Artículo
        </button>
      </div>

      <div className="inventory-content">
        {loading ? (
          <div className="loading-spinner">Cargando...</div>
        ) : (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Total</th>
                  <th>Disp.</th>
                  <th>Prest.</th>
                  <th>Dañ.</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {articles.length > 0 ? (
                  articles.map((item) => (
                    <tr key={item.itemId}>
                      <td>{item.itemId}</td>
                      <td className="fw-bold">{item.name}</td>
                      <td>
                        <span className="category-badge">
                          {item.category?.categoryName || 'N/A'}
                        </span>
                      </td>
                      <td>{item.quantity_total || item.quantity_available}</td>
                      <td>
                        <span className={`qty-badge ${item.quantity_available > 0 ? 'in-stock' : 'out-of-stock'}`}>
                          {item.quantity_available}
                        </span>
                      </td>
                      <td>
                        <span className="qty-badge neutral">
                          {Math.max(0, (item.quantity_total || item.quantity_available) - item.quantity_available - (item.quantity_damaged || 0))}
                        </span>
                      </td>
                      <td>
                        <span className={`qty-badge ${item.quantity_damaged > 0 ? 'out-of-stock' : 'in-stock'}`}>
                          {item.quantity_damaged || 0}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <button className="btn-icon edit" title="Editar" onClick={() => handleOpenModal(item)}>
                          <FiEdit2 />
                        </button>
                        <button className="btn-icon delete" title="Eliminar" onClick={() => handleDelete(item.itemId)}>
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="empty-state">No hay artículos registrados.</td>
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
            <h2>{isEditing ? 'Editar Artículo' : 'Nuevo Artículo'}</h2>
            <form onSubmit={handleSubmit} className="article-form">
              <div className="form-group">
                <label>Nombre del Artículo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Laptop HP"
                  value={currentArticle.name}
                  onChange={(e) => setCurrentArticle({ ...currentArticle, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  required
                  placeholder="Características principales..."
                  rows="3"
                  value={currentArticle.description}
                  onChange={(e) => setCurrentArticle({ ...currentArticle, description: e.target.value })}
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Categoría</label>
                  <select
                    required
                    value={currentArticle.categoryId}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, categoryId: e.target.value })}
                    className="form-select"
                  >
                    <option value="" disabled>Seleccione una categoría</option>
                    {categories.map(cat => (
                      <option key={cat.categoryId} value={cat.categoryId}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Cantidad Total</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={currentArticle.quantity_total}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, quantity_total: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Dañados / Mantenimiento</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={currentArticle.quantity_damaged}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, quantity_damaged: e.target.value })}
                  />
                </div>
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

export default Inventory;