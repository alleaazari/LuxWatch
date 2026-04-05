import { Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import heroImg from "@/assets/watch-hero.jpg";

const Index = () => {
  const featured = products.filter((p) => p.featured);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Luxury Watch" className="w-full h-full object-cover opacity-40" width={1280} height={720} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl space-y-6 animate-fade-in-up">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest">Koleksi Premium 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Temukan <span className="gradient-text">Jam Tangan</span> Impianmu
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Koleksi jam tangan mewah pilihan dari brand ternama dunia. Elegansi di pergelangan tangan Anda.
            </p>
            <div className="flex gap-4">
              <Link to="/katalog" className="btn-glow-primary">
                Lihat Katalog
              </Link>
              <Link to="/about" className="btn-glow">
                Tentang Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Pilihan Terbaik</p>
            <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/katalog" className="btn-glow">
              Lihat Semua Produk →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
