export default function App() {
const [cart, setCart] = useState([]);
const [cartOpen, setCartOpen] = useState(false);
const [booked, setBooked] = useState([]);
const [success, setSuccess] = useState(false);
const handleBook = (event) => {
setCart(prev => {
const ex = prev.find(i => i.id === event.id);
if (ex) return prev.map(i => i.id === event.id ? { ...i, qty: i.qty + 1 } : i);
return [...prev, { ...event, qty: 1 }];
});
};
const handleQty = (id, delta) =>
setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
.filter(i => i.qty > 0));
const handleCheckout = () => {
setBooked(prev => [...prev, ...cart]);
setCart([]); setCartOpen(false); setSuccess(true);
};
const cartCount = cart.reduce((s, i) => s + i.qty, 0);
return (
<Router> {/* HashRouter wraps entire app */}
<Nav cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
<CartPanel open={cartOpen} onClose={() => setCartOpen(false)}
cart={cart} onQty={handleQty} onCheckout={handleCheckout} />
{success && (
<div className="modal-wrap">
<div className="overlay" onClick={() => setSuccess(false)} />
<div className="modal">
<div>■</div>
<h2>Booking Confirmed!</h2>
<p>Your tickets are booked. Check "My Tickets" to view your bookings.</p>
<button onClick={() => setSuccess(false)}>Done</button>
</div>
</div>
)}
<Routes> {/* Route definitions */}
<Route path="/" element={<Home cart={cart} onBook={handleBook} />} />
<Route path="/tickets" element={<MyTickets booked={booked} />} />
</Routes>
</Router>
);
}
