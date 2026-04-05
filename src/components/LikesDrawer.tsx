import { useCart } from "@/context/CartContext";
import { products, formatPrice } from "@/data/products";
import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const LikesDrawer = ({ open, onClose }: Props) => {
  const { favorites, toggleFavorite, addToCart } = useCart();

  const likedProducts = products.filter((p) => favorites.includes(p.id));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md glass-card rounded-none border-l border-glass-border/30 animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-glass-border/20">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Heart size={20} className="text-primary/70" fill="hsl(217 91% 60% / 0.3)" />
            <span>Favorit Saya</span>
          </h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-secondary/50 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {likedProducts.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Heart size={48} className="mx-auto text-primary/30" />
              <p className="text-muted-foreground">Belum ada produk favorit</p>
              <p className="text-xs text-muted-foreground/60">Tekan ikon ❤ pada produk untuk menambahkan ke favorit</p>
            </div>
          ) : (
            likedProducts.map((product, index) => (
              <div
                key={product.id}
                className="glass-card p-3 flex gap-3 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 rounded-lg object-cover"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.brand}</p>
                  <p className="text-sm font-bold text-primary">{formatPrice(product.price)}</p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-full border border-primary/30 text-primary/80 hover:bg-primary/10 transition-all duration-300"
                      title="Tambah ke keranjang"
                    >
                      <ShoppingCart size={12} className="text-primary/70" />
                      <span>Keranjang</span>
                    </button>
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="ml-auto p-1.5 text-primary/60 hover:text-primary hover:bg-destructive/10 rounded-md transition-all duration-300 group"
                      title="Hapus dari favorit"
                    >
                      <Trash2 size={14} className="group-hover:text-destructive transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {likedProducts.length > 0 && (
          <div className="p-4 border-t border-glass-border/20">
            <p className="text-center text-xs text-muted-foreground">
              {likedProducts.length} produk dalam daftar favorit
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikesDrawer;
