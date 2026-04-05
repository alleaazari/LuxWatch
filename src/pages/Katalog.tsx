import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Katalog = () => (
  <div className="pt-24 pb-16">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12 animate-fade-in">
        <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Koleksi Lengkap</p>
        <h1 className="text-3xl md:text-4xl font-bold">Katalog Jam Tangan</h1>
        <p className="text-muted-foreground mt-3">Temukan jam tangan yang sesuai dengan gaya Anda</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  </div>
);

export default Katalog;
