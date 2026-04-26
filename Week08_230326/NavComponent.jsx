function Nav({ cartCount, onCartOpen }) {
const { pathname } = useLocation(); // reads current route path
return (
<nav>
<div className="logo">TICKET<span>X</span></div>
<div className="nav-links">
<Link to="/"
className={pathname === "/" ? "active" : ""}>Events</Link>
<Link to="/tickets"
className={pathname === "/tickets" ? "active" : ""}>My Tickets</Link>
<button onClick={onCartOpen}>
■ Cart {cartCount > 0 && `(${cartCount})`}
</button>
</div>
</nav>
);
}
