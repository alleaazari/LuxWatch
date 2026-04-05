import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: Props) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md glass-card rounded-none border-l border-glass-border/30 animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-glass-border/20">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ShoppingCart size={20} className="text-primary/70" />
            <span>Keranjang</span>
          </h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">Keranjang kosong</p>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="glass-card p-3 flex gap-3">
                <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover" loading="lazy" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                  <p className="text-sm font-bold text-primary">{formatPrice(item.product.price)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 rounded-md bg-secondary hover:bg-secondary/80"><Minus size={14} /></button>
                    <span className="text-sm w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 rounded-md bg-secondary hover:bg-secondary/80"><Plus size={14} /></button>
                    <button onClick={() => removeFromCart(item.product.id)} className="ml-auto p-1 text-destructive hover:bg-destructive/10 rounded-md"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t border-glass-border/20 space-y-3">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">{formatPrice(cartTotal)}</span>
            </div>
            <button onClick={() => { onClose(); navigate("/checkout"); }} className="w-full btn-glow-primary py-3">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
