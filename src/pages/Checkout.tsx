import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { useNavigate } from "react-router-dom";

const paymentMethods = [
  { id: "bca", label: "BCA", icon: "🏦" },
  { id: "bni", label: "BNI", icon: "🏦" },
  { id: "bri", label: "BRI", icon: "🏦" },
  { id: "mandiri", label: "Mandiri", icon: "🏦" },
  { id: "cimb", label: "CIMB Niaga", icon: "🏦" },
  { id: "danamon", label: "Danamon", icon: "🏦" },
  { id: "permata", label: "Permata", icon: "🏦" },
  { id: "qris", label: "QRIS", icon: "📱" },
];

const Checkout = () => {
  const { cart, updateQuantity, cartTotal, clearCart, addOrder } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const [payment, setPayment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payment) return alert("Pilih metode pembayaran");
    if (cart.length === 0) return alert("Keranjang kosong");

    const order = {
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      items: [...cart],
      total: cartTotal,
      name: form.name,
      address: form.address,
      phone: form.phone,
      payment,
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      status: "dikemas" as const,
    };
    addOrder(order);
    clearCart();
    navigate("/pesanan");
  };

  if (cart.length === 0) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center glass-card p-10 animate-fade-in">
          <p className="text-4xl mb-4">🛒</p>
          <h2 className="text-xl font-bold mb-2">Keranjang Kosong</h2>
          <p className="text-muted-foreground mb-4">Tambahkan produk ke keranjang terlebih dahulu</p>
          <button onClick={() => navigate("/katalog")} className="btn-glow-primary">Lihat Katalog</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 animate-fade-in">💳 Checkout</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left */}
          <div className="space-y-6 animate-fade-in-up">
            {/* Info */}
            <div className="glass-card p-6 space-y-4">
              <h2 className="font-bold text-lg">Informasi Pengiriman</h2>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama Lengkap" className="w-full p-3 rounded-lg bg-secondary border border-glass-border/20 focus:border-primary focus:outline-none transition-colors" />
              <textarea required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Alamat Lengkap" rows={3} className="w-full p-3 rounded-lg bg-secondary border border-glass-border/20 focus:border-primary focus:outline-none transition-colors resize-none" />
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Nomor HP" type="tel" className="w-full p-3 rounded-lg bg-secondary border border-glass-border/20 focus:border-primary focus:outline-none transition-colors" />
            </div>

            {/* Map */}
            <div className="glass-card p-6 space-y-3">
              <h2 className="font-bold text-lg">📍 Pilih Lokasi di Peta</h2>
              <div className="rounded-lg overflow-hidden border border-glass-border/20">
                <iframe
                  title="Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=106.7%2C-6.25%2C106.9%2C-6.15&layer=mapnik"
                  width="100%"
                  height="280"
                  className="border-0"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-muted-foreground">* Peta interaktif — geser untuk menentukan lokasi pengiriman</p>
            </div>

            {/* Payment */}
            <div className="glass-card p-6 space-y-3">
              <h2 className="font-bold text-lg">Metode Pembayaran</h2>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((m) => (
                  <label key={m.id} className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer border transition-colors ${payment === m.id ? "border-primary bg-primary/10" : "border-glass-border/20 bg-secondary/50 hover:border-glass-border/40"}`}>
                    <input type="radio" name="payment" value={m.id} checked={payment === m.id} onChange={() => setPayment(m.id)} className="accent-primary" />
                    <span className="text-lg">{m.icon}</span>
                    <span className="text-sm font-medium">{m.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Order Summary */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            <div className="glass-card p-6 space-y-4 lg:sticky lg:top-24">
              <h2 className="font-bold text-lg">Ringkasan Pesanan</h2>
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-3 items-center">
                  <img src={item.product.image} alt={item.product.name} className="w-14 h-14 rounded-lg object-cover" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">{formatPrice(item.product.price)}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 rounded bg-secondary flex items-center justify-center text-sm font-bold hover:bg-secondary/80">−</button>
                    <span className="text-sm w-6 text-center">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 rounded bg-secondary flex items-center justify-center text-sm font-bold hover:bg-secondary/80">+</button>
                  </div>
                  <p className="text-sm font-bold w-28 text-right">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              ))}
              <div className="border-t border-glass-border/20 pt-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Ongkir</span><span className="text-primary">Gratis</span></div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-glass-border/20"><span>Total</span><span className="text-primary">{formatPrice(cartTotal)}</span></div>
              </div>
              <button type="submit" className="w-full btn-glow-primary py-3">
                Bayar Sekarang
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
