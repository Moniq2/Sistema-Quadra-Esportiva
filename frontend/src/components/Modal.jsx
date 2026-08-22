function Modal({ aberto, titulo, children, onConfirmar, onFechar }) {
  if (!aberto) {
    return null;
  }

  return (
    <dialog open className="modal">
      <div className="modal-box">

        <h3 className="font-bold text-lg">
          {titulo}
        </h3>

        <div className="py-4">
          {children}
        </div>

        <div className="modal-action">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onFechar}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="btn btn-error"
            onClick={onConfirmar}
          >
            Confirmar
          </button>
        </div>

      </div>
    </dialog>
  );
}

export default Modal;