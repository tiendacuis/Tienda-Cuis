export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf7f0] font-[family-name:var(--font-dm-sans)]">

      {/* NAV */}
      <nav className="bg-white border-b border-[#e8e4db] px-8 h-14 flex items-center justify-between">
        <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1a5c38]">
          Tienda <span className="text-[#b8860b]">Cuis</span>
        </span>
        <div className="hidden md:flex items-center gap-6 text-sm text-[#6b6b6b]">
          <a href="#categorias" className="hover:text-[#1a5c38]">Productos</a>
          <a href="#grabado" className="hover:text-[#1a5c38]">Grabado láser</a>
          <a href="#faq" className="hover:text-[#1a5c38]">Preguntas frecuentes</a>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#b8860b] bg-[#fff8e6] border border-[#e8d48a] px-2 py-1 rounded">
            Solo mayorista
          </span>
          <a href="#" className="bg-[#1a5c38] text-white text-xs px-4 py-2 rounded font-medium hover:bg-[#154d30]">
            Registrarse
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-[#1a5c38] px-8 py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-xs text-white/60 uppercase tracking-widest mb-3">
            Mayorista de artículos regionales
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white leading-tight mb-4">
            Mates y accesorios{" "}
            <em className="text-[#d4aa4a] not-italic">para tu negocio</em>
          </h1>
          <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-md">
            Productos de calidad con mínimos accesibles. Grabado láser personalizado.
            Envíos a todo el país.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="#categorias" className="bg-[#d4aa4a] text-[#1a1a1a] text-sm px-5 py-2.5 rounded font-medium hover:bg-[#c49a3a]">
              Ver catálogo
            </a>
            <a href="https://wa.me/541123251963" className="border border-white/30 text-white/85 text-sm px-5 py-2.5 rounded hover:bg-white/10">
              Consultar por WhatsApp
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { icon: "🧉", label: "Categorías disponibles", value: "Mates · Bombillas · Vasos · Materos" },
            { icon: "✦", label: "Personalización", value: "Grabado láser sobre pedido mayorista" },
            { icon: "📦", label: "Despacho", value: "Todo el país · Andreani y OCA" },
          ].map((item) => (
            <div key={item.label} className="bg-white/10 border border-white/15 rounded-lg px-4 py-3 flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              <div>
                <p className="text-white/50 text-xs">{item.label}</p>
                <p className="text-white text-sm font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="bg-white border-b border-[#e8e4db] px-8 py-3 flex gap-6 overflow-x-auto text-xs text-[#6b6b6b] flex-wrap">
        {["Mínimos accesibles", "Más de 85 productos", "Grabado personalizado", "Envío a todo el país", "Atención por WhatsApp"].map((item) => (
          <div key={item} className="flex items-center gap-2 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a5c38]" />
            {item}
          </div>
        ))}
      </div>

      {/* CATEGORÍAS */}
      <section id="categorias" className="px-8 py-14">
        <p className="text-xs uppercase tracking-widest text-[#b8860b] font-medium mb-2">Catálogo</p>
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1a1a1a] mb-1">Todas las categorías</h2>
        <p className="text-sm text-[#6b6b6b] mb-8">Artículos regionales para tiendas, kioscos y emprendedores.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { emoji: "🧉", title: "Mates", desc: "Imperiales, camioneros, térmicos, algarrobo, palo santo y más.", count: "+25 productos", href: "https://tiendacuis.com/index.php/product-category/mate/" },
            { emoji: "🥄", title: "Bombillas", desc: "Pico de loro, chata, estribo, resorte, grabadas. Todos los estilos.", count: "+15 productos", href: "https://tiendacuis.com/index.php/product-category/bombillas/" },
            { emoji: "🥤", title: "Vasos y Chops", desc: "Aluminio grabado, fernetero, refrigerante. Para armar combos.", count: "+10 productos", href: "https://tiendacuis.com/index.php/product-category/vasos/" },
            { emoji: "🎒", title: "Materos y Yerberos", desc: "Latas, canastas eco cuero, porta termos. Complemento ideal.", count: "+8 productos", href: "https://tiendacuis.com/index.php/product-category/complementos/" },
            { emoji: "📦", title: "Combos Emprendedores", desc: "Kits con descuento pensados para armar el negocio desde cero.", count: "Oferta", href: "https://tiendacuis.com/index.php/product-category/combos-emprendedores/" },
            { emoji: "⚡", title: "Grabado Láser", desc: "Personalización sobre pedido. Virolas, bombillas, mates y más.", count: "Servicio", href: "#grabado" },
          ].map((cat) => (
            <a key={cat.title} href={cat.href} className="bg-white border border-[#e8e4db] rounded-lg p-5 hover:border-[#b8d4c4] transition-colors relative group">
              <span className="absolute top-3 right-3 text-xs text-[#b8860b] bg-[#fff8e6] px-2 py-0.5 rounded">{cat.count}</span>
              <span className="text-2xl mb-3 block">{cat.emoji}</span>
              <h3 className="text-sm font-medium text-[#1a1a1a] mb-1">{cat.title}</h3>
              <p className="text-xs text-[#6b6b6b] leading-relaxed">{cat.desc}</p>
              <span className="text-xs text-[#1a5c38] font-medium mt-3 block group-hover:underline">Ver productos →</span>
            </a>
          ))}
        </div>
      </section>

      {/* GRABADO LÁSER */}
      <section id="grabado" className="bg-[#1a5c38] px-8 py-14 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#d4aa4a]/80 font-medium mb-2">Diferencial</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-3">Grabado láser personalizado</h2>
          <p className="text-white/65 text-sm leading-relaxed mb-5">
            Ideal para souvenirs de localidad, regalos corporativos y recuerdos de eventos.
            Pedido mínimo accesible.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Virolas grabadas", "Bombillas grabadas", "Mates personalizados", "Logo de empresa", "Souvenirs de ciudad"].map((tag) => (
              <span key={tag} className="text-xs border border-white/20 text-white/75 px-3 py-1 rounded">{tag}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Tipo de trabajo", value: "Grabado vectorial" },
            { label: "Materiales", value: "Acero · Aluminio · Alpaca" },
            { label: "Entrega", value: "A convenir según pedido" },
            { label: "Consultas", value: "WhatsApp 11 2325 1963" },
          ].map((item) => (
            <div key={item.label} className="bg-white/10 border border-white/15 rounded-lg p-4 text-center">
              <p className="text-white/50 text-xs mb-1">{item.label}</p>
              <p className="text-white text-sm">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white px-8 py-14">
        <p className="text-xs uppercase tracking-widest text-[#b8860b] font-medium mb-2">Preguntas frecuentes</p>
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1a1a1a] mb-8">Lo que más nos preguntan</h2>
        <div className="divide-y divide-[#f0ede8]">
          {[
            "¿Cuál es el mínimo de compra para hacer un pedido?",
            "¿Hacen envíos a todo el país?",
            "¿Cómo funciona el grabado láser personalizado?",
            "¿Puedo ver los precios sin registrarme?",
            "¿Cuánto tarda en llegar mi pedido?",
          ].map((q) => (
            <div key={q} className="py-4 flex justify-between items-center cursor-pointer group">
              <span className="text-sm text-[#1a1a1a] group-hover:text-[#1a5c38]">{q}</span>
              <span className="text-[#1a5c38] text-lg ml-4">+</span>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a1a1a] px-8 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white">
            Tienda <span className="text-[#d4aa4a]">Cuis</span>
          </span>
          <p className="text-xs text-[#888] mt-2 leading-relaxed">
            Mayorista de artículos regionales. Mates, bombillas y accesorios para negocios y emprendedores.
          </p>
          <a href="https://wa.me/541123251963" className="text-[#4fc06d] text-xs font-medium mt-3 block hover:underline">
            WhatsApp 11 2325 1963
          </a>
        </div>
        <div>
          <h5 className="text-xs text-[#888] uppercase tracking-widest mb-3">Productos</h5>
          {["Mates", "Bombillas", "Vasos y Chops", "Materos y Yerberos", "Combos emprendedores"].map((item) => (
            <a key={item} href="#" className="block text-sm text-[#ccc] mb-1 hover:text-white">{item}</a>
          ))}
        </div>
        <div>
          <h5 className="text-xs text-[#888] uppercase tracking-widest mb-3">Información</h5>
          {["Grabado láser", "Preguntas frecuentes", "Registrarse"].map((item) => (
            <a key={item} href="#" className="block text-sm text-[#ccc] mb-1 hover:text-white">{item}</a>
          ))}
        </div>
      </footer>
      <div className="bg-[#111] px-8 py-3 flex justify-between text-xs text-[#555]">
        <span>© 2025 Tienda Cuis · La Lucila del Mar, Buenos Aires</span>
        <span>Solo venta mayorista</span>
      </div>

    </main>
  );
}