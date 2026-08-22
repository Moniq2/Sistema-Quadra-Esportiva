function Toast({ mensagem, tipo = "success", visivel }) {
  if (!visivel) {
    return null;
  }

  const classes = {
    success: "bg-secondary border-secondary text-white",
    error: "bg-white border-accent text-accent",
    warning: "bg-white border-accent text-accent",
    info: "bg-white border-primary text-primary",
  };

  return (
    <div className="toast toast-end toast-bottom z-50">
      <div className={`alert border-2 ${classes[tipo]}`}>
        <span>{mensagem}</span>
      </div>
    </div>
  );
}

export default Toast;