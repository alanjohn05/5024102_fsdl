function MyTickets({ booked }) {
const navigate = useNavigate(); // programmatic navigation
useEffect(() => {
document.title = "TicketX — My Tickets";
}, []);
return (
<div className="page">
<h2>My <span>Tickets</span></h2>
<span>{booked.length} booked</span>
{booked.length === 0
? <div className="empty-state">
<div>■■</div>
<p>No bookings yet.</p>
<button onClick={() => navigate("/")}>Browse Events</button>
</div>
: booked.map((b, i) => ( // key = id + index for uniqueness
<div className="ticket-card" key={b.id + "-" + i}>
<span>{b.emoji}</span>
<div>
<div>{b.name}</div>
<div>■ {b.date} · ■ {b.venue} · ■■ {b.qty} ticket{b.qty > 1 ? "s" : ""}</div>
</div>
<div>■{(b.price * b.qty).toLocaleString()}</div>
</div>
))
}
</div>
);
}
