"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useCarrito } from "./CarritoContext";

type Vista = "carrito" | "formulario" | "confirmado";

export default function CarritoDrawer() {
  const {
    items,
    quitar,
    actualizar,
    vaciar,
    total,
    cantidad,
    abierto,
    setAbierto,
  } = useCarrito();

  const [vista, setVista] = useState<Vista>("carrito");
  const [enviando, setEnviando] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    localidad: "",
  });

  const enviarPorWhatsApp = () => {
    if (items.length === 0) return;
    const lineas = items
      .map(
        (i) =>
          `- ${i.cantidad}x ${i.nombre} — $${(i.precio * i.cantidad).toLocaleString("es-AR")}`
      )
      .join("\n");
    const mensaje = `Hola! Quiero hacer un pedido mayorista:\n\n${lineas}\n\nTotal: $${total.toLocaleString("es-AR")}`;
    window.open(
      "https://wa.me/541123251963?text=" + encodeURIComponent(mensaje),
      "_blank"
    );
  };

  const enviarPorEmail = async () => {
    if (!form.nombre || !form.email) return;
    setEnviando(true);
    const detalle = items
      .map(
        (i) =>
          `${i.cantidad}x ${i.nombre} — $${(i.precio * i.cantidad).toLocaleString("es-AR")}`
      )
      .join("\n");
    try {
      await emailjs.send(
        "tiendacuis",
        "template_wpgikg7",
        {
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono || "No indicado",
          localidad: form.localidad || "No indicada",
          detalle,
          total: "$" + total.toLocaleString("es-AR"),
        },
        "hbpfSCzPkpZo0KttM"
      );
      setVista("confirmado");
      vaciar();
    } catch {
      alert("Hubo un error al enviar. Intentá por WhatsApp.");
    } finally {
      setEnviando(false);
    }
  };

  const cerrar = () => {
    setAbierto(false);
    setTimeout(() => setVista("carrito"), 300);
  };

  return (
    <>
      {abierto && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={cerrar}
        />
      )}

      <div
        className={
          "fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-xl transition-transform duration-300 " +
          (abierto ? "translate-x-0" : "translate-x-full")
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8e4db]">
          <div className="flex items-center gap-2">
            {vista === "formulario" && (
              <button
                onClick={() => setVista("carrito")}
                className="text-[#6b6b6b] hover:text-[#1a1a1a] mr-1"
              >
                ←
              </button>
            )}
            <span className="font-serif text-lg font-bold text-[#1a1a1a]">
              {vista === "carrito" && "Carrito"}
              {vista === "formulario" && "Datos del pedido"}
              {vista === "confirmado" && "Pedido enviado"}
            </span>
            {vista === "carrito" && cantidad > 0 && (
              <span className="bg-[#1a5c38] text-white text-xs px-2 py-0.5 rounded-full">
                {cantidad}
              </span>
            )}
          </div>
          <button onClick={cerrar} className="text-[#6b6b6b] hover:text-[#1a1a1a] text-xl">
            ✕
          </button>
        </div>

        {/* VISTA: CARRITO */}
        {vista === "carrito" && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <span className="text-4xl mb-3">🧉</span>
                  <p className="text-sm text-[#6b6b6b]">Tu carrito está vacío</p>
                  <button
                    onClick={cerrar}
                    className="mt-4 text-xs text-[#1a5c38] font-medium hover:underline"
                  >
                    Ver productos →
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-4 border-b border-[#f0ede8]">
                      <div className="bg-[#f5f2eb] rounded w-14 h-14 flex items-center justify-center flex-shrink-0 text-xl">
                        🧉
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1a1a1a] leading-snug mb-1 truncate">
                          {item.nombre}
                        </p>
                        <p className="text-xs text-[#6b6b6b] mb-2">
                          ${item.precio.toLocaleString("es-AR")} c/u
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => actualizar(item.id, item.cantidad - 1)}
                            className="w-6 h-6 border border-[#e8e4db] rounded text-sm text-[#6b6b6b] hover:border-[#1a5c38] hover:text-[#1a5c38] flex items-center justify-center"
                          >
                            −
                          </button>
                          <span className="text-sm font-medium w-6 text-center">
                            {item.cantidad}
                          </span>
                          <button
                            onClick={() => actualizar(item.id, item.cantidad + 1)}
                            className="w-6 h-6 border border-[#e8e4db] rounded text-sm text-[#6b6b6b] hover:border-[#1a5c38] hover:text-[#1a5c38] flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => quitar(item.id)}
                          className="text-xs text-[#6b6b6b] hover:text-red-500"
                        >
                          ✕
                        </button>
                        <p className="text-sm font-bold text-[#1a5c38]">
                          ${(item.precio * item.cantidad).toLocaleString("es-AR")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-5 py-4 border-t border-[#e8e4db]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-[#6b6b6b]">Total</span>
                  <span className="text-lg font-bold text-[#1a5c38]">
                    ${total.toLocaleString("es-AR")}
                  </span>
                </div>
                <button
                  onClick={enviarPorWhatsApp}
                  className="w-full bg-[#25d366] text-white text-sm font-medium py-3 rounded-lg hover:bg-[#1fb956] mb-2"
                >
                  Enviar por WhatsApp
                </button>
                <button
                  onClick={() => setVista("formulario")}
                  className="w-full border border-[#e8e4db] text-[#6b6b6b] text-sm py-3 rounded-lg hover:border-[#1a5c38] hover:text-[#1a5c38] mb-2"
                >
                  Hacer pedido por email
                </button>
                <button
                  onClick={vaciar}
                  className="w-full text-xs text-[#6b6b6b] hover:text-red-500 py-1"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </>
        )}

        {/* VISTA: FORMULARIO */}
        {vista === "formulario" && (
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <p className="text-xs text-[#6b6b6b] mb-4">
              Completá tus datos y te contactamos para confirmar el pedido.
            </p>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-[#6b6b6b] mb-1 block">
                  Nombre y apellido *
                </label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full border border-[#e8e4db] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a5c38]"
                  placeholder="Juan García"
                />
              </div>
              <div>
                <label className="text-xs text-[#6b6b6b] mb-1 block">
                  Email *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-[#e8e4db] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a5c38]"
                  placeholder="juan@ejemplo.com"
                />
              </div>
              <div>
                <label className="text-xs text-[#6b6b6b] mb-1 block">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  className="w-full border border-[#e8e4db] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a5c38]"
                  placeholder="11 1234 5678"
                />
              </div>
              <div>
                <label className="text-xs text-[#6b6b6b] mb-1 block">
                  Localidad
                </label>
                <input
                  type="text"
                  value={form.localidad}
                  onChange={(e) => setForm({ ...form, localidad: e.target.value })}
                  className="w-full border border-[#e8e4db] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a5c38]"
                  placeholder="Buenos Aires"
                />
              </div>

              <div className="bg-[#f5f2eb] rounded p-3 mt-1">
                <p className="text-xs text-[#6b6b6b] mb-2 font-medium">
                  Resumen del pedido
                </p>
                {items.map((i) => (
                  <div key={i.id} className="flex justify-between text-xs text-[#1a1a1a] mb-1">
                    <span>{i.cantidad}x {i.nombre}</span>
                    <span>${(i.precio * i.cantidad).toLocaleString("es-AR")}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm font-bold text-[#1a5c38] mt-2 pt-2 border-t border-[#e8e4db]">
                  <span>Total</span>
                  <span>${total.toLocaleString("es-AR")}</span>
                </div>
              </div>

              <button
                onClick={enviarPorEmail}
                disabled={enviando || !form.nombre || !form.email}
                className="w-full bg-[#1a5c38] text-white text-sm font-medium py-3 rounded-lg hover:bg-[#154d30] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {enviando ? "Enviando..." : "Confirmar pedido"}
              </button>
            </div>
          </div>
        )}

        {/* VISTA: CONFIRMADO */}
        {vista === "confirmado" && (
          <div className="flex-1 flex flex-col items-center justify-center px-5 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-2">
              Pedido enviado
            </h3>
            <p className="text-sm text-[#6b6b6b] mb-6">
              Recibimos tu pedido. Te vamos a contactar pronto para confirmar y coordinar el envío.
            </p>
            <button
              onClick={cerrar}
              className="bg-[#1a5c38] text-white text-sm px-6 py-2.5 rounded-lg hover:bg-[#154d30]"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
