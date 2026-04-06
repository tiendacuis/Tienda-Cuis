"use client";

import { useState, useEffect } from "react";
import { useCarrito } from "../components/CarritoContext";

type Producto = {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion: string;
  imagen: string;
  activo: boolean;
};

const categorias = [
  { slug: "todos", label: "Todos" },
  { slug: "mates", label: "Mates" },
  { slug: "bombillas", label: "Bombillas" },
  { slug: "vasos", label: "Vasos" },
  { slug: "complementos", label: "Materos y Yerberos" },
  { slug: "souvenirs", label: "Souvenirs" },
];

const URL_SHEET =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSwYgDLYIoWa51tr5CppwEtnF864vXU5su5UpQmae7rcbOc8OLH-26i8WsXXR4LvpbfK9HJYlYDAlfO/pub?gid=1201411934&single=true&output=csv";

function slugify(nombre: string) {
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
  const [agregados, setAgregados] = useState<Record<string, boolean>>({});
  const { agregar, setAbierto } = useCarrito();

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
            descripcion: cols[4],
            imagen: cols[5],
            activo: cols[6]?.trim() === "TRUE",
          };
        });
        setProductos(data.filter((p) => p.activo));
      });
  }, []);

  const filtrados =
    categoriaActiva === "todos"
      ? productos
      : productos.filter((p) => p.categoria === categoriaActiva);

  const handleAgregar = (e: React.MouseEvent, producto: Producto) => {
    e.preventDefault();
    e.stopPropagation();
    agregar({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
    });
    setAgregados((prev) => ({ ...prev, [producto.id]: true }));
    setTimeout(() => {
      setAgregados((prev) => ({ ...prev, [producto.id]: false }));
    }, 1500);
  };

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
          <button
            onClick={() => setAbierto(true)}
            className="bg-[#1a5c38] text-white text-xs px-4 py-2 rounded font-medium hover:bg-[#154d30]"
          >
            Ver carrito
          </button>
        </div>
      </nav>

      <div className="px-8 py-10">
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a1a] mb-2">
          Nuestros productos
        </h1>
        <p className="text-sm text-[#6b6b6b] mb-8">
          {filtrados.length} productos disponibles
        </p>

        <div className="flex gap-2 flex-wrap mb-8">
          {categorias.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setCategoriaActiva(cat.slug)}
              className={
                "text-xs px-4 py-2 rounded-full border transition-colors " +
                (categoriaActiva === cat.slug
                  ? "bg-[#1a5c38] text-white border-[#1a5c38]"
                  : "bg-white text-[#6b6b6b] border-[#e8e4db] hover:border-[#1a5c38] hover:text-[#1a5c38]")
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtrados.map((producto) => (
            <a
              key={producto.id}
              href={"/productos/" + slugify(producto.nombre)}
              className="bg-white border border-[#e8e4db] rounded-lg overflow-hidden hover:border-[#b8d4c4] transition-colors block"
            >
              <div className="bg-white h-48 flex items-center justify-center overflow-hidden">
  {producto.imagen ? (
    <img
      src={producto.imagen}
      alt={producto.nombre}
      className="w-full h-full object-contain p-4"
    />
                ) : (
                  <span className="text-4xl">🧉</span>
                )}
              </div>
              <div className="p-4">
                <p className="text-xs text-[#6b6b6b] capitalize mb-1">
                  {producto.categoria}
                </p>
                <h3 className="text-sm font-medium text-[#1a1a1a] leading-snug mb-3">
                  {producto.nombre}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-[#1a5c38]">
                    ${producto.precio.toLocaleString("es-AR")}
                  </span>
                  <button
                    onClick={(e) => handleAgregar(e, producto)}
                    className={
                      "text-xs px-3 py-1.5 rounded transition-colors " +
                      (agregados[producto.id]
                        ? "bg-[#e8f2ec] text-[#1a5c38] font-medium"
                        : "bg-[#1a5c38] text-white hover:bg-[#154d30]")
                    }
                  >
                    {agregados[producto.id] ? "Agregado!" : "Agregar"}
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
