/**
 * Tons de fundo: areia, papel, carvão e preto.
 * Cada seção tem fundo opaco próprio (o texto nunca fica sobre o tom errado).
 * A passagem entre tons acontece numa "costura": uma faixa em degradê entre
 * duas seções, que a própria rolagem atravessa — sem JavaScript, sem custo.
 */
import { useRef } from 'react';

export const TONS = {
  preto: '#0b0a09',
  carvao: '#141210',
  papel: '#f3eee6',
  areia: '#d8cbb4',
} as const;
export type Tom = keyof typeof TONS;

/** Mantido como ponto único para futuras lógicas por tom; hoje só devolve o ref. */
export function useTom<T extends HTMLElement>(_tom: Tom) {
  return useRef<T>(null);
}

export function Costura({ de, para, altura = '24vh' }: { de: Tom; para: Tom; altura?: string }) {
  return (
    <div
      aria-hidden
      style={{ height: altura, backgroundImage: `linear-gradient(180deg, ${TONS[de]} 0%, ${TONS[de]} 8%, ${TONS[para]} 92%, ${TONS[para]} 100%)` }}
    />
  );
}
