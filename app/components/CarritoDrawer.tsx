"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useCarrito } from "./CarritoContext";

  import { supabase } from "@/lib/supabase";

type Vista = "carrito" | "formulario" | "confirmado";

const MINIMO = 80000;

const TRAMOS = [
  { desde: 0, hasta: 500000, descuento: 0, label: "Precio normal" },
  { desde: 500000, hasta: 1000000, descuento: 5, label: "5% de descuento" },
  { desde: 1000000, hasta: 2000000, descuento: 10, label: "10% de descuento" },
  { desde: 2000000, hasta: Infinity, descuento: 12.5, label: "12,5% de descuento" },
];

function getTramo(total: number) {
  return TRAMOS.find((t) => total >= t.desde && total < t.hasta) || TRAMOS[TRAMOS.length - 1];
}

function getProximoTramo(total: number) {
  return TRAMOS.find((t) => t.desde > total) || null;
}

function dispararConversion() {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", "conversion", {
      send_to: "AW-10794736685/gl9wCOXJ15gcEK24qpso",
      transaction_id: "",
    });
  }
}
function BarraProgreso({ total }: { total: number }) {
  if (total === 0) return null;
  const llegaAlMinimo = total >= MINIMO;
  const tramo = getTramo(total);
  const proximo = getProximoTramo(total);

  if (!llegaAlMinimo) {
    const progreso = Math.round((total / MINIMO) * 100);
    const falta = MINIMO - total;
    return (
      <div className="bg-[#FAF8F5] border border-[#E8E4DB] rounded p-3 mb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-[#2D2B45]">Mínimo de compra</span>
          <span className="text-xs text-[#6b6b6b] font-light">{progreso}%</span>
        </div>
        <div className="w-full bg-[#E8E4DB] rounded-full h-2 mb-2">
          <div className="h-2 rounded-full transition-all duration-500 bg-[#9BA88D]" style={{ width: progreso + "%" }} />
        </div>
        <p className="text-xs text-[#6b6b6b] font-light">
          Te faltan <strong className="text-[#2D2B45] font-medium">${falta.toLocaleString("es-AR")}</strong> para habilitar el pedido
        </p>
      </div>
    );
  }

  const progreso = proximo
    ? Math.min(100, Math.round(((total - tramo.desde) / (proximo.desde - tramo.desde)) * 100))
    : 100;
  const falta = proximo ? proximo.desde - total : 0;

  return (
    <div className="bg-[#FAF8F5] border border-[#E8E4DB] rounded p-3 mb-3">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-[#2D2B45]">
          {tramo.descuento > 0 ? `Descuento ${tramo.label} aplicado` : "Desbloqueá tu descuento"}
        </span>
        {tramo.descuento > 0 && (
          <span className="text-xs bg-[#E8673A] text-white px-2 py-0.5 rounded-sm font-medium">-{tramo.descuento}%</span>
        )}
      </div>
      <div className="w-full bg-[#E8E4DB] rounded-full h-2 mb-2">
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{ width: progreso + "%", background: tramo.descuento === 0 ? "#9BA88D" : tramo.descuento >= 10 ? "#E8673A" : "#2D2B45" }}
        />
      </div>
      {proximo ? (
        <p className="text-xs text-[#6b6b6b] font-light">
          Te faltan <strong className="text-[#2D2B45] font-medium">${falta.toLocaleString("es-AR")}</strong> para {proximo.label}
        </p>
      ) : (
        <p className="text-xs text-[#E8673A] font-medium">¡Máximo descuento alcanzado!</p>
      )}
    </div>
  );
}

export default function CarritoDrawer() {
  const { items, quitar, actualizar, vaciar, total, cantidad, abierto, setAbierto } = useCarrito();
  const [vista, setVista] = useState<Vista>("carrito");
  const [enviando, setEnviando] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", localidad: "" });

  const tramo = getTramo(total);
  const descuento = tramo.descuento;
  const totalConDescuento = Math.round(total * (1 - descuento / 100));
  const ahorro = total - totalConDescuento;
  const llegaAlMinimo = total >= MINIMO;

  const guardarPedido = async (via: "whatsapp" | "email", datosCliente?: typeof form) => {
    try {
      const { data: pedido, error } = await supabase
        .from("pedidos")
        .insert({
          nombre_cliente: datosCliente?.nombre || "(WhatsApp)",
          email: datosCliente?.email || "",
          telefono: datosCliente?.telefono || "",
          localidad: datosCliente?.localidad || "",
          subtotal: total,
          descuento_pct: descuento,
          total: totalConDescuento,
          via_contacto: via,
        })
        .select("id") 
        .single();

      if (error || !pedido) return;

      await supabase.from("pedido_items").insert(
        items.map((item) => ({
          pedido_id: pedido.id,
          producto_id: null,
          nombre: item.nombre,
          precio: item.precio,  
          cantidad: item.cantidad,
        }))
      );
    } catch {
      // no interrumpir el flujo si falla
    }
  };

  const enviarPorWhatsApp = async () => {
    if (!llegaAlMinimo || items.length === 0) return;
    const lineas = items.map((i) => `- ${i.cantidad}x ${i.nombre} — $${(i.precio * i.cantidad).toLocaleString("es-AR")}`).join("\n");
    const descuentoTexto = descuento > 0
      ? `\nDescuento aplicado (${descuento}%): -$${ahorro.toLocaleString("es-AR")}\nTotal con descuento: $${totalConDescuento.toLocaleString("es-AR")}`
      : "";
    const mensaje = `Hola! Quiero hacer un pedido mayorista:\n\n${lineas}\n\nSubtotal: $${total.toLocaleString("es-AR")}${descuentoTexto}`;
    await guardarPedido("whatsapp");
    dispararConversion();
    window.open("https://wa.me/541123251963?text=" + encodeURIComponent(mensaje), "_blank");
  };

  const enviarPorEmail = async () => {
    if (!form.nombre || !form.email) return;
    setEnviando(true);
    const detalle = items.map((i) => `${i.cantidad}x ${i.nombre} — $${(i.precio * i.cantidad).toLocaleString("es-AR")}`).join("\n");
    const descuentoTexto = descuento > 0 ? `\nDescuento (${descuento}%): -$${ahorro.toLocaleString("es-AR")}` : "";
    try {
      await emailjs.send("tiendacuis", "template_wpgikg7", {
        nombre: form.nombre, email: form.email,
        telefono: form.telefono || "No indicado",
        localidad: form.localidad || "No indicada",
        detalle: detalle + descuentoTexto,
        total: "$" + totalConDescuento.toLocaleString("es-AR"),
      }, "hbpfSCzPkpZo0KttM");
      await guardarPedido("email", form);
      dispararConversion();
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
      {abierto && <div className="fixed inset-0 bg-black/40 z-40" onClick={cerrar} />}
      <div className={"fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-xl transition-transform duration-300 " + (abierto ? "translate-x-0" : "translate-x-full")}>

        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E4DB]">
          <div className="flex items-center gap-2">
            {vista === "formulario" && (
              <button onClick={() => setVista("carrito")} className="text-[#6b6b6b] hover:text-[#1A1A1A] mr-1 text-lg">←</button>
            )}
            <span className="text-base font-medium text-[#1A1A1A] tracking-tight">
              {vista === "carrito" && "Carrito"}
              {vista === "formulario" && "Datos del pedido"}
              {vista === "confirmado" && "Pedido enviado"}
            </span>
            {vista === "carrito" && cantidad > 0 && (
              <span className="bg-[#2D2B45] text-white text-xs px-2 py-0.5 rounded-sm">{cantidad}</span>
            )}
          </div>
          <button onClick={cerrar} className="text-[#6b6b6b] hover:text-[#1A1A1A] text-lg">✕</button>
        </div>

        {vista === "carrito" && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <span className="text-2xl text-[#E8E4DB] font-medium tracking-[3px] uppercase mb-4">TC</span>
                  <p className="text-sm text-[#6b6b6b] font-light">Tu carrito está vacío</p>
                  <button onClick={cerrar} className="mt-4 text-xs text-[#E8673A] font-medium hover:underline">Ver productos →</button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-4 border-b border-[#F0EDE8]">
                      <div className="bg-white border border-[#E8E4DB] rounded w-14 h-14 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {item.imagen ? (
                          <img src={item.imagen} alt={item.nombre} className="w-full h-full object-contain p-1" />
                        ) : (
                          <span className="text-xs text-[#E8E4DB] font-medium">TC</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1A1A1A] leading-snug mb-1 truncate">{item.nombre}</p>
                        <p className="text-xs text-[#6b6b6b] mb-2 font-light">${item.precio.toLocaleString("es-AR")} c/u</p>
                        <div className="flex items-center gap-2">
                          <button onClick={() => actualizar(item.id, item.cantidad - 1)} className="w-6 h-6 border border-[#E8E4DB] rounded-sm text-sm text-[#6b6b6b] hover:border-[#2D2B45] flex items-center justify-center">−</button>
                          <input
                            type="number" min="1" value={item.cantidad}
                            onChange={(e) => { const val = parseInt(e.target.value); if (!isNaN(val) && val > 0) actualizar(item.id, val); }}
                            className="w-12 h-6 border border-[#E8E4DB] rounded-sm text-xs text-center text-[#1A1A1A] focus:outline-none focus:border-[#2D2B45]"
                          />
                          <button onClick={() => actualizar(item.id, item.cantidad + 1)} className="w-6 h-6 border border-[#E8E4DB] rounded-sm text-sm text-[#6b6b6b] hover:border-[#2D2B45] flex items-center justify-center">+</button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button onClick={() => quitar(item.id)} className="text-xs text-[#6b6b6b] hover:text-red-500">✕</button>
                        <p className="text-sm font-medium text-[#2D2B45]">${(item.precio * item.cantidad).toLocaleString("es-AR")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-5 py-4 border-t border-[#E8E4DB]">
                <BarraProgreso total={total} />
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-[#6b6b6b] font-light">Subtotal</span>
                  <span className="text-sm text-[#6b6b6b] font-light">${total.toLocaleString("es-AR")}</span>
                </div>
                {descuento > 0 && (
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-[#E8673A] font-medium">Descuento ({descuento}%)</span>
                    <span className="text-sm text-[#E8673A] font-medium">-${ahorro.toLocaleString("es-AR")}</span>
                  </div>
                )}
                <div className="flex justify-between items-center mb-4 pt-2 border-t border-[#E8E4DB]">
                  <span className="text-sm font-medium text-[#1A1A1A]">Total</span>
                  <span className="text-lg font-medium text-[#2D2B45]">${totalConDescuento.toLocaleString("es-AR")}</span>
                </div>
                <button
                  onClick={enviarPorWhatsApp}
                  disabled={!llegaAlMinimo}
                  className={"w-full text-white text-sm font-medium py-3 rounded-sm mb-2 transition-colors " + (llegaAlMinimo ? "bg-[#25d366] hover:bg-[#1fb956]" : "bg-[#E8E4DB] cursor-not-allowed text-[#9BA88D]")}
                >
                  Finalizar pedido por WhatsApp
                </button>
                <button
                  onClick={() => llegaAlMinimo && setVista("formulario")}
                  disabled={!llegaAlMinimo}
                  className={"w-full text-sm py-3 rounded-sm mb-2 transition-colors border " + (llegaAlMinimo ? "border-[#E8E4DB] text-[#6b6b6b] hover:border-[#2D2B45] hover:text-[#2D2B45]" : "border-[#E8E4DB] text-[#E8E4DB] cursor-not-allowed")}
                >
                  Finalizar pedido por email
                </button>
                <button onClick={cerrar} className="w-full text-xs text-[#E8673A] hover:underline py-1">
                  Seguir comprando →
                </button>
                <button onClick={vaciar} className="w-full text-xs text-[#6b6b6b] hover:text-red-500 py-1">
                  Vaciar carrito
                </button>
              </div>
            )}
          </>
        )}

        {vista === "formulario" && (
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <p className="text-xs text-[#6b6b6b] mb-4 font-light">Completá tus datos y te contactamos para confirmar el pedido.</p>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-[#6b6b6b] mb-1 block">Nombre y apellido *</label>
                <input type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="w-full border border-[#E8E4DB] rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#2D2B45]" placeholder="Juan García" />
              </div>
              <div>
                <label className="text-xs text-[#6b6b6b] mb-1 block">Email *</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-[#E8E4DB] rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#2D2B45]" placeholder="juan@ejemplo.com" />
              </div>
              <div>
                <label className="text-xs text-[#6b6b6b] mb-1 block">Teléfono</label>
                <input type="tel" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} className="w-full border border-[#E8E4DB] rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#2D2B45]" placeholder="11 1234 5678" />
              </div>
              <div>
                <label className="text-xs text-[#6b6b6b] mb-1 block">Localidad</label>
                <input type="text" value={form.localidad} onChange={(e) => setForm({ ...form, localidad: e.target.value })} className="w-full border border-[#E8E4DB] rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#2D2B45]" placeholder="Buenos Aires" />
              </div>
              <div className="bg-[#FAF8F5] border border-[#E8E4DB] rounded p-3 mt-1">
                <p className="text-xs text-[#6b6b6b] mb-2 font-medium uppercase tracking-wide">Resumen</p>
                {items.map((i) => (
                  <div key={i.id} className="flex justify-between text-xs text-[#1A1A1A] mb-1">
                    <span className="font-light">{i.cantidad}x {i.nombre}</span>
                    <span className="font-medium">${(i.precio * i.cantidad).toLocaleString("es-AR")}</span>
                  </div>
                ))}
                {descuento > 0 && (
                  <div className="flex justify-between text-xs text-[#E8673A] mt-1">
                    <span>Descuento ({descuento}%)</span>
                    <span>-${ahorro.toLocaleString("es-AR")}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-medium text-[#2D2B45] mt-2 pt-2 border-t border-[#E8E4DB]">
                  <span>Total</span>
                  <span>${totalConDescuento.toLocaleString("es-AR")}</span>
                </div>
              </div>
              <button onClick={enviarPorEmail} disabled={enviando || !form.nombre || !form.email} className="w-full bg-[#2D2B45] text-white text-sm font-medium py-3 rounded-sm hover:bg-[#1e1c30] disabled:opacity-50 disabled:cursor-not-allowed mt-2 transition-colors">
                {enviando ? "Enviando..." : "Confirmar pedido"}
              </button>
            </div>
          </div>
        )}

        {vista === "confirmado" && (
          <div className="flex-1 flex flex-col items-center justify-center px-5 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-medium text-[#1A1A1A] mb-2">Pedido enviado</h3>
            <p className="text-sm text-[#6b6b6b] mb-6 font-light">Recibimos tu pedido. Te contactamos pronto para confirmar y coordinar el envío.</p>
            <button onClick={cerrar} className="bg-[#E8673A] text-white text-sm px-6 py-2.5 rounded-sm hover:bg-[#C4522C] transition-colors">
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}