/* 
1. Context és Provider létrehozás
2. Providerben: state és függvények
3. Szülőkomponens a providerben (main.tsx)
4. Felhasználás a komponensekben (hook)
*/

/*

online sgítséggel:
sor     = egészrész(index / MERET)
oszlop  = index maradék MERET
index   = sor * MERET + oszlop

*/

import { createContext, useContext, useState, type ReactNode } from "react";
import { KEVERES_KATTINT, LAMPAK, TABLAMERET } from "../adatok";

interface JatekContextValue {
  lampak: boolean[];
  lepesek: number;
  nyert: boolean;
  kattint: (index: number) => void;
  ujJatek: () => void;
}

export const JatekContext = createContext<JatekContextValue | undefined>(
  undefined,
);

function erintettIndexek(index: number): number[] {
  const sor = Math.floor(index / TABLAMERET);
  const oszlop = index % TABLAMERET;
  const eredmeny = [index];

  if (sor > 0) eredmeny.push(index - TABLAMERET);
  if (sor < TABLAMERET - 1) eredmeny.push(index + TABLAMERET);
  if (oszlop > 0) eredmeny.push(index - 1);
  if (oszlop < TABLAMERET - 1) eredmeny.push(index + 1);

  return eredmeny;
}

function atkapcsol(lampak: boolean[], index: number): boolean[] {
  const uj = [...lampak];
  for (const i of erintettIndexek(index)) {
    uj[i] = !uj[i];
  }
  return uj;
}

function kevertTabla(): boolean[] {
  let tabla: boolean[] = Array(LAMPAK).fill(true);

  do {
    for (let i = 0; i < KEVERES_KATTINT; i++) {
      tabla = atkapcsol(tabla, Math.floor(Math.random() * LAMPAK));
    }
  } while (tabla.every((l) => l));

  return tabla;
}

type JatekProviderProps = {
  children: ReactNode;
};

export function JatekProvider({ children }: JatekProviderProps) {
  const [lampak, setLampak] = useState(() => kevertTabla());
  const [lepesek, setLepesek] = useState(0);

  const nyert = lampak.every((l) => l);

  const kattint = (index: number) => {
    if (nyert) return;
    setLampak((elozo) => atkapcsol(elozo, index));
    setLepesek((l) => l + 1);
  };

  const ujJatek = () => {
    setLampak(kevertTabla());
    setLepesek(0);
  };

  return (
    <JatekContext.Provider value={{ lampak, lepesek, nyert, kattint, ujJatek }}>
      {children}
    </JatekContext.Provider>
  );
}

export function useJatekContext() {
  const context = useContext(JatekContext);

  if (context === undefined) {
    throw new Error("Hiba.");
  }

  return context;
}
