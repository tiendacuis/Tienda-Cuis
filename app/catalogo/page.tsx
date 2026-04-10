"use client";

import { useState, useEffect } from "react";
import { useCarrito } from "../components/CarritoContext";

const URL_SHEET =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSwYgDLYIoWa51tr5CppwEtnF864vXU5su5UpQmae7rcbOc8OLH-26i8WsXXR4LvpbfK9HJYlYDAlfO/pub?gid=1201411934&single=true&output=csv";

type Producto = {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion: string;
  imagen: string;
  activo: boolean;
  destacado: boolean;
};

const categorias = [
  { slug: "todos", label: "Todos" },
  { slug: "mates", label: "Mates" },
  { slug: "bombillas", label: "Bombillas" },
  { slug: "vasos", label: "Vasos" },
  { slug: "complementos", label: "Materos" },
  { slug: "souvenirs", label: "Souvenirs" },
];

function slugify(nombre: string) {
  if (!nombre) return "";
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function Catalogo() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [orden, setOrden] = useState("default");
  const [busqueda, setBusqueda] = useState("");
  const [agregados, setAgregados] = useState<Record<string, boolean>>({});
  const { agregar, setAbierto, total, cantidad } = useCarrito();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("categoria");
    if (cat) setCategoriaActiva(cat);

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
            descripcion: cols[4],
            imagen: cols[5],
            activo: cols[6]?.trim() === "TRUE",
            destacado: cols[7]?.trim() === "TRUE",
          };
        });
        setProductos(data.filter((p) => p.activo && p.nombre));
      });
  }, []);

  const filtrados = productos
    .filter((p) => categoriaActiva === "todos" || p.categoria === categoriaActiva)
    .filter((p) => {
      if (!busqueda.trim()) return true;
      const q = busqueda.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const nombre = p.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return nombre.includes(q);
    })
    .sort((a, b) => {
      if (orden === "precio-asc") return a.precio - b.precio;
      if (orden === "precio-desc") return b.precio - a.precio;
      if (orden === "nombre") return a.nombre.localeCompare(b.nombre);
      if (a.destacado && !b.destacado) return -1;
      if (!a.destacado && b.destacado) return 1;
      return 0;
    });

  const handleAgregar = (e: React.MouseEvent, producto: Producto) => {
    e.preventDefault();
    e.stopPropagation();
    agregar({ id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen });
    setAgregados((prev) => ({ ...prev, [producto.id]: true }));
    setTimeout(() => setAgregados((prev) => ({ ...prev, [producto.id]: false })), 1500);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <nav className="bg-white border-b border-[#E8E4DB] px-4 md:px-8 h-14 flex items-center justify-between">
        <a href="/">
          <span className="text-sm font-medium text-[#1A1A1A] tracking-[3px] uppercase">Tienda Cuis</span>
        </a>
        <div className="flex items-center gap-2 md:gap-3">
          <span className="hidden md:block text-xs text-[#6b6b6b] bg-[#F0EDE8] px-3 py-1 rounded-sm tracking-wide">
            Solo mayorista
          </span>
          <button
            onClick={() => setAbierto(true)}
            className="bg-[#E8673A] text-white text-xs px-3 md:px-4 py-2 rounded-sm font-medium hover:bg-[#C4522C] transition-colors"
          >
            {cantidad > 0 ? `Carrito · $${total.toLocaleString("es-AR")}` : "Ver carrito"}
          </button>
        </div>
      </nav>

      <div className="px-4 md:px-8 py-6 md:py-10">
        <p className="text-xs uppercase tracking-[2.5px] text-[#9BA88D] font-medium mb-2">Catálogo</p>
        <h1 className="text-2xl md:text-3xl font-light text-[#1A1A1A] mb-1 tracking-tight">Nuestros productos</h1>
        <p className="text-sm text-[#6b6b6b] mb-6 font-light">{filtrados.length} productos disponibles</p>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-2 mb-8">
          <div className="flex gap-2 flex-shrink-0">
            {categorias.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setCategoriaActiva(cat.slug)}
                className={
                  "text-xs px-3 py-2 rounded-sm border transition-colors whitespace-nowrap " +
                  (categoriaActiva === cat.slug
                    ? "bg-[#2D2B45] text-white border-[#2D2B45]"
                    : "bg-white text-[#6b6b6b] border-[#E8E4DB] hover:border-[#9BA88D]")
                }
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="relative flex-1 min-w-0">
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full border border-[#E8E4DB] rounded-sm pl-7 pr-6 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#2D2B45] bg-white"
            />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#9BA88D] text-xs">🔍</span>
            {busqueda && (
              <button onClick={() => setBusqueda("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9BA88D] hover:text-[#1A1A1A] text-xs">✕</button>
            )}
          </div>
          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            className="text-xs px-2 py-2 rounded-sm border border-[#E8E4DB] bg-white text-[#6b6b6b] focus:outline-none focus:border-[#2D2B45] cursor-pointer flex-shrink-0"
          >
            <option value="default">Destacados primero</option>
            <option value="precio-asc">Menor precio</option>
            <option value="precio-desc">Mayor precio</option>
            <option value="nombre">A-Z</option>
          </select>
        </div>

        {/* MOBILE */}
        <div className="md:hidden mb-6">
          <div className="overflow-x-auto mb-3">
            <div className="flex gap-2 pb-1 min-w-max">
              {categorias.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setCategoriaActiva(cat.slug)}
                  className={
                    "text-xs px-3 py-2 rounded-sm border transition-colors whitespace-nowrap " +
                    (categoriaActiva === cat.slug
                      ? "bg-[#2D2B45] text-white border-[#2D2B45]"
                      : "bg-white text-[#6b6b6b] border-[#E8E4DB]")
                  }
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar..."
                className="w-full border border-[#E8E4DB] rounded-sm pl-7 pr-6 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#2D2B45] bg-white"
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#9BA88D] text-xs">🔍</span>
              {busqueda && (
                <button onClick={() => setBusqueda("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9BA88D] text-xs">✕</button>
              )}
            </div>
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              className="text-xs px-2 py-2 rounded-sm border border-[#E8E4DB] bg-white text-[#6b6b6b] focus:outline-none cursor-pointer flex-shrink-0"
            >
              <option value="default">Destacados primero</option>
              <option value="precio-asc">Menor precio</option>
              <option value="precio-desc">Mayor precio</option>
              <option value="nombre">A-Z</option>
            </select>
          </div>
        </div>

        {filtrados.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-[#6b6b6b] font-light mb-2">No encontramos productos para "{busqueda}"</p>
            <button onClick={() => { setBusqueda(""); setCategoriaActiva("todos"); }} className="text-xs text-[#E8673A] font-medium hover:underline">
              Ver todos los productos →
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtrados.map((producto) => (
            <a
              key={producto.id}
              href={"/productos/" + slugify(producto.nombre)}
              className="bg-white border border-[#E8E4DB] rounded overflow-hidden hover:border-[#9BA88D] transition-colors block group"
            >
              <div className="bg-white h-36 md:h-48 flex items-center justify-center overflow-hidden border-b border-[#E8E4DB]">
                {producto.imagen ? (
                  <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-contain p-3 md:p-4" />
                ) : (
                  <span className="text-xs text-[#E8E4DB] font-medium tracking-widest uppercase">TC</span>
                )}
              </div>
              <div className="p-3 md:p-4">
                <p className="text-[10px] uppercase tracking-[1.5px] text-[#9BA88D] mb-1">{producto.categoria}</p>
                <h3 className="text-xs md:text-sm font-medium text-[#1A1A1A] leading-snug mb-2 line-clamp-2">{producto.nombre}</h3>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-sm font-medium text-[#2D2B45]">${producto.precio.toLocaleString("es-AR")}</span>
                  <button
                    onClick={(e) => handleAgregar(e, producto)}
                    className={
                      "text-xs px-2 md:px-3 py-1.5 rounded-sm transition-colors flex-shrink-0 " +
                      (agregados[producto.id]
                        ? "bg-[#F2C4A8] text-[#C4522C] font-medium"
                        : "bg-[#E8673A] text-white hover:bg-[#C4522C]")
                    }
                  >
                    {agregados[producto.id] ? "✓" : "Agregar"}
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}