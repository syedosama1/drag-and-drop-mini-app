import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const Element = ({ index, type, position, updateElement, deleteElement }) => {
  const [selected, setSelected] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [config, setConfig] = useState(position);

  useEffect(() => {
    // Update local storage whenever config changes
    localStorage.setItem(`element-${index}`, JSON.stringify(config));
  }, [config, index]);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('index', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('sidebar')) {
      // Prevent dragover event in sidebar
      return;
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const newIndex = parseInt(e.dataTransfer.getData('index'));
    if (newIndex !== index) {
      const rect = e.target.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      updateElement(index, { type, position: config });
      updateElement(newIndex, { type, position: { x: offsetX, y: offsetY } });
    }
  };

  const handleConfigUpdate = (newConfig) => {
    setConfig(newConfig);
    setModalOpen(false);
    updateElement(index, { type, position: newConfig });
  };

  const handleDelete = () => {
    deleteElement(index);
  };

  const handleSelect = () => {
    setSelected(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setModalOpen(true);
    } else if (e.key === 'Delete') {
      handleDelete();
    }
  };

  return (
    <div
      className={`element ${selected ? 'selected' : ''}`}
      style={{ left: config.x, top: config.y }}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleSelect}
      onKeyPress={handleKeyPress}
      tabIndex="0"
    >
      {type}
      <Modal
        isOpen={modalOpen}
        config={config}
        handleUpdate={handleConfigUpdate}
        handleClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Element;
