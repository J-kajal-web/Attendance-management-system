import React from 'react';
import Modal from './Modal';
import { AlertTriangle } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title = "Confirm Delete", message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center text-center py-2">
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-full mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <p className="text-slate-300 font-medium mb-6">
          {message || "Are you sure you want to delete this item? This action cannot be undone."}
        </p>

        <div className="flex items-center justify-end gap-3 w-full border-t border-slate-800 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold rounded-xl text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm font-semibold rounded-xl text-white bg-rose-600 hover:bg-rose-500 transition-colors shadow-lg shadow-rose-600/30"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
