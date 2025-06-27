

const DarkModeToggle = ({dark, setDark}) => {
  return (
    <button onClick={() => setDark(!dark)}>
      {dark ? "☀️" : "🌙"}
    </button>
  )
}

export default DarkModeToggle;