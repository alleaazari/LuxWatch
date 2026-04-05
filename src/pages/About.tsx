import { Clock, Award, Shield, Users } from "lucide-react";

const values = [
  { icon: Clock, title: "Tepat Waktu", desc: "Pengiriman cepat dan aman ke seluruh Indonesia" },
  { icon: Award, title: "100% Original", desc: "Semua produk dijamin keasliannya dengan sertifikat" },
  { icon: Shield, title: "Garansi Resmi", desc: "Garansi internasional hingga 2 tahun" },
  { icon: Users, title: "10K+ Pelanggan", desc: "Dipercaya oleh ribuan kolektor jam tangan" },
];

const About = () => (
  <div className="pt-24 pb-16">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16 animate-fade-in">
        <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Tentang Kami</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">LuxWatch Indonesia</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          LuxWatch adalah toko jam tangan premium terpercaya di Indonesia sejak 2018. Kami menyediakan koleksi jam tangan mewah dari berbagai brand ternama dunia dengan jaminan keaslian 100%.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {values.map((v, i) => (
          <div key={v.title} className="glass-card p-6 text-center space-y-3 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}>
            <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mx-auto">
              <v.icon size={24} />
            </div>
            <h3 className="font-bold">{v.title}</h3>
            <p className="text-sm text-muted-foreground">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 md:p-12 text-center animate-fade-in">
        <h2 className="text-2xl font-bold mb-4">Visi Kami</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Menjadi destinasi utama bagi pecinta jam tangan di Indonesia. Kami berkomitmen menghadirkan pengalaman belanja yang eksklusif, aman, dan menyenangkan dengan koleksi terkurasi dari brand-brand terbaik dunia.
        </p>
      </div>
    </div>
  </div>
);

export default About;
