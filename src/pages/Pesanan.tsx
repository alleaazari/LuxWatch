import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { Link } from "react-router-dom";

const statusSteps = ["dikemas", "dikirim", "dalam perjalanan", "tiba"] as const;

const Pesanan = () => {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center glass-card p-10 animate-fade-in">
          <p className="text-4xl mb-4">👜</p>
          <h2 className="text-xl font-bold mb-2">Belum Ada Pesanan</h2>
          <p className="text-muted-foreground mb-4">Mulai belanja untuk melihat pesanan Anda di sini</p>
          <Link to="/katalog" className="btn-glow-primary inline-block">Lihat Katalog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 animate-fade-in">👜 Pesanan Anda</h1>
        <div className="space-y-6">
          {orders.map((order) => {
            const currentIdx = statusSteps.indexOf(order.status);
            return (
              <div key={order.id} className="glass-card p-6 animate-fade-in-up space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-lg">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold gradient-bg">{order.status.toUpperCase()}</span>
                </div>

                {/* Tracking */}
                <div className="flex items-center gap-1">
                  {statusSteps.map((step, i) => (
                    <div key={step} className="flex-1 flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 transition-colors ${i <= currentIdx ? "gradient-bg" : "bg-secondary"}`}>
                        {i <= currentIdx ? "✓" : i + 1}
                      </div>
                      <p className={`text-[10px] text-center capitalize ${i <= currentIdx ? "text-primary font-semibold" : "text-muted-foreground"}`}>{step}</p>
                      {i < statusSteps.length - 1 && <div className={`hidden`} />}
                    </div>
                  ))}
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-glass-border/20 pt-3 flex justify-between">
                  <span className="text-sm text-muted-foreground">Pembayaran: {order.payment.toUpperCase()}</span>
                  <span className="font-bold text-primary">{formatPrice(order.total)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pesanan;
