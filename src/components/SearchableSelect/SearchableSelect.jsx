import React, { useState, useEffect, useRef } from 'react';
import './SearchableSelect.css';

const SearchableSelect = ({ options, value, onChange, placeholder = 'Seleccionar...', required = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef(null);

  // Encontrar el label del valor actual
  const selectedOption = options.find((opt) => opt.value == value);

  // Cerrar cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="searchable-select" ref={wrapperRef}>
      {/* Hidden input for HTML5 required validation */}
      {required && (
        <input
          type="text"
          value={value || ''}
          onChange={() => {}}
          required={required}
          className="searchable-select-hidden-input"
          tabIndex={-1}
        />
      )}
      <div
        className={`searchable-select-header ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className="searchable-select-dropdown">
          <input
            type="text"
            className="searchable-select-input"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <ul className="searchable-select-list">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <li
                  key={opt.value}
                  className={`searchable-select-item ${opt.value == value ? 'selected' : ''}`}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                    setSearch('');
                  }}
                >
                  {opt.label}
                </li>
              ))
            ) : (
              <li className="searchable-select-item no-results">No se encontraron resultados</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
