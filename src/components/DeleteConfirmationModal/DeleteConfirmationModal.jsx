import "./DeleteConfirmationModal.css";
import closeBtn from "../../assets/close-btn.png";

function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  serverError,
  title = "Are you sure you want to delete this item?",
  description = "This action is irreversible.",
  confirmText = "Yes, delete item",
  loadingText = "Deleting...",
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} onClick={onClose}>
      <div className="delete-modal" onClick={(evt) => evt.stopPropagation()}>
        <button
          type="button"
          className="delete-modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img
            src={closeBtn}
            alt="Close"
            className="delete-modal__close-icon"
          />
        </button>

        <p className="delete-modal__text">
          {title}
          <br />
          {description}
        </p>

        {serverError && (
          <p className="delete-modal__server-error" role="alert">
            {serverError}
          </p>
        )}

        <button
          type="button"
          className="delete-modal__confirm-btn"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? loadingText : confirmText}
        </button>

        <button
          type="button"
          className="delete-modal__cancel-btn"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
