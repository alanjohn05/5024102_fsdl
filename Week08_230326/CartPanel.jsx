function CartPanel({ open, onClose, cart, onQty, onCheckout }) {
const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
if (!open) return null;
return (
<>
<div className="overlay" onClick={onClose} />
<div className="cart-panel open">
<div className="cart-head">
<h2>Your Cart</h2>
<button onClick={onClose}>✕</button>
</div>
<div className="cart-items">
{cart.length === 0
? <p>No tickets yet. Go grab some! ■■</p>
: cart.map(item => ( // key prop for list reconciliation
<div className="cart-item" key={item.id}>
<span>{item.emoji}</span>
<div>
<div>{item.name}</div>
<div className="qty-ctrl">
<button onClick={() => onQty(item.id, -1)}>−</button>
<span>{item.qty}</span>
<button onClick={() => onQty(item.id, 1)}>+</button>
</div>
</div>
<div>■{(item.price * item.qty).toLocaleString()}</div>
</div>
))
}
</div>
{cart.length > 0 && (
<div className="cart-footer">
<div>Total ■{total.toLocaleString()}</div>
<button onClick={onCheckout}>Confirm Booking →</button>
</div>
)}
</div>
</>
);
}
