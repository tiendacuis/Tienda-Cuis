import FaqHome from "./components/FaqHome";

const LOGO_NEGRO = "https://tiendacuis.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-06-at-6.57.16-PM.jpeg";
const LOGO_BLANCO = "https://tiendacuis.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-06-at-6.57.17-PM-6.jpeg";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] font-[family-name:var(--font-dm-sans)]">

      {/* NAV */}
      <nav className="bg-white border-b border-[#E8E4DB] px-8 h-14 flex items-center justify-between">
        <a href="/">
          <img src={LOGO_NEGRO} alt="Tienda Cuis" className="h-8 w-auto object-contain" />
        </a>
        <div className="hidden md:flex items-center gap-7 text-sm text-[#6b6b6b]">
          <a href="/catalogo" className="hover:text-[#1A1A1A] transition-colors">Productos</a>
          <a href="/grabado" className="hover:text-[#1A1A1A] transition-colors">Grabado láser</a>
          <a href="/faq" className="hover:text-[#1A1A1A] transition-colors">Preguntas frecuentes</a>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#6b6b6b] bg-[#F0EDE8] px-3 py-1 rounded-sm tracking-wide">
            Solo mayorista
          </span>
          <a href="#" className="bg-[#E8673A] text-white text-xs px-4 py-2 rounded-sm font-medium hover:bg-[#C4522C] transition-colors">
            Registrarse
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-[#2D2B45] px-8 py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-xs text-white/40 uppercase tracking-[3px] mb-4">
            Mayorista de artículos regionales
          </p>
          <h1 className="text-5xl font-light text-white leading-tight mb-5 tracking-tight">
            Mayorista de mates y artículos regionales
          </h1>
          <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md font-light">
            <span className="text-white/80 text-xl font-light block mb-3">El socio que necesita tu negocio</span>
          Especialistas en abastecer tiendas de souvenirs y emprendedores. Productos de calidad con mínimos accesibles. Grabado láser personalizado. Envíos a todo el país.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="/catalogo" className="bg-[#E8673A] text-white text-sm px-6 py-3 rounded-sm font-medium hover:bg-[#C4522C] transition-colors">
              Ver catálogo
            </a>
            <a href="https://wa.me/541123251963" className="border border-white/20 text-white/70 text-sm px-6 py-3 rounded-sm hover:bg-white/5 transition-colors">
              Consultar por WhatsApp
            </a>
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-3">
          {[
            { label: "Bajo Mínimo de compra", value: "Con $80.000 accedes a todos nuestros productos" },
            { label: "Stock Permanente", value: "Envios por Correo Argentino y Via Cargo" },
            { label: "Personalización", value: "Grabado láser de bombillas, mates y termos" },
          ].map((item) => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded px-4 py-3">
              <p className="text-white/40 text-xs mb-1">{item.label}</p>
              <p className="text-white text-sm font-light">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="bg-white border-b border-[#E8E4DB] px-8 py-3 flex gap-6 overflow-x-auto text-xs text-[#6b6b6b] flex-wrap justify-center">
        {["Mínimo $80.000", "+100 productos", "Grabado personalizado", "Envío a todo el país", "Atención por WhatsApp"].map((item) => (
          <div key={item} className="flex items-center gap-2 whitespace-nowrap">
            <span className="w-1 h-1 rounded-full bg-[#E8673A]" />
            {item}
          </div>
        ))}
      </div>

      {/* CATEGORÍAS */}
      <section className="px-8 py-14">
        <p className="text-xs uppercase tracking-[2.5px] text-[#9BA88D] font-medium mb-2">Catálogo</p>
        <h2 className="text-3xl font-light text-[#1A1A1A] mb-1 tracking-tight">Todas las categorías</h2>
        <p className="text-sm text-[#6b6b6b] mb-8 font-light">Artículos regionales para tiendas, kioscos y emprendedores.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { num: "01", title: "Mates", desc: "Imperiales, camioneros, térmicos, algarrobo, palo santo y más.", count: "+25 productos", href: "/catalogo?categoria=mates" },
            { num: "02", title: "Bombillas", desc: "Pico de loro, chata, estribo, resorte. Todos los estilos.", count: "+15 productos", href: "/catalogo?categoria=bombillas" },
            { num: "03", title: "Vasos y Chops", desc: "Aluminio grabado, fernetero, refrigerante.", count: "+10 productos", href: "/catalogo?categoria=vasos" },
            { num: "04", title: "Materos y Yerberos", desc: "Latas, canastas eco cuero, porta termos.", count: "+8 productos", href: "/catalogo?categoria=complementos" },
            { num: "05", title: "Combos Emprendedores", desc: "Kits con descuento para armar el negocio desde cero.", count: "Oferta", href: "/catalogo?categoria=combos" },
            { num: "06", title: "Grabado Láser", desc: "Personalización sobre pedido. Virolas, bombillas, mates y más.", count: "Servicio", href: "/grabado" },
          ].map((cat) => (
            <a key={cat.title} href={cat.href} className="bg-white border border-[#E8E4DB] rounded p-5 hover:border-[#9BA88D] transition-colors relative group">
              <span className="absolute top-4 right-4 text-xs text-[#6b6b6b] bg-[#F5F2EC] px-2 py-0.5 rounded-sm">{cat.count}</span>
              <div className="text-4xl font-light text-[#E8E4DB] leading-none mb-3 tracking-tight">{cat.num}</div>
              <h3 className="text-sm font-medium text-[#1A1A1A] mb-1">{cat.title}</h3>
              <p className="text-xs text-[#6b6b6b] leading-relaxed font-light">{cat.desc}</p>
              <span className="text-xs text-[#E8673A] font-medium mt-3 block">Ver productos →</span>
            </a>
          ))}
        </div>
      </section>

      {/* GRABADO LÁSER */}
      <section className="bg-[#F2C4A8] px-8 py-14 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-xs uppercase tracking-[2.5px] text-[#C4522C] font-medium mb-2">Diferencial</p>
          <h2 className="text-3xl font-light text-[#2D2B45] mb-3 tracking-tight">Grabado láser personalizado</h2>
          <p className="text-[#2D2B45]/60 text-sm leading-relaxed mb-5 font-light">
            Ideal para souvenirs de localidad, regalos corporativos y recuerdos de eventos.
            Pedido mínimo accesible.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {["Virolas grabadas", "Bombillas grabadas", "Mates personalizados", "Logo de empresa", "Souvenirs de ciudad"].map((tag) => (
              <span key={tag} className="text-xs border border-[#2D2B45]/20 text-[#2D2B45]/60 px-3 py-1 rounded-sm">{tag}</span>
            ))}
          </div>
          <a href="/grabado" className="inline-block bg-[#2D2B45] text-white text-sm px-5 py-2.5 rounded-sm font-medium hover:bg-[#1e1c30] transition-colors">
            Ver servicio de grabado →
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Tipo de trabajo", value: "Grabado vectorial" },
            { label: "Materiales", value: "Acero · Aluminio · Alpaca" },
            { label: "Entrega", value: "A convenir según pedido" },
            { label: "Consultas", value: "WhatsApp 11 2325 1963" },
          ].map((item) => (
            <div key={item.label} className="bg-white/50 border border-[#2D2B45]/10 rounded p-4 text-center">
              <p className="text-[10px] uppercase tracking-widest text-[#2D2B45]/50 mb-1">{item.label}</p>
              <p className="text-[#2D2B45] text-sm font-light">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <FaqHome />

      {/* FOOTER */}
      <footer className="bg-[#2D2B45] px-8 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <img src={LOGO_BLANCO} alt="Tienda Cuis" className="h-8 w-auto object-contain mb-3" />
          <p className="text-xs text-white/35 leading-relaxed font-light">
            Mayorista de artículos regionales. Mates, bombillas y accesorios para negocios y emprendedores.
          </p>
          <a href="https://wa.me/541123251963" className="text-[#E8673A] text-xs font-medium mt-3 block hover:underline">
            WhatsApp 11 2325 1963
          </a>
        </div>
        <div>
          <h5 className="text-[10px] text-white/30 uppercase tracking-[2px] mb-3 font-light">Productos</h5>
          {[
            { label: "Mates", href: "/catalogo?categoria=mates" },
            { label: "Bombillas", href: "/catalogo?categoria=bombillas" },
            { label: "Vasos y Chops", href: "/catalogo?categoria=vasos" },
            { label: "Materos y Yerberos", href: "/catalogo?categoria=complementos" },
            { label: "Combos emprendedores", href: "/catalogo?categoria=combos" },
          ].map((item) => (
            <a key={item.label} href={item.href} className="block text-sm text-white/45 mb-1 hover:text-white/80 font-light transition-colors">{item.label}</a>
          ))}
        </div>
        <div>
          <h5 className="text-[10px] text-white/30 uppercase tracking-[2px] mb-3 font-light">Información</h5>
          {[
            { label: "Grabado láser", href: "/grabado" },
            { label: "Preguntas frecuentes", href: "/faq" },
            { label: "Ver catálogo", href: "/catalogo" },
          ].map((item) => (
            <a key={item.label} href={item.href} className="block text-sm text-white/45 mb-1 hover:text-white/80 font-light transition-colors">{item.label}</a>
          ))}
        </div>
      </footer>
      <div className="bg-[#1e1c30] px-8 py-3 flex justify-between text-xs text-white/20">
        <span>© 2025 Tienda Cuis · La Lucila del Mar, Buenos Aires</span>
        <span>Solo venta mayorista</span>
      </div>

    </main>
  );
}