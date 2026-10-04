import { useTom } from '../lib/tons';

/**
 * Faixa tipográfica contínua — lenta (60 s por volta), em CSS no compositor,
 * pausa no hover e para com prefers-reduced-motion.
 */
export function Faixa({ tom = 'areia' as const }: { tom?: 'areia' }) {
  const ref = useTom<HTMLDivElement>(tom);
  const frase = 'BLACK CRIOULO · CENTRO DO RIO · 24 CM · PRIVACY · ';
  const bloco = Array.from({ length: 4 }, () => frase).join('');
  return (
    <div ref={ref} className="tom faixa relative overflow-hidden border-y border-carvao/15 bg-areia py-4 text-carvao md:py-6" aria-label="Black Crioulo · Centro do Rio · 24 cm · Privacy">
      <div className="faixa-trilho flex w-max whitespace-nowrap" aria-hidden>
        <span className="titulo pr-[0.3em] text-[clamp(2.4rem,7vw,6.5rem)] leading-none">{bloco}</span>
        <span className="titulo pr-[0.3em] text-[clamp(2.4rem,7vw,6.5rem)] leading-none">{bloco}</span>
      </div>
    </div>
  );
}
