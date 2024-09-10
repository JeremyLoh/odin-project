import "../styles/Card.css"

export default function Card({ title, date, body }) {
  return (
    <div className="card">
      <div className="row">
        <p className="bold">{title}</p>
        {date && <p>{date}</p>}
      </div>
      <div className="card-body">{body}</div>
    </div>
  )
}
