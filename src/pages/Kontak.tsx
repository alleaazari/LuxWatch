import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contacts = [
  { icon: MapPin, title: "Alamat", detail: "Jl. Sudirman No. 123, Jakarta Selatan 12190" },
  { icon: Phone, title: "Telepon", detail: "+62 21 1234 5678" },
  { icon: Mail, title: "Email", detail: "hello@luxwatch.id" },
  { icon: Clock, title: "Jam Operasional", detail: "Senin - Sabtu, 10:00 - 21:00 WIB" },
];

const Kontak = () => (
  <div className="pt-24 pb-16">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12 animate-fade-in">
        <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Hubungi Kami</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Kontak</h1>
        <p className="text-muted-foreground">Ada pertanyaan? Jangan ragu untuk menghubungi kami</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {contacts.map((c, i) => (
          <div key={c.title} className="glass-card p-6 text-center space-y-3 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}>
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto">
              <c.icon size={20} />
            </div>
            <h3 className="font-bold text-sm">{c.title}</h3>
            <p className="text-sm text-muted-foreground">{c.detail}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "400ms", animationFillMode: "both" }}>
        <h2 className="text-xl font-bold mb-6 text-center">Kirim Pesan</h2>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Pesan terkirim! (Demo)"); }}>
          <input placeholder="Nama" required className="w-full p-3 rounded-lg bg-secondary border border-glass-border/20 focus:border-primary focus:outline-none transition-colors" />
          <input placeholder="Email" type="email" required className="w-full p-3 rounded-lg bg-secondary border border-glass-border/20 focus:border-primary focus:outline-none transition-colors" />
          <textarea placeholder="Pesan Anda" rows={4} required className="w-full p-3 rounded-lg bg-secondary border border-glass-border/20 focus:border-primary focus:outline-none transition-colors resize-none" />
          <button type="submit" className="w-full btn-glow-primary py-3">Kirim Pesan</button>
        </form>
      </div>
    </div>
  </div>
);

export default Kontak;
