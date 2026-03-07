import React from 'react';
import './Inventory.css';
import { MdOutlineTabletMac, MdComputer, MdMenuBook, MdAddCircleOutline } from 'react-icons/md';


const renderIcon = (type) => {
  switch (type) {
    case 'Tablet': return <MdOutlineTabletMac />;
    case 'Laptop': return <MdComputer />;
    case 'Book': return <MdMenuBook />;
    default: return <MdAddCircleOutline />;
  }
};

const Inventory = () => {
  const inventoryItems = [
    { id: 1, type: 'Tablet', brand: 'Samsung Galaxy Tab', status: 'Available' },
    { id: 2, type: 'Portatil', brand: 'Lenovo ', status: 'Loaned' },
    { id: 3, type: 'Libro', brand: 'Cien años de soledad', status: 'Available' },
    { id: 4, type: 'Portatil', brand: 'HP ', status: 'Available' },
    { id: 5, type: 'Tablet', brand: 'iPad', status: 'Maintenance' },
  ];

  return (
    <div className="inventory-page" style={{ padding: '20px' }}>
      <h2>Inventario de Artículos Prestables</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Icono</th>
            <th>Tipo</th>
            <th>Descripción / Marca</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item) => (
            <tr key={item.id}>
              <td style={{ fontSize: '1.5rem' }}>{renderIcon(item.type)}</td>
              <td>{item.type}</td>
              <td>{item.brand}</td>
              <td>
                <span className={`status-badge ${item.status.toLowerCase()}`}>
                  {item.status === 'Available' ? 'Disponible' : 
                   item.status === 'Loaned' ? 'Prestado' : 'Mantenimiento'}
                </span>
              </td>
              <td>
                <button className="view-btn" onClick={() => console.log('Viewing details...')}>
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;