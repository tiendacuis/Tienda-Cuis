"use client";

import { useState } from "react";

const faqs = [
  {
    pregunta: "¿Cuál es el mínimo de compra para hacer un pedido?",
    respuesta:
      "El mínimo de compra es de $80.000. Podés combinar productos de distintas categorías para llegar al mínimo. Para pedidos de grabado láser personalizado el mínimo varía según el producto — consultanos por WhatsApp.",
  },
  {
    pregunta: "¿Hacen envíos a todo el país?",
    respuesta:
      "Sí, despachamos a todo el país por Correo Argentino y Via Cargo. El costo de envío se calcula según el peso y destino y corre por cuenta del comprador. Los pedidos se despachan dentro de las 48-72 horas hábiles de confirmado el pago.",
  },
  {
    pregunta: "¿Cómo funciona el grabado láser personalizado?",
    respuesta:
      "Nos enviás el texto o logo que querés grabar, la cantidad y el producto. Nosotros te mandamos un presupuesto y una vez confirmado arrancamos con la producción. El tiempo de entrega para pedidos con grabado es de 5 a 10 días hábiles dependiendo del volumen.",
  },
  {
    pregunta: "¿Puedo ver los precios sin registrarme?",
    respuesta:
      "Sí, los precios están visibles en el catálogo sin necesidad de registrarse. Al ser venta mayorista los precios son por unidad y están pensados para revendedores.",
  },
  {
    pregunta: "¿Cuánto tarda en llegar mi pedido?",
    respuesta:
      "Una vez despachado, Correo Argentino y Via Cargo tardan entre 2 y 7 días hábiles según la zona. Buenos Aires y alrededores generalmente llega en 2-3 días. El interior del país puede demorar hasta 7 días.",
  },
  {
    pregunta: "¿Cómo puedo pagar?",
    respuesta:
      "Aceptamos transferencia bancaria. Una vez que confirmás tu pedido te enviamos los datos bancarios. El pedido se procesa una vez acreditado el pago.",
  },
  {
    pregunta: "¿Puedo hacer un pedido mixto con distintos productos?",
    respuesta:
      "Sí, podés combinar cualquier producto del catálogo en un mismo pedido. El mínimo de $80.000 aplica sobre el total del pedido, no por producto.",
  },
  {
    pregunta: "¿Tienen lista de precios para descargar?",
    respuesta:
      "Todos los precios están actualizados en el catálogo online. Si necesitás una lista en formato PDF para tu negocio, escribinos por WhatsApp y te la enviamos.",
  },
];

export default function FaqPage() {
  const [abierto, setAbierto] = useState<number | null>(null);

  const toggle = (i: number) => {
    setAbierto(abierto === i ? null : i);
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
      <section className="bg-[#1a5c38] px-8 py-14 text-center">
        <p className="text-xs text-white/60 uppercase tracking-widest mb-3">Soporte</p>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white mb-4">
          Preguntas frecuentes
        </h1>
        <p className="text-white/70 text-sm max-w-md mx-auto">
          Todo lo que necesitás saber antes de hacer tu primer pedido mayorista.
        </p>
      </section>

      {/* ACORDEÓN */}
      <section className="px-8 py-14 max-w-2xl mx-auto">
        <div className="flex flex-col gap-0">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-[#e8e4db]">
              <button
                onClick={() => toggle(i)}
                className="w-full py-5 flex justify-between items-center text-left gap-4 group"
              >
                <span className={
                  "text-sm font-medium transition-colors " +
                  (abierto === i ? "text-[#1a5c38]" : "text-[#1a1a1a] group-hover:text-[#1a5c38]")
                }>
                  {faq.pregunta}
                </span>
                <span className={
                  "text-xl flex-shrink-0 transition-transform duration-200 text-[#1a5c38] " +
                  (abierto === i ? "rotate-45" : "")
                }>
                  +
                </span>
              </button>
              {abierto === i && (
                <div className="pb-5">
                  <p className="text-sm text-[#6b6b6b] leading-relaxed">
                    {faq.respuesta}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-white border border-[#e8e4db] rounded-xl p-8 text-center">
          <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1a1a1a] mb-2">
            ¿No encontrás lo que buscás?
          </h3>
          <p className="text-sm text-[#6b6b6b] mb-6">
            Escribinos por WhatsApp y te respondemos al instante.
          </p>
          <a
            href="https://wa.me/541123251963?text=Hola! Tengo una consulta sobre Tienda Cuis"
            className="inline-block bg-[#25d366] text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-[#1fb956]"
          >
            Escribir por WhatsApp
          </a>
        </div>
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