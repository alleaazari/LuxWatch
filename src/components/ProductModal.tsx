import { Product, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { X, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  product: Product;
  open: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, open, onClose }: Props) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-card max-w-lg w-full animate-scale-in overflow-hidden">
        <button onClick={onClose} className="absolute top-3 right-3 z-10 p-1 rounded-full bg-secondary/50 hover:bg-secondary"><X size={18} /></button>
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
        <div className="p-6 space-y-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.brand}</p>
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-2xl font-bold text-primary">{formatPrice(product.price)}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
          <div className="flex gap-3 pt-3">
            <button onClick={() => { addToCart(product); onClose(); }} className="flex-1 btn-glow py-3 flex items-center justify-center gap-2">
              <ShoppingCart size={16} className="text-primary/70" /> Tambah ke Keranjang
            </button>
            <button onClick={() => { addToCart(product); onClose(); navigate("/checkout"); }} className="flex-1 btn-glow-primary py-3">
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
