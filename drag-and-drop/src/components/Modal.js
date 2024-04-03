// Modal.js
import React, { useState } from 'react';
import "./Modal.css"
const Modal = ({ isOpen, onClose, onSave, type, position }) => {
  const [x, setX] = useState(position.x);
  const [y, setY] = useState(position.y);
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState('normal');
  const [text, setText] = useState('');

  const handleSave = () => {
    onSave({ x, y, fontSize, fontWeight, text });
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <p>X Coordinate:</p>
            <input type="text" value={x} onChange={(e) => setX(e.target.value)} />
            <p>Y Coordinate:</p>
            <input type="text" value={y} onChange={(e) => setY(e.target.value)} />
            <p>Font Size:</p>
            <input type="text" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
            <p>Font Weight:</p>
            <select value={fontWeight} onChange={(e) => setFontWeight(e.target.value)}>
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="lighter">Lighter</option>
            </select>
            <p>Text Content:</p>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <button className="save-button" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
