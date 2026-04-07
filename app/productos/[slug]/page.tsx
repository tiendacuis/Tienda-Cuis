"use client";

import { useState, useEffect } from "react";
import { useCarrito } from "../../components/CarritoContext";

const LOGO_NEGRO = "https://tiendacuis.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-06-at-6.57.16-PM.jpeg";

type Producto = {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion: string;
  imagen: string;
  activo: boolean;
};

const URL_SHEET =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSwYgDLYIoWa51tr5CppwEtnF864vXU5su5UpQmae7rcbOc8OLH-26i8WsXXR4LvpbfK9HJYlYDAlfO/pub?gid=1201411934&single=true&output=csv";

function slugify(nombre: string) {
  return nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function ProductoPage({ params }: { params: Promise<{ slug: string }> }) {
  const [producto, setProducto] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);
  const { agregar } = useCarrito();

  useEffect(() => {
    const cargar = async () => {
      const { slug } = await params;
      const res = await fetch(URL_SHEET);
      const text = await res.text();
      const rows = text.trim().split("\n").slice(1);
      const productos = rows.map((row) => {
        const cols = row.split(",");
        return { id: cols[0], nombre: cols[1], precio: Number(cols[2]), categoria: cols[3], descripcion: cols[4], imagen: cols[5], activo: cols[6]?.trim() === "TRUE" };
      });
      const encontrado = productos.find((p) => slugify(p.nombre) === slug);
      setProducto(encontrado || null);
      setCargando(false);
    };
    cargar();
  }, [params]);

  const handleAgregar = () => {
    if (!producto) return;
    for (let i = 0; i < cantidad; i++) {
      agregar({ id: producto.id, nombre: producto.nombre, precio: producto.precio });
    }
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  if (cargando) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <p className="text-sm text-[#6b6b6b] font-light">Cargando producto...</p>
      </main>
    );
  }

  if (!producto) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-[#6b6b6b] mb-4 font-light">Producto no encontrado</p>
          <a href="/catalogo" className="text-sm text-[#E8673A] font-medium hover:underline">← Volver al catálogo</a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* NAV */}
      <nav className="bg-white border-b border-[#E8E4DB] px-8 h-14 flex items-center justify-between">
        <a href="/">
          <img src={LOGO_NEGRO} alt="Tienda Cuis" className="h-8 w-auto object-contain" />
        </a>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#6b6b6b] bg-[#F0EDE8] px-3 py-1 rounded-sm tracking-wide">Solo mayorista</span>
        </div>
      </nav>

      <div className="px-8 py-5">
        <a href="/catalogo" className="text-xs text-[#6b6b6b] hover:text-[#E8673A] transition-colors">← Volver al catálogo</a>
      </div>

      <div className="px-8 pb-16 max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
        {/* IMAGEN */}
        <div className="bg-white border border-[#E8E4DB] rounded flex items-center justify-center h-80 md:h-96 overflow-hidden">
          {producto.imagen ? (
            <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-contain p-6" />
          ) : (
            <img src={LOGO_NEGRO} alt="" className="w-20 h-auto opacity-10" />
          )}
        </div>

        {/* INFO */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[2px] text-[#9BA88D] mb-2">{producto.categoria}</p>
            <h1 className="text-3xl font-light text-[#1A1A1A] mb-4 leading-tight tracking-tight">{producto.nombre}</h1>
            {producto.descripcion && (
              <p className="text-sm text-[#6b6b6b] leading-relaxed mb-6 font-light">{producto.descripcion}</p>
            )}
            <div className="mb-8">
              <span className="text-3xl font-medium text-[#2D2B45]">${producto.precio.toLocaleString("es-AR")}</span>
              <span className="text-sm font-light text-[#6b6b6b] ml-2">por unidad</span>
            </div>
          </div>

          <div>
            {/* CANTIDAD */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-[#6b6b6b] font-light">Cantidad</span>
              <div className="flex items-center gap-2 border border-[#E8E4DB] rounded-sm px-3 py-2">
                <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="text-[#6b6b6b] hover:text-[#2D2B45] w-5 text-center">−</button>
                <span className="text-sm font-medium w-8 text-center">{cantidad}</span>
                <button onClick={() => setCantidad(cantidad + 1)} className="text-[#6b6b6b] hover:text-[#2D2B45] w-5 text-center">+</button>
              </div>
              <span className="text-sm text-[#6b6b6b] font-light">
                Subtotal: <strong className="text-[#2D2B45] font-medium">${(producto.precio * cantidad).toLocaleString("es-AR")}</strong>
              </span>
            </div>

            <button
              onClick={handleAgregar}
              className={"w-full py-3 rounded-sm text-sm font-medium transition-colors " + (agregado ? "bg-[#F2C4A8] text-[#C4522C]" : "bg-[#E8673A] text-white hover:bg-[#C4522C]")}
            >
              {agregado ? "¡Agregado al carrito!" : "Agregar al carrito"}
            </button>

            <a
              href={"https://wa.me/541123251963?text=Hola! Me interesa el " + encodeURIComponent(producto.nombre)}
              className="w-full mt-2 py-3 rounded-sm text-sm font-light border border-[#E8E4DB] text-[#6b6b6b] hover:border-[#2D2B45] hover:text-[#2D2B45] flex items-center justify-center transition-colors"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}