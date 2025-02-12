import React from "react";
import ModalProps from "../types/modal";

const Modal: React.FC<ModalProps> = ({ isOpen = false, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="modal fade show" tabIndex={-1} style={{ display: 'block' }} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          {title && (
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
            </div>
          )}
          <div className="modal-body">
            {children} 
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
