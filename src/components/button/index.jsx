

function DefaultButton({ text, cls, onclickfunction }) {
  return (
    <button
      onClick={onclickfunction}
      aria-label="none"
      className={`py-3 px-10 rounded-lg text-white font-medium text-sm ${cls}`}
    >
      {text}
    </button>
  )
}

export default DefaultButton