"use client";

import { useState } from "react";

const faqs = [
  "¿Cuál es el mínimo de compra para hacer un pedido?",
  "¿Hacen envíos a todo el país?",
  "¿Cómo funciona el grabado láser personalizado?",
  "¿Puedo ver los precios sin registrarme?",
  "¿Cuánto tarda en llegar mi pedido?",
];

const respuestas = [
  "El mínimo de compra es de $80.000. Podés combinar productos de distintas categorías para llegar al mínimo. Para pedidos de grabado láser personalizado el mínimo varía según el producto — consultanos por WhatsApp.",
  "Sí, despachamos a todo el país por Correo Argentino y Via Cargo. El costo de envío se calcula según el peso y destino y corre por cuenta del comprador. Los pedidos se despachan dentro de las 48-72 horas hábiles de confirmado el pago.",
  "Nos enviás el texto o logo que querés grabar, la cantidad y el producto. Nosotros te mandamos un presupuesto y una vez confirmado arrancamos con la producción. El tiempo de entrega para pedidos con grabado es de 5 a 10 días hábiles.",
  "Sí, los precios están visibles en el catálogo sin necesidad de registrarse. Al ser venta mayorista los precios son por unidad y están pensados para revendedores.",
  "Una vez despachado, Correo Argentino y Via Cargo tardan entre 2 y 7 días hábiles según la zona. Buenos Aires y alrededores generalmente llega en 2-3 días. El interior del país puede demorar hasta 7 días.",
];

export default function FaqHome() {
  const [abierto, setAbierto] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white px-8 py-14">
      <p className="text-xs uppercase tracking-widest text-[#b8860b] font-medium mb-2">
        Preguntas frecuentes
      </p>
      <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1a1a1a] mb-8">
        Lo que más nos preguntan
      </h2>
      <div className="divide-y divide-[#f0ede8] max-w-2xl">
        {faqs.map((q, i) => (
          <div key={i}>
            <button
              onClick={() => setAbierto(abierto === i ? null : i)}
              className="w-full py-4 flex justify-between items-center text-left gap-4 group"
            >
              <span className={
                "text-sm font-medium transition-colors " +
                (abierto === i ? "text-[#1a5c38]" : "text-[#1a1a1a] group-hover:text-[#1a5c38]")
              }>
                {q}
              </span>
              <span className={
                "text-xl flex-shrink-0 text-[#1a5c38] transition-transform duration-200 " +
                (abierto === i ? "rotate-45" : "")
              }>
                +
              </span>
            </button>
            {abierto === i && (
              <div className="pb-4">
                <p className="text-sm text-[#6b6b6b] leading-relaxed">
                  {respuestas[i]}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <a
          href="/faq"
          className="text-sm text-[#1a5c38] font-medium hover:underline"
        >
          Ver todas las preguntas frecuentes →
        </a>
      </div>
    </section>
  );
}