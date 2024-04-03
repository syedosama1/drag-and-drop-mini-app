import React, { useState, useRef, useEffect } from 'react';
import Modal from './Modal';

const Page = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [elementType, setElementType] = useState('');
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && selectedElement) {
        setModalOpen(true);
      } else if (e.key === 'Delete' && selectedElement) {
        handleDeleteElement();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedElement]);

  useEffect(() => {
    // Save changes to local storage
    localStorage.setItem('elements', JSON.stringify(elements));
  }, [elements]);

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('type');
    const isFromSidebar = e.dataTransfer.getData('isFromSidebar') === 'true';
    const position = { x: e.clientX, y: e.clientY };
    if (isFromSidebar) {
      setElementType(type);
      setElementPosition(position);
      setModalOpen(true);
    } else {
      // Handle dragging element within the page
      const offsetX = window.innerWidth - e.clientX;
      const offsetY = e.clientY - e.target.getBoundingClientRect().top;
      if (selectedElement) {
        selectedElement.style.left = `${offsetX}px`;
        selectedElement.style.top = `${offsetY}px`;
        const updatedElements = elements.map((element) => {
          if (element.id === selectedElement.id) {
            return { ...element, position: { x: offsetX, y: offsetY } };
          }
          return element;
        });
        setElements(updatedElements);
      }
    }
  };
  

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSelectElement = (element) => {
    setSelectedElement(element);
  };

  const handleUpdateElement = (config) => {
    // Update element configuration
    if (selectedElement) {
      const updatedElements = elements.map((el) => {
        if (el.id === selectedElement.id) {
          return { ...el, ...config };
        }
        return el;
      });
      setElements(updatedElements);
      handleCloseModal();
    } else {
      const newElement = {
        id: new Date().getTime(),
        type: elementType,
        position: elementPosition,
        ...config,
      };
      setElements([...elements, newElement]);
      handleCloseModal();
    }
  };

  const handleDeleteElement = () => {
    if (selectedElement) {
      const updatedElements = elements.filter((element) => element.id !== selectedElement.id);
      setElements(updatedElements);
      setSelectedElement(null);
    }
  };

  return (
    <div className="page" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} ref={modalRef} tabIndex="0">
      <Modal isOpen={modalOpen} onClose={handleCloseModal} onSave={handleUpdateElement} type={elementType} position={elementPosition} />
      {elements.map((element) => (
        <div
          key={element.id}
          className={`selected-element ${selectedElement === element ? 'selected' : ''}`}
          style={{ position: 'absolute', left: element.position.x, top: element.position.y, border: selectedElement === element ? '2px solid red' : 'none' }}
          onClick={() => handleSelectElement(element)}
          draggable="true"
          onDragStart={(e) => {
            setSelectedElement(element);
          }}
        >
          {element.type}
        </div>
      ))}
      <div className="sidebar">
        {/* Sidebar content */}
      </div>
    </div>
  );
};

export default Page;
