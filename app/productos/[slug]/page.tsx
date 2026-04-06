"use client";

import { useState, useEffect } from "react";
import { useCarrito } from "../../components/CarritoContext";

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
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQR0ivhBLzhQTWPA6BeB-BKrOtD6vCHWksS4vZg_7x_l3CAiiyBx3jKOU9vKPnFH0PjIZA6G4PSFTWS/pub?gid=536049818&single=true&output=csv";

function slugify(nombre: string) {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
        return {
          id: cols[0],
          nombre: cols[1],
          precio: Number(cols[2]),
          categoria: cols[3],
          descripcion: cols[4],
          imagen: cols[5],
          activo: cols[6]?.trim() === "TRUE",
        };
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
      agregar({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
      });
    }
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  if (cargando) {
    return (
      <main className="min-h-screen bg-[#faf7f0] flex items-center justify-center">
        <p className="text-sm text-[#6b6b6b]">Cargando producto...</p>
      </main>
    );
  }

  if (!producto) {
    return (
      <main className="min-h-screen bg-[#faf7f0] flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-[#6b6b6b] mb-4">Producto no encontrado</p>
          <a href="/catalogo" className="text-sm text-[#1a5c38] font-medium hover:underline">
            ← Volver al catálogo
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf7f0]">
      <nav className="bg-white border-b border-[#e8e4db] px-8 h-14 flex items-center justify-between">
        <a href="/" className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1a5c38]">
          Tienda <span className="text-[#b8860b]">Cuis</span>
        </a>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#b8860b] bg-[#fff8e6] border border-[#e8d48a] px-2 py-1 rounded">
            Solo mayorista
          </span>
        </div>
      </nav>

      <div className="px-8 py-6">
        <a href="/catalogo" className="text-xs text-[#6b6b6b] hover:text-[#1a5c38] mb-6 inline-block">
          ← Volver al catálogo
        </a>
      </div>

      <div className="px-8 pb-16 max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
        {/* IMAGEN */}
        <div className="bg-white border border-[#e8e4db] rounded-xl flex items-center justify-center h-80 md:h-96 overflow-hidden">
          {producto.imagen ? (
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-full object-contain p-6"
            />
          ) : (
            <span className="text-7xl">🧉</span>
          )}
        </div>

        {/* INFO */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-xs text-[#6b6b6b] capitalize mb-2">
              {producto.categoria}
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a1a] mb-4 leading-tight">
              {producto.nombre}
            </h1>
            {producto.descripcion && (
              <p className="text-sm text-[#6b6b6b] leading-relaxed mb-6">
                {producto.descripcion}
              </p>
            )}
            <div className="text-3xl font-bold text-[#1a5c38] mb-8">
              ${producto.precio.toLocaleString("es-AR")}
              <span className="text-sm font-normal text-[#6b6b6b] ml-2">
                por unidad
              </span>
            </div>
          </div>

          <div>
            {/* CANTIDAD */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-[#6b6b6b]">Cantidad</span>
              <div className="flex items-center gap-2 border border-[#e8e4db] rounded-lg px-3 py-2">
                <button
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  className="text-[#6b6b6b] hover:text-[#1a5c38] w-5 text-center"
                >
                  −
                </button>
                <span className="text-sm font-medium w-8 text-center">
                  {cantidad}
                </span>
                <button
                  onClick={() => setCantidad(cantidad + 1)}
                  className="text-[#6b6b6b] hover:text-[#1a5c38] w-5 text-center"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-[#6b6b6b]">
                Subtotal:{" "}
                <strong className="text-[#1a5c38]">
                  ${(producto.precio * cantidad).toLocaleString("es-AR")}
                </strong>
              </span>
            </div>

            {/* BOTÓN */}
            <button
              onClick={handleAgregar}
              className={
                "w-full py-3 rounded-lg text-sm font-medium transition-colors " +
                (agregado
                  ? "bg-[#e8f2ec] text-[#1a5c38]"
                  : "bg-[#1a5c38] text-white hover:bg-[#154d30]")
              }
            >
              {agregado ? "¡Agregado al carrito!" : "Agregar al carrito"}
            </button>

            <a
              href={
                "https://wa.me/541123251963?text=Hola! Me interesa el " +
                encodeURIComponent(producto.nombre)
              }
              className="w-full mt-2 py-3 rounded-lg text-sm font-medium border border-[#e8e4db] text-[#6b6b6b] hover:border-[#1a5c38] hover:text-[#1a5c38] flex items-center justify-center"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
