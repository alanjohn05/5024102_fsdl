function Home({ cart, onBook }) {
const [category, setCategory] = useState("All");
const [search, setSearch] = useState("");
const [query, setQuery] = useState("");
const inputRef = useRef(null); // Ref — direct DOM access without re-render
useEffect(() => { // Side effect: update browser tab title
document.title = "TicketX — Book Events";
}, []);
const filtered = EVENTS.filter(e =>
(category === "All" || e.category === category) &&
(query === "" || e.name.toLowerCase().includes(query.toLowerCase()))
);
const inCart = (id) => cart.find(i => i.id === id);
return (
<div className="page">
<input ref={inputRef} {/* Ref attached to DOM input */}
value={search}
onChange={e => setSearch(e.target.value)}
onKeyDown={e => e.key === "Enter" && setQuery(search)}
placeholder="■ Search events…" />
<select onChange={e => setCategory(e.target.value)}>
{CATEGORIES.map(c => <option key={c}>{c}</option>)}
</select>
<button onClick={() => setQuery(search)}>Search</button>
{/* Category filter pills — key prop for efficient re-render */}
{CATEGORIES.map(c => (
<button key={c}
className={`filter-pill${category === c ? " active" : ""}`}
onClick={() => { setCategory(c); setQuery(""); setSearch(""); }}>
{c}
</button>
))}
{/* Event cards — key={e.id} identifies each card uniquely */}
{filtered.map(e => (
<div className="event-card" key={e.id}>
<div className="event-thumb">{e.emoji}</div>
<div className="event-name">{e.name}</div>
<div className="event-meta">■ {e.date} ■ {e.venue}</div>
<div>■{e.price.toLocaleString()}</div>
<button disabled={e.seats === 0} onClick={() => onBook(e)}>
{inCart(e.id) ? `✓ In Cart (${inCart(e.id).qty})`
: e.seats === 0 ? "Sold Out" : "Book Now"}
</button>
</div>
))}
</div>
);
}
