import "../styles/Header.css"

export default function Header({ title }) {
  return (
    <header data-cy="header">
      <h1>{title}</h1>
    </header>
  )
}
