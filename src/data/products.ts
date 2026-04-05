import watch1 from "@/assets/watch1.jpg";
import watch2 from "@/assets/watch2.jpg";
import watch3 from "@/assets/watch3.jpg";
import watch4 from "@/assets/watch4.jpg";
import watch5 from "@/assets/watch5.jpg";
import watch6 from "@/assets/watch6.jpg";

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  featured?: boolean;
}

export const products: Product[] = [
  { id: 1, name: "Chronograph Gold Edition", brand: "Aurum", price: 4500000, image: watch1, description: "Jam tangan kronograf premium dengan balutan emas 18K. Mesin otomatis Swiss-made dengan power reserve 48 jam. Water resistant hingga 100m. Cocok untuk pria yang menginginkan kesan mewah dan elegan.", featured: true },
  { id: 2, name: "Silver Minimalist", brand: "Elegante", price: 2800000, image: watch2, description: "Desain minimalis dengan case stainless steel 40mm. Dial bersih tanpa angka, hanya index batang. Tali stainless steel solid link. Cocok untuk penggunaan sehari-hari maupun formal.", featured: true },
  { id: 3, name: "Sport Diver Pro", brand: "AquaForce", price: 3200000, image: watch3, description: "Jam tangan diving profesional dengan water resistance 300m. Bezel unidirectional, luminous hands dan markers. Tali karet premium anti-alergi. Ideal untuk pecinta olahraga air.", featured: true },
  { id: 4, name: "Rose Gold Classic", brand: "Rosaria", price: 5200000, image: watch4, description: "Jam tangan klasik dengan case rose gold dan tali kulit genuine leather Italia. Dial putih elegan dengan sub-dial kronograf. Mesin automatic movement Miyota. Tampilan sophisticated untuk segala acara." },
  { id: 5, name: "Blue Sapphire Auto", brand: "Celestia", price: 6800000, image: watch5, description: "Dial biru sunburst yang memukau dengan crystal sapphire anti-gores. Mesin automatic dengan display caseback. Bracelet stainless steel oyster-style. Jam tangan premium untuk kolektor sejati." },
  { id: 6, name: "Pilot Aviation", brand: "SkyMaster", price: 3900000, image: watch6, description: "Terinspirasi dari jam tangan pilot klasik. Case 42mm dengan crown oversized. Dial hitam dengan angka Arab besar dan jarum luminous. Fitur GMT dual timezone. Sempurna untuk petualang." },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
