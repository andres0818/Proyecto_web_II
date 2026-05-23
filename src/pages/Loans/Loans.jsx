import React, { useState, useEffect } from 'react';
import LoanService from '../../services/loanService';
import UserService from '../../services/userService';
import ArticleService from '../../services/articleService';
import SearchableSelect from '../../components/SearchableSelect/SearchableSelect';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiCheckCircle } from 'react-icons/fi';
import './Loans.css';

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLoan, setCurrentLoan] = useState({
    userId: '',
    itemId: '',
    loan_date: new Date().toISOString().split('T')[0],
    due_date: '',
    return_date: '',
    status: true
  });
  const [usersList, setUsersList] = useState([]);
  const [articlesList, setArticlesList] = useState([]);

  const fetchLoans = async () => {
    setLoading(true);
    try {
      const data = await LoanService.getAll();
      setLoans(data);
    } catch (error) {
      console.error('Error fetching loans', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
    fetchUsersAndArticles();
  }, []);

  const fetchUsersAndArticles = async () => {
    try {
      const [users, articles] = await Promise.all([
        UserService.getAll(),
        ArticleService.getAll()
      ]);
      setUsersList(users.map(u => ({ value: u.userId, label: `${u.first_name} ${u.last_name} (${u.email})` })));
      setArticlesList(articles.map(a => ({ value: a.itemId || a.article_id, label: `${a.name} (ID: ${a.itemId || a.article_id})` })));
    } catch (error) {
      console.error('Error fetching users and articles', error);
    }
  };

  const handleOpenModal = (loan = null) => {
    if (loan) {
      setIsEditing(true);
      setCurrentLoan({
        loan_id: loan.loan_id,
        userId: loan.user?.userId || '',
        itemId: loan.item?.itemId || '',
        loan_date: loan.loan_date || new Date().toISOString().split('T')[0],
        due_date: loan.due_date || '',
        return_date: loan.return_date || '',
        status: loan.status
      });
    } else {
      setIsEditing(false);
      setCurrentLoan({
        userId: '',
        itemId: '',
        loan_date: new Date().toISOString().split('T')[0],
        due_date: '',
        return_date: '',
        status: true
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
        userId: parseInt(currentLoan.userId),
        itemId: parseInt(currentLoan.itemId),
        loan_date: currentLoan.loan_date,
        due_date: currentLoan.due_date,
        return_date: currentLoan.return_date ? currentLoan.return_date : null,
        status: currentLoan.status
      };

      if (isEditing) {
        await LoanService.update(currentLoan.loan_id, payload);
      } else {
        await LoanService.create(payload);
      }
      fetchLoans();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving loan', error);
      alert(error.response?.data || 'Hubo un error al guardar el préstamo.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este préstamo?')) {
      try {
        await LoanService.delete(id);
        fetchLoans();
      } catch (error) {
        console.error('Error deleting loan', error);
        alert('Hubo un error al eliminar el préstamo.');
      }
    }
  };

  const handleReturn = async (loan) => {
    if (window.confirm('¿Marcar este préstamo como devuelto?')) {
      try {
        const payload = {
          userId: loan.user.userId,
          itemId: loan.item.itemId,
          loan_date: loan.loan_date,
          due_date: loan.due_date,
          return_date: new Date().toISOString().split('T')[0],
          status: false // false means inactive/returned
        };
        await LoanService.update(loan.loan_id, payload);
        fetchLoans();
      } catch (error) {
        console.error('Error returning loan', error);
        alert('Hubo un error al devolver el préstamo.');
      }
    }
  };

  return (
    <div className="loans-container">
      <div className="loans-header">
        <h1>Préstamos</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          <FiPlus /> Nuevo Préstamo
        </button>
      </div>

      <div className="loans-content">
        {loading ? (
          <div className="loading-spinner">Cargando...</div>
        ) : (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Artículo</th>
                  <th>Fecha Préstamo</th>
                  <th>Fecha Vencimiento</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loans.length > 0 ? (
                  loans.map((loan) => (
                    <tr key={loan.loan_id}>
                      <td>{loan.loan_id}</td>
                      <td>
                        <div className="user-info">
                          <span className="user-name">
                            {loan.user?.first_name} {loan.user?.last_name}
                          </span>
                          <span className="user-id">ID: {loan.user?.userId}</span>
                        </div>
                      </td>
                      <td>
                        <div className="item-info">
                          <span className="item-name">{loan.item?.name}</span>
                          <span className="item-id">ID: {loan.item?.itemId}</span>
                        </div>
                      </td>
                      <td>{loan.loan_date}</td>
                      <td>{loan.due_date}</td>
                      <td>
                        <span className={`status-badge ${loan.status ? 'active' : 'returned'}`}>
                          {loan.status ? 'Activo' : 'Devuelto'}
                        </span>
                      </td>
                      <td className="actions-cell">
                        {loan.status && (
                          <button
                            className="btn-icon return"
                            title="Marcar como Devuelto"
                            onClick={() => handleReturn(loan)}
                          >
                            <FiCheckCircle />
                          </button>
                        )}
                        <button className="btn-icon edit" title="Editar" onClick={() => handleOpenModal(loan)}>
                          <FiEdit2 />
                        </button>
                        <button className="btn-icon delete" title="Eliminar" onClick={() => handleDelete(loan.loan_id)}>
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="empty-state">No hay préstamos registrados.</td>
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
            <h2>{isEditing ? 'Editar Préstamo' : 'Nuevo Préstamo'}</h2>
            <form onSubmit={handleSubmit} className="loan-form">
              <div className="form-row">
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Usuario</label>
                  <SearchableSelect
                    options={usersList}
                    value={currentLoan.userId}
                    onChange={(val) => setCurrentLoan({ ...currentLoan, userId: val })}
                    placeholder="Buscar usuario..."
                    required
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Artículo</label>
                  <SearchableSelect
                    options={articlesList}
                    value={currentLoan.itemId}
                    onChange={(val) => setCurrentLoan({ ...currentLoan, itemId: val })}
                    placeholder="Buscar artículo..."
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Fecha de Préstamo</label>
                  <input
                    type="date"
                    required
                    value={currentLoan.loan_date}
                    onChange={(e) => setCurrentLoan({ ...currentLoan, loan_date: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Fecha de Vencimiento</label>
                  <input
                    type="date"
                    required
                    value={currentLoan.due_date}
                    onChange={(e) => setCurrentLoan({ ...currentLoan, due_date: e.target.value })}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="form-row">
                  <div className="form-group">
                    <label>Estado</label>
                    <select
                      value={currentLoan.status ? "true" : "false"}
                      onChange={(e) => setCurrentLoan({ ...currentLoan, status: e.target.value === "true" })}
                      className="form-select"
                    >
                      <option value="true">Activo</option>
                      <option value="false">Devuelto</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Fecha de Devolución</label>
                    <input
                      type="date"
                      value={currentLoan.return_date || ''}
                      onChange={(e) => setCurrentLoan({ ...currentLoan, return_date: e.target.value })}
                      disabled={currentLoan.status}
                    />
                  </div>
                </div>
              )}

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

export default Loans;
