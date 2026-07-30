export default function ConfirmModal({
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  confirmButtonClass = "btn-danger",
  onConfirm,
  onCancel,
}) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="dialog" onClick={(event) => event.stopPropagation()}>
        <div className="dialog-title">{title}</div>

        <div className="dialog-body">{message}</div>

        <div className="dialog-actions">
          <button className="btn btn-ghost" onClick={onCancel}>
            {cancelText}
          </button>

          <button className={`btn ${confirmButtonClass}`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
