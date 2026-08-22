export default function Toast({ message, type = 'success', visible }) {
  if (!visible) return null

  return (
    <div className="toast toast-end toast-top z-[100]" role="status" aria-live="polite">
      <div className={`alert ${type === 'error' ? 'alert-error' : 'alert-success'} text-white shadow-lg`}>
        <span>{message}</span>
      </div>
    </div>
  )
}
