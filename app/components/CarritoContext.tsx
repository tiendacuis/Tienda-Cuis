"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type ItemCarrito = {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?: string;
};

type CarritoContextType = {
  items: ItemCarrito[];
  agregar: (producto: { id: string; nombre: string; precio: number; imagen?: string }) => void;
  quitar: (id: string) => void;
  actualizar: (id: string, cantidad: number) => void;
  vaciar: () => void;
  total: number;
  cantidad: number;
  abierto: boolean;
  setAbierto: (v: boolean) => void;
};

const CarritoContext = createContext<CarritoContextType | null>(null);
const STORAGE_KEY = "tiendacuis_carrito";

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [abierto, setAbierto] = useState(false);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      if (guardado) setItems(JSON.parse(guardado));
    } catch {}
    setCargado(true);
  }, []);

  useEffect(() => {
    if (!cargado) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, cargado]);

  const agregar = (producto: { id: string; nombre: string; precio: number; imagen?: string }) => {
    setItems((prev) => {
      const existe = prev.find((i) => i.id === producto.id);
      if (existe) {
        return prev.map((i) =>
          i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
    setAbierto(true);
  };

  const quitar = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const actualizar = (id: string, cantidad: number) => {
    if (cantidad <= 0) { quitar(id); return; }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, cantidad } : i)));
  };

  const vaciar = () => {
    setItems([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  const total = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
  const cantidad = items.reduce((acc, i) => acc + i.cantidad, 0);

  return (
    <CarritoContext.Provider value={{ items, agregar, quitar, actualizar, vaciar, total, cantidad, abierto, setAbierto }}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  return ctx;
}