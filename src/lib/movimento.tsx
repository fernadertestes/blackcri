/**
 * Linguagem de movimento do site.
 * Uma curva principal (saída longa, sem tranco), uma curva de ida-e-volta
 * para trocas de estado e duas springs controladas. Tudo em transform/opacity.
 */
import { useEffect, useRef, useState, type ReactNode, type RefObject, type PointerEvent as RPointerEvent } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import type { Foto } from '../content/fotos';

export const ease = [0.22, 1, 0.36, 1] as const; // saída: entradas e revelações
export const easeIO = [0.65, 0, 0.35, 1] as const; // ida-e-volta: trocas, menu
export const springSuave = { stiffness: 120, damping: 26, mass: 0.6 };
export const springFirme = { stiffness: 260, damping: 30, mass: 0.5 };

const consulta = (q: string) => (typeof window !== 'undefined' ? window.matchMedia(q).matches : false);
function useMidiaQuery(q: string) {
  const [v, setV] = useState(() => consulta(q));
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setV(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [q]);
  return v;
}

/**
 * reduzido: o usuário pediu menos movimento.
 * leve: reduzido OU celular/toque — sem parallax, revelações curtas.
 * cinema: desktop com movimento liberado — sequência fixa e efeitos de profundidade.
 * mouse: ponteiro fino com hover (cursor "VER FOTO", magnetismo).
 */
export function useMidia() {
  const reduzido = Boolean(useReducedMotion());
  const compacto = useMidiaQuery('(max-width: 767px), (pointer: coarse)');
  const desktop = useMidiaQuery('(min-width: 1024px)');
  const mouse = useMidiaQuery('(hover: hover) and (pointer: fine)');
  return { reduzido, leve: reduzido || compacto, cinema: !reduzido && desktop && !compacto, mouse: mouse && !reduzido };
}
/** compatibilidade com a versão anterior */
export const useEfeitosReduzidos = useMidia;

/** Deslocamento vertical ligado à posição do elemento na tela. Zero em modo leve. */
export function useParallaxY<T extends HTMLElement>(px: number) {
  const ref = useRef<T>(null);
  const { leve } = useMidia();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], leve ? [0, 0] : [px, -px]);
  return { ref, y };
}

type Tag = 'div' | 'p' | 'h2' | 'h3' | 'span' | 'figure' | 'li';

/** Entrada simples (deslocamento + opacidade). Para parágrafos e blocos. */
export function Revelar({
  children,
  atraso = 0,
  className,
  y = 24,
  as = 'div',
}: {
  children: ReactNode;
  atraso?: number;
  className?: string;
  y?: number;
  as?: Tag;
}) {
  const { reduzido, leve } = useMidia();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduzido ? false : { opacity: 0, y: leve ? y / 2 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, delay: atraso, ease }}
    >
      {children}
    </M>
  );
}

/**
 * Revelação por linha com máscara. Cada linha sobe por trás de um corte.
 * `aoCarregar` anima na montagem (capa); senão, quando entra na tela.
 */
export function Linhas({
  linhas,
  className = '',
  linhaClassName = '',
  atraso = 0,
  intervalo = 0.12,
  duracao = 1.1,
  aoCarregar = false,
}: {
  linhas: readonly ReactNode[];
  className?: string;
  linhaClassName?: string | ((i: number) => string);
  atraso?: number;
  intervalo?: number;
  duracao?: number;
  aoCarregar?: boolean;
}) {
  const { reduzido } = useMidia();
  const gatilho = aoCarregar ? { animate: 'dentro' } : { whileInView: 'dentro', viewport: { once: true, margin: '0px 0px -12% 0px' } };
  return (
    <motion.span className={`block ${className}`} initial={reduzido ? false : 'fora'} {...gatilho}>
      {linhas.map((l, i) => (
        // pt/-mt dão espaço para acentos (É, Á) sem cortar na máscara
        <span key={i} className="-mt-[0.12em] block overflow-hidden pb-[0.05em] pt-[0.12em]">
          <motion.span
            className={`block ${typeof linhaClassName === 'function' ? linhaClassName(i) : linhaClassName}`}
            variants={{ fora: { y: '108%' }, dentro: { y: '0%' } }}
            transition={{ duration: duracao, delay: atraso + i * intervalo, ease }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Entrada por palavra com máscara e stagger discreto. Quebra de linha natural. */
export function Palavras({
  texto,
  className = '',
  destaque,
  atraso = 0,
  intervalo = 0.06,
  amount = 0.4,
}: {
  texto: string;
  className?: string;
  destaque?: (palavra: string, i: number, total: number) => string | undefined;
  atraso?: number;
  intervalo?: number;
  amount?: number;
}) {
  const { reduzido } = useMidia();
  const palavras = texto.split(' ');
  return (
    <motion.span
      className={`block ${className}`}
      initial={reduzido ? false : 'fora'}
      whileInView="dentro"
      viewport={{ once: true, amount }}
      transition={{ staggerChildren: intervalo, delayChildren: atraso }}
    >
      {palavras.map((p, i) => (
        <span key={i} className="-mt-[0.12em] inline-block overflow-hidden pb-[0.05em] pt-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${destaque?.(p, i, palavras.length) ?? ''}`}
            variants={{ fora: { y: '105%', rotate: 2 }, dentro: { y: '0%', rotate: 0 } }}
            transition={{ duration: 0.95, ease }}
          >
            {p}
          </motion.span>
          {i < palavras.length - 1 && ' '}
        </span>
      ))}
    </motion.span>
  );
}

/**
 * Fotografia deslizando dentro de uma moldura com overflow oculto.
 * A imagem é maior que a moldura exatamente o necessário para o curso
 * do parallax — nunca aparece borda vazia.
 */
export function FotoParallax({
  foto,
  sizes,
  className = '',
  imgClassName = '',
  intensidade = 6,
  prioridade = false,
  progresso,
}: {
  foto: Foto;
  sizes: string;
  className?: string;
  imgClassName?: string;
  intensidade?: number; // % da altura da moldura; 0 desliga
  prioridade?: boolean;
  progresso?: MotionValue<number>; // opcional: usa o progresso de outra seção
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { leve } = useMidia();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const ativo = !leve && intensidade > 0;
  const i = ativo ? intensidade : 0;
  // camada interna tem altura (100 + 2i)% ; o curso em % dela é i/(1+2i/100)
  const curso = i / (1 + (2 * i) / 100);
  const y = useTransform(progresso ?? scrollYProgress, [0, 1], [`-${curso}%`, `${curso}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-x-0" style={{ top: `-${i}%`, bottom: `-${i}%`, y: ativo ? y : 0 }}>
        <img
          src={foto.src}
          srcSet={foto.srcSet}
          sizes={sizes}
          width={foto.largura}
          height={foto.altura}
          alt={foto.alt}
          loading={prioridade ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={prioridade ? 'high' : 'auto'}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      </motion.div>
    </div>
  );
}

/**
 * Palavra de fundo gigante atravessando a seção mais devagar que a rolagem,
 * parcialmente cortada pela composição. Decorativa (aria-hidden).
 */
export function PalavraFundo({
  texto,
  className = '',
  de = '8%',
  para = '-28%',
  alvo,
}: {
  texto: string;
  className?: string;
  de?: string;
  para?: string;
  alvo: RefObject<HTMLElement | null>;
}) {
  const { leve } = useMidia();
  const { scrollYProgress } = useScroll({ target: alvo, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], leve ? ['0%', '0%'] : [de, para]);
  return (
    <motion.span
      aria-hidden
      style={{ x }}
      className={`titulo pointer-events-none absolute select-none whitespace-nowrap leading-none ${className}`}
    >
      {texto}
    </motion.span>
  );
}

/**
 * Magnetismo discreto: o conteúdo segue o ponteiro até `forca` px.
 * A área clicável (o elemento externo) não se move.
 */
export function Magnetico({ children, forca = 6, className = '' }: { children: ReactNode; forca?: number; className?: string }) {
  const { mouse } = useMidia();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, springFirme);
  const y = useSpring(my, springFirme);
  const mover = (e: RPointerEvent<HTMLSpanElement>) => {
    if (!mouse) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2 * forca);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2 * forca);
  };
  const soltar = () => {
    mx.set(0);
    my.set(0);
  };
  return (
    <span className={`inline-block ${className}`} onPointerMove={mover} onPointerLeave={soltar}>
      <motion.span className="inline-block" style={{ x, y }}>
        {children}
      </motion.span>
    </span>
  );
}
