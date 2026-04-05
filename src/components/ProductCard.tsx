import { useState } from "react";
import { Product, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductModal from "./ProductModal";
import { Heart, ShoppingCart } from "lucide-react";

interface Props {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: Props) => {
  const { addToCart, toggleFavorite, favorites } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const isFav = favorites.includes(product.id);

  return (
    <>
      <div
        className="glass-card overflow-hidden group hover-scale cursor-pointer animate-fade-in-up"
        style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
        onClick={() => setModalOpen(true)}
      >
        <div className="relative overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width={512} height={512} />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-4 space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.brand}</p>
          <h3 className="font-semibold text-sm">{product.name}</h3>
          <p className="text-primary font-bold">{formatPrice(product.price)}</p>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
              className="p-1.5 rounded-full hover:scale-125 transition-all duration-300 hover:bg-primary/10"
              title={isFav ? "Hapus dari favorit" : "Tambah ke favorit"}
            >
              <Heart
                size={20}
                className={`transition-all duration-300 ${
                  isFav
                    ? "text-primary drop-shadow-[0_0_6px_hsl(217_91%_60%/0.6)]"
                    : "text-primary/40"
                }`}
                fill={isFav ? "hsl(217 91% 60% / 0.5)" : "none"}
                strokeWidth={isFav ? 2.5 : 1.5}
              />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); addToCart(product); }}
              className="p-1.5 rounded-full hover:scale-125 transition-all duration-300 hover:bg-primary/10"
              title="Tambah ke keranjang"
            >
              <ShoppingCart size={20} className="text-primary/40 hover:text-primary/70 transition-colors" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); addToCart(product); }}
              className="ml-auto btn-glow-primary px-4 py-1.5 text-xs"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
      <ProductModal product={product} open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default ProductCard;
