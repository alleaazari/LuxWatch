import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";
import LikesDrawer from "./LikesDrawer";
import { Menu, X, Heart, ShoppingCart, ShoppingBag } from "lucide-react";

const navItems = [
  { to: "/", label: "Beranda" },
  { to: "/katalog", label: "Katalog" },
  { to: "/about", label: "About Us" },
  { to: "/kontak", label: "Kontak" },
];

const Navbar = () => {
  const { cartCount, favorites } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [likesOpen, setLikesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/30 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold gradient-text">LuxWatch</Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === item.to ? "text-primary" : "text-foreground/70"}`}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/pesanan" className="hover:scale-110 transition-transform p-1.5 rounded-full hover:bg-primary/10" title="Pesanan Anda">
              <ShoppingBag size={20} className="text-primary/50 hover:text-primary/80 transition-colors" />
            </Link>
            <button
              onClick={() => setLikesOpen(true)}
              className="relative hover:scale-110 transition-transform p-1.5 rounded-full hover:bg-primary/10"
              title="Favorit"
            >
              <Heart
                size={20}
                className={`transition-all duration-300 ${
                  favorites.length > 0
                    ? "text-primary drop-shadow-[0_0_6px_hsl(217_91%_60%/0.5)]"
                    : "text-primary/50"
                }`}
                fill={favorites.length > 0 ? "hsl(217 91% 60% / 0.4)" : "none"}
              />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale-in">
                  {favorites.length}
                </span>
              )}
            </button>
            <button onClick={() => setCartOpen(true)} className="relative hover:scale-110 transition-transform p-1.5 rounded-full hover:bg-primary/10">
              <ShoppingCart size={20} className="text-primary/50 hover:text-primary/80 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden ml-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile */}
        {menuOpen && (
          <div className="md:hidden bg-background/40 backdrop-blur-xl animate-fade-in">
            <div className="flex flex-col p-4 gap-3">
              {navItems.map((item) => (
                <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)} className={`text-sm font-medium py-2 ${location.pathname === item.to ? "text-primary" : "text-foreground/70"}`}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <LikesDrawer open={likesOpen} onClose={() => setLikesOpen(false)} />
    </>
  );
};

export default Navbar;
