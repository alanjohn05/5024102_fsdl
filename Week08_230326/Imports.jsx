import { useState, useRef, useEffect } from "react";
import { HashRouter as Router, Routes, Route,
Link, useNavigate, useLocation } from "react-router-dom";
// Shared event data — keys (id) used for list reconciliation
const EVENTS = [
{ id:1, emoji:"■", name:"Neon Pulse Fest", date:"Apr 12, 2026",
venue:"Mumbai Arena", category:"Music", price:1299, badge:"hot", seats:120 },
{ id:2, emoji:"■", name:"IPL: MI vs CSK", date:"Apr 18, 2026",
venue:"Wankhede Stadium", category:"Sports", price:899, badge:"hot", seats:340 },
{ id:3, emoji:"■", name:"Shakespeare Live", date:"May 3, 2026",
venue:"NCPA, Mumbai", category:"Theatre", price:699, badge:"new", seats:60 },
{ id:4, emoji:"■", name:"Arijit Singh Live",date:"May 10, 2026",
venue:"DY Patil Stadium", category:"Music", price:2499, badge:"hot", seats:0 },
{ id:5, emoji:"■", name:"Indie Film Gala", date:"May 22, 2026",
venue:"PVR Director's Cut",category:"Cinema", price:499, badge:"new", seats:80 },
{ id:6, emoji:"■", name:"NBA India Games", date:"Jun 5, 2026",
venue:"NSCI Dome", category:"Sports", price:1899, badge:"new", seats:200 },
];
const CATEGORIES = ["All", "Music", "Sports", "Theatre", "Cinema"];
