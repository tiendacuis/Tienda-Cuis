"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

type FormData = {
  nombre: string;
  email: string;
  telefono: string;
  producto: string;
  cantidad: string;
  texto: string;
  notas: string;
};

const productos = [
  "Virola de mate",
  "Bombilla",
  "Mate de aluminio",
  "Mate de algarrobo",
  "Termo",
  "Chop de aluminio",
  "Otro",
];

const fotos = [
  "https://tiendacuis.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-06-at-4.05.10-PM.jpeg",
  "https://tiendacuis.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-06-at-4.05.09-PM.jpeg",
  "https://tiendacuis.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-06-at-4.06.24-PM.jpeg",
  "https://tiendacuis.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-06-at-4.10.14-PM.jpeg",
  "https://tiendacuis.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-06-at-4.09.46-PM.jpeg",
  "https://tiendacuis.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-06-at-4.11.29-PM.jpeg",
];

export default function GrabadoPage() {
  const [form, setForm] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    producto: "",
    cantidad: "",
    texto: "",
    notas: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = async () => {
    if (!form.nombre || !form.email || !form.producto || !form.cantidad) return;
    setEnviando(true);
    try {
      await emailjs.send(
        "tiendacuis",
        "template_wpgikg7",
        {
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono || "No indicado",
          localidad: "—",
          detalle: `Producto: ${form.producto}\nCantidad: ${form.cantidad}\nTexto a grabar: ${form.texto || "Ver adjunto/consultar"}\nNotas: ${form.notas || "Ninguna"}`,
          total: "A presupuestar",
        },
        "hbpfSCzPkpZo0KttM"
      );
      setEnviado(true);
    } catch {
      alert("Hubo un error al enviar. Intentá por WhatsApp.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf7f0]">
      <nav className="bg-white border-b border-[#e8e4db] px-8 h-14 flex items-center justify-between">
        <a href="/" className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1a5c38]">
          Tienda <span className="text-[#b8860b]">Cuis</span>
        </a>
        <div className="flex items-center gap-3">
          <a href="/catalogo" className="text-sm text-[#6b6b6b] hover:text-[#1a5c38]">
            Ver catálogo
          </a>
          <a
            href="https://wa.me/541123251963"
            className="bg-[#1a5c38] text-white text-xs px-4 py-2 rounded font-medium hover:bg-[#154d30]"
          >
            WhatsApp
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-[#1a5c38] px-8 py-16 text-center">
        <p className="text-xs text-white/60 uppercase tracking-widest mb-3">
          Servicio mayorista
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white mb-4">
          Grabado láser personalizado
        </h1>
        <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-8">
          Personalizamos mates, bombillas, termos y más con tu logo o texto.
          Ideal para souvenirs, regalos corporativos y eventos. Mínimos accesibles.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href="#formulario"
            className="bg-[#d4aa4a] text-[#1a1a1a] text-sm px-6 py-3 rounded font-medium hover:bg-[#c49a3a]"
          >
            Solicitar presupuesto
          </a>
          <a
            href="https://wa.me/541123251963?text=Hola! Quiero consultar sobre grabado láser personalizado"
            className="border border-white/30 text-white/85 text-sm px-6 py-3 rounded hover:bg-white/10"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </section>

      {/* CARACTERÍSTICAS */}
      <section className="bg-white border-b border-[#e8e4db] px-8 py-10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { titulo: "Grabado vectorial", desc: "Alta precisión y detalle en cada pieza" },
            { titulo: "Acero · Aluminio · Alpaca", desc: "Trabajamos sobre los materiales más usados" },
            { titulo: "Logo o texto", desc: "Tu diseño o el que necesites" },
            { titulo: "Mínimos accesibles", desc: "Pedidos desde pocas unidades" },
          ].map((item) => (
            <div key={item.titulo} className="text-center">
              <h3 className="text-sm font-medium text-[#1a5c38] mb-1">{item.titulo}</h3>
              <p className="text-xs text-[#6b6b6b] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      

      {/* GALERÍA */}
      <section className="bg-[#f5f2eb] px-8 py-14">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[#b8860b] font-medium mb-2">
            Trabajos realizados
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {fotos.map((foto, i) => (
              <div
                key={i}
                className="bg-white border border-[#e8e4db] rounded-lg h-52 overflow-hidden"
              >
                <img
                  src={foto}
                  alt={"Ejemplo de grabado láser " + (i + 1)}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section id="formulario" className="px-8 py-14 max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-[#b8860b] font-medium mb-2">
          Contacto
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1a1a1a] mb-2">
          Solicitá tu presupuesto
        </h2>
        <p className="text-sm text-[#6b6b6b] mb-8">
          Completá el formulario y te respondemos en menos de 24 horas.
        </p>

        {enviado ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1a1a1a] mb-2">
              Consulta enviada
            </h3>
            <p className="text-sm text-[#6b6b6b]">
              Te contactamos pronto con el presupuesto.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#6b6b6b] mb-1 block">Nombre *</label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full border border-[#e8e4db] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a5c38]"
                  placeholder="Juan García"
                />
              </div>
              <div>
                <label className="text-xs text-[#6b6b6b] mb-1 block">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-[#e8e4db] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a5c38]"
                  placeholder="juan@ejemplo.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#6b6b6b] mb-1 block">Teléfono</label>
                <input
                  type="tel"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  className="w-full border border-[#e8e4db] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a5c38]"
                  placeholder="11 1234 5678"
                />
              </div>
              <div>
                <label className="text-xs text-[#6b6b6b] mb-1 block">Cantidad *</label>
                <input
                  type="number"
                  value={form.cantidad}
                  onChange={(e) => setForm({ ...form, cantidad: e.target.value })}
                  className="w-full border border-[#e8e4db] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a5c38]"
                  placeholder="Ej: 50"
                  min="1"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-[#6b6b6b] mb-1 block">Producto a grabar *</label>
              <select
                value={form.producto}
                onChange={(e) => setForm({ ...form, producto: e.target.value })}
                className="w-full border border-[#e8e4db] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a5c38] bg-white"
              >
                <option value="">Seleccioná un producto</option>
                {productos.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-[#6b6b6b] mb-1 block">Texto a grabar</label>
              <input
                type="text"
                value={form.texto}
                onChange={(e) => setForm({ ...form, texto: e.target.value })}
                className="w-full border border-[#e8e4db] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a5c38]"
                placeholder="Ej: nombre, frase, localidad..."
              />
            </div>
            <div>
              <label className="text-xs text-[#6b6b6b] mb-1 block">Notas adicionales</label>
              <textarea
                value={form.notas}
                onChange={(e) => setForm({ ...form, notas: e.target.value })}
                className="w-full border border-[#e8e4db] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a5c38] resize-none"
                rows={3}
                placeholder="Logo, diseño especial, urgencia, etc."
              />
            </div>
            <button
              onClick={handleEnviar}
              disabled={enviando || !form.nombre || !form.email || !form.producto || !form.cantidad}
              className="w-full bg-[#1a5c38] text-white text-sm font-medium py-3 rounded-lg hover:bg-[#154d30] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {enviando ? "Enviando..." : "Solicitar presupuesto"}
            </button>
            <p className="text-xs text-[#6b6b6b] text-center">
              También podés escribirnos por{" "}
              <a
                href="https://wa.me/541123251963?text=Hola! Quiero consultar sobre grabado láser"
                className="text-[#1a5c38] hover:underline"
              >
                WhatsApp
              </a>
            </p>
          </div>
        )}
      </section>

      <footer className="bg-[#1a1a1a] px-8 py-8 text-center">
        <span className="font-[family-name:var(--font-playfair)] text-lg font-bold text-white">
          Tienda <span className="text-[#d4aa4a]">Cuis</span>
        </span>
        <p className="text-xs text-[#888] mt-2">
          La Lucila del Mar, Buenos Aires · Solo venta mayorista
        </p>
      </footer>
    </main>
  );
}
