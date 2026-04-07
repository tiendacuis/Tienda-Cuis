"use client";

import { useState, useEffect } from "react";
import FaqHome from "./components/FaqHome";

const URL_SHEET =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSwYgDLYIoWa51tr5CppwEtnF864vXU5su5UpQmae7rcbOc8OLH-26i8WsXXR4LvpbfK9HJYlYDAlfO/pub?gid=1201411934&single=true&output=csv";

const IDS_DESTACADOS = ["2", "11", "71", "86"];

function slugify(nombre: string) {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type Producto = {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  imagen: string;
};

export default function Home() {
  const [destacados, setDestacados] = useState<Producto[]>([]);

  useEffect(() => {
    fetch(URL_SHEET)
      .then((r) => r.text())
      .then((text) => {
        const rows = text.trim().split("\n").slice(1);
        const data = rows.map((row) => {
          const cols = row.split(",");
          return {
            id: cols[0],
            nombre: cols[1],
            precio: Number(cols[2]),
            categoria: cols[3],
            imagen: cols[5],
          };
        });
        const filtrados = IDS_DESTACADOS.map((id) =>
          data.find((p) => p.id === id)
        ).filter(Boolean) as Producto[];
        setDestacados(filtrados);
      });
  }, []);

  return (
    <main className="min-h-screen bg-[#FAF8F5] font-[family-name:var(--font-dm-sans)]">

      {/* NAV */}
      <nav className="bg-white border-b border-[#E8E4DB] px-8 h-14 flex items-center justify-between">
        <a href="/">
          <span className="text-sm font-medium text-[#1A1A1A] tracking-[3px] uppercase">Tienda Cuis</span>
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
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-[#2D2B45] px-8 py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-xs text-white/40 uppercase tracking-[3px] mb-4">
            Mayorista de artículos regionales
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-white leading-tight mb-5 tracking-tight">
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
            { label: "Bajo Mínimo de compra", value: "Comprá desde $80.000 y accedé a precios mayoristas reales" },
            { label: "Stock listo para vender sin esperar", value: "Envíos por Correo Argentino y Via Cargo" },
            { label: "Personalizá y diferenciá tu negocio", value: "Grabado láser de bombillas, mates y termos" },
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

      {/* DESCUENTOS POR VOLUMEN */}
      <section className="bg-[#2D2B45] px-8 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[2.5px] text-white/40 font-medium mb-2">Beneficios mayoristas</p>
          <h2 className="text-xl font-light text-white mb-4 tracking-tight">
            Mientras más comprás, más ahorrás
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { rango: "Hasta $500.000", descuento: "Precio base", color: "bg-white/5" },
              { rango: "$500.000 – $1.000.000", descuento: "5% de descuento", color: "bg-[#E8673A]/20" },
              { rango: "$1.000.000 – $2.000.000", descuento: "10% de descuento", color: "bg-[#E8673A]/30" },
              { rango: "Más de $2.000.000", descuento: "12,5% de descuento", color: "bg-[#E8673A]/40" },
            ].map((item) => (
              <div key={item.rango} className={item.color + " border border-white/10 rounded p-3 text-center"}>
                <p className="text-xs text-white/50 font-light mb-1">{item.rango}</p>
                <p className="text-sm font-medium text-white">{item.descuento}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/35 mt-4 font-light">
            Cuanto más comprás, mayor es tu ganancia.
          </p>
          <a
            href="/catalogo"
            className="inline-block mt-5 text-sm text-white/70 border-b border-white/20 hover:text-white hover:border-white/50 transition-colors pb-0.5"
          >
            Empezá a armar tu pedido y desbloqueá los descuentos →
          </a>
        </div>
      </section>

      {/* MÁS VENDIDOS */}
      {destacados.length > 0 && (
        <section className="px-8 py-14 bg-white">
          <p className="text-xs uppercase tracking-[2.5px] text-[#9BA88D] font-medium mb-2">Destacados</p>
          <h2 className="text-3xl font-light text-[#1A1A1A] mb-1 tracking-tight">Más vendidos</h2>
          <p className="text-sm text-[#6b6b6b] mb-8 font-light">Los productos que más eligen nuestros clientes.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {destacados.map((producto) => (
              <a
                key={producto.id}
                href={"/productos/" + slugify(producto.nombre)}
                className="bg-[#FAF8F5] border border-[#E8E4DB] rounded overflow-hidden hover:border-[#9BA88D] transition-colors block group"
              >
                <div className="bg-white h-40 md:h-48 flex items-center justify-center overflow-hidden border-b border-[#E8E4DB]">
                  {producto.imagen ? (
                    <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-contain p-3" />
                  ) : (
                    <span className="text-xs text-[#E8E4DB] font-medium tracking-widest uppercase">TC</span>
                  )}
                </div>
                <div className="p-3 md:p-4">
                  <p className="text-[10px] uppercase tracking-[1.5px] text-[#9BA88D] mb-1">{producto.categoria}</p>
                  <h3 className="text-xs md:text-sm font-medium text-[#1A1A1A] leading-snug mb-2">{producto.nombre}</h3>
                  <span className="text-sm md:text-base font-medium text-[#2D2B45]">
                    ${producto.precio.toLocaleString("es-AR")}
                  </span>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="/catalogo" className="text-sm text-[#E8673A] font-medium hover:underline">
              Ver todos los productos →
            </a>
          </div>
        </section>
      )}

      {/* CATEGORÍAS */}
      <section className="px-8 py-14">
        <p className="text-xs uppercase tracking-[2.5px] text-[#9BA88D] font-medium mb-2">Catálogo</p>
        <h2 className="text-3xl font-light text-[#1A1A1A] mb-1 tracking-tight">Todas las categorías</h2>
        <p className="text-sm text-[#6b6b6b] mb-8 font-light">Artículos regionales para tiendas de souvenirs y emprendedores.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { num: "01", title: "Mates", desc: "Imperiales, camioneros, térmicos, algarrobo, palo santo y más.", count: "+25 productos", href: "/catalogo?categoria=mates" },
            { num: "02", title: "Bombillas", desc: "Pico de loro, chata, estribo, resorte. Todos los estilos.", count: "+15 productos", href: "/catalogo?categoria=bombillas" },
            { num: "03", title: "Vasos y Chops", desc: "Aluminio grabado, fernetero, refrigerante.", count: "+10 productos", href: "/catalogo?categoria=vasos" },
            { num: "04", title: "Materos y Yerberos", desc: "Latas, canastas eco cuero, porta termos.", count: "+8 productos", href: "/catalogo?categoria=complementos" },
            { num: "05", title: "Combos Emprendedores", desc: "Kits con descuento para armar el negocio desde cero.", count: "Oferta", href: "/catalogo?categoria=combos" },
            { num: "06", title: "Grabado Láser", desc: "Personalización sobre pedido. Virolas, bombillas, mates y más.", count: "Servicio", href: "/grabado" },
          ].map((cat) => (
            <a key={cat.title} href={cat.href} className="bg-white border border-[#E8E4DB] rounded p-4 md:p-5 hover:border-[#9BA88D] transition-colors group">
              <div className="flex items-start justify-between mb-2">
                <div className="text-3xl md:text-4xl font-light text-[#E8E4DB] leading-none tracking-tight">{cat.num}</div>
                <span className="text-xs text-[#6b6b6b] bg-[#F5F2EC] px-2 py-0.5 rounded-sm mt-1">{cat.count}</span>
              </div>
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
            Ideal para souvenirs de localidad, regalos corporativos y recuerdos de eventos. Pedido mínimo accesible.
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
        <div className="grid grid-cols-2 gap-3 mt-6 md:mt-0">
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
          <span className="text-sm font-medium text-white tracking-[3px] uppercase block mb-3">Tienda Cuis</span>
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