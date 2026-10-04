import { useCallback, useEffect, useRef, useState, type KeyboardEvent as RKeyboardEvent, type ReactNode, type Ref } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, type MotionValue } from 'motion/react';
import { galeria, type FotoGaleria } from '../content/fotos';
import { PalavraFundo, Palavras, ease, easeIO, springFirme, springSuave, useMidia, useParallaxY } from '../lib/movimento';
import { useTom } from '../lib/tons';
import { Cabecalho } from './Manifesto';

/**
 * Folha de contato — composição assimétrica alternando amplas e retratos.
 * Cada item está em um "plano" (deslocamento vertical próprio na rolagem).
 * Hover (mouse): zoom curto, legenda sobe, moldura acompanha o ponteiro,
 * cursor "VER FOTO". Clique/Enter: ampliação com transição compartilhada.
 */
const composicao = [
  { box: 'col-span-12 md:col-span-7', plano: 36 }, // amplo
  { box: 'col-span-9 col-start-4 md:col-span-4 md:col-start-9 md:mt-44', plano: -28 }, // retrato
  { box: 'col-span-10 md:col-span-4 md:col-start-2 md:-mt-10', plano: 56 }, // retrato
  { box: 'col-span-12 md:col-span-7 md:col-start-6 md:mt-28', plano: -18 }, // amplo
  { box: 'col-span-9 col-start-4 md:col-span-4 md:col-start-1 md:mt-10', plano: 30 }, // retrato
  { box: 'col-span-10 md:col-span-4 md:col-start-7 md:mt-40', plano: -36 }, // retrato
  { box: 'col-span-12 md:col-span-8 md:col-start-2 md:mt-6', plano: 24 }, // amplo
  { box: 'col-span-9 col-start-4 md:col-span-3 md:col-start-10 md:mt-48', plano: -30 }, // retrato
  { box: 'col-span-7 md:col-span-3 md:col-start-2 md:mt-6', plano: 30 }, // detalhe
  { box: 'col-span-7 col-start-6 md:col-span-3 md:col-start-7 md:mt-32', plano: -40 }, // detalhe
];

export function Galeria() {
  const secao = useTom<HTMLElement>('carvao');
  const [aberta, setAberta] = useState<number | null>(null);
  const [origem, setOrigem] = useState<number | null>(null);
  const gatilhos = useRef<Array<HTMLButtonElement | null>>([]);
  const { mouse } = useMidia();

  // cursor "VER FOTO"
  const cx = useMotionValue(-200);
  const cy = useMotionValue(-200);
  const sx = useSpring(cx, springSuave);
  const sy = useSpring(cy, springSuave);
  const [sobre, setSobre] = useState(false);

  const abrir = (i: number) => {
    setOrigem(i);
    setAberta(i);
    setSobre(false);
  };
  const fechar = useCallback(() => {
    const volta = origem;
    setAberta(null);
    // devolve o foco à miniatura de origem
    requestAnimationFrame(() => gatilhos.current[volta ?? 0]?.focus({ preventScroll: true }));
  }, [origem]);

  if (galeria.length === 0) return null;

  return (
    <section
      ref={secao}
      id="galeria"
      aria-labelledby="galeria-titulo"
      className="tom relative overflow-hidden bg-carvao"
      onPointerMove={(e) => {
        if (!mouse) return;
        cx.set(e.clientX);
        cy.set(e.clientY);
      }}
    >
      <PalavraFundo alvo={secao} texto="Corpo" de="20%" para="-30%" className="contorno contorno-claro top-[40%] text-[36vw]" />

      <div className="relative mx-auto max-w-[1600px] px-5 pb-28 pt-24 md:px-10 md:pb-44 md:pt-36">
        <Cabecalho n="Nº 04" rotulo={`Folha de contato · ${String(galeria.length).padStart(2, '0')} imagens`} escuro />
        <div className="mt-10 flex flex-col gap-6 md:mt-16 md:flex-row md:items-end md:justify-between">
          <h2 id="galeria-titulo" className="titulo text-[clamp(3.6rem,13vw,13rem)] text-papel">
            <Palavras texto="Galeria" />
          </h2>
          <p className="max-w-xs text-base leading-relaxed text-papel/70">
            Packs de fotos e vídeos, ou se curte uma vídeo chamada
          </p>
        </div>

        <ul className="mt-16 grid grid-cols-12 items-start gap-x-5 gap-y-14 md:mt-24 md:gap-y-10">
          {galeria.map((f, i) => (
            <Item
              key={f.src + i}
              foto={f}
              i={i}
              classe={composicao[i % composicao.length].box}
              plano={composicao[i % composicao.length].plano}
              aberta={aberta === i}
              aoAbrir={() => abrir(i)}
              aoSobre={setSobre}
              refBotao={(el) => {
                gatilhos.current[i] = el;
              }}
            />
          ))}
        </ul>
      </div>

      {mouse && <Cursor x={sx} y={sy} visivel={sobre && aberta === null} />}

      <AnimatePresence>
        {aberta !== null && (
          <Ampliacao
            key="ampliacao"
            indice={aberta}
            compartilhada={aberta === origem}
            aoFechar={fechar}
            aoTrocar={(n) => setAberta((n + galeria.length) % galeria.length)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Item({
  foto,
  i,
  classe,
  plano,
  aberta,
  aoAbrir,
  aoSobre,
  refBotao,
}: {
  foto: FotoGaleria;
  i: number;
  classe: string;
  plano: number;
  aberta: boolean;
  aoAbrir: () => void;
  aoSobre: (v: boolean) => void;
  refBotao: (el: HTMLButtonElement | null) => void;
}) {
  const { reduzido, mouse } = useMidia();
  const planoY = useParallaxY<HTMLLIElement>(plano);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, springFirme);
  const y = useSpring(my, springFirme);
  const proporcao = foto.largura / foto.altura;

  return (
    <motion.li ref={planoY.ref} style={{ y: planoY.y }} className={classe}>
      <motion.div
        initial={reduzido ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1, ease, delay: (i % 2) * 0.08 }}
      >
      <motion.button
        ref={refBotao}
        type="button"
        onClick={aoAbrir}
        aria-label={`Ampliar: ${foto.legenda}`}
        aria-haspopup="dialog"
        whileTap={{ scale: 0.985 }}
        className="group block w-full text-left [@media(hover:hover)_and_(pointer:fine)]:cursor-none"
        onPointerEnter={() => aoSobre(true)}
        onPointerLeave={() => {
          aoSobre(false);
          mx.set(0);
          my.set(0);
        }}
        onPointerMove={(e) => {
          if (!mouse) return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set(((e.clientX - r.left) / r.width - 0.5) * 10);
          my.set(((e.clientY - r.top) / r.height - 0.5) * 10);
        }}
      >
        <motion.span className="block" style={{ x, y }}>
          <motion.span
            layoutId={`foto-${i}`}
            className="relative block overflow-hidden bg-preto"
            style={{ aspectRatio: proporcao, opacity: aberta ? 0 : 1 }}
            transition={{ duration: 0.7, ease: easeIO }}
          >
            <img
              src={foto.src}
              srcSet={foto.srcSet}
              sizes="(min-width: 768px) 45vw, 90vw"
              width={foto.largura}
              height={foto.altura}
              alt={foto.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
            />
            {/* legenda que sobe no hover/foco (só com mouse ou teclado) */}
            <span className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-full bg-gradient-to-t from-preto/85 to-transparent px-4 pb-3 pt-10 opacity-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:flex [@media(hover:hover)_and_(pointer:fine)]:justify-between">
              <span className="legenda text-papel">{foto.legenda}</span>
              <span className="legenda text-areia">{String(i + 1).padStart(2, '0')}</span>
            </span>
          </motion.span>
        </motion.span>
        {/* legenda fixa em telas de toque */}
        <span className="mt-3 flex justify-between border-t border-papel/15 pt-3 [@media(hover:hover)_and_(pointer:fine)]:hidden">
          <span className="legenda text-papel">{foto.legenda}</span>
          <span className="legenda text-areia/70">{String(i + 1).padStart(2, '0')}</span>
        </span>
      </motion.button>
      </motion.div>
    </motion.li>
  );
}

function Cursor({ x, y, visivel }: { x: MotionValue<number>; y: MotionValue<number>; visivel: boolean }) {
  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[65]" style={{ x, y }}>
      <motion.span
        className="legenda flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-papel text-center text-[0.62rem] text-carvao"
        initial={false}
        animate={{ scale: visivel ? 1 : 0, opacity: visivel ? 1 : 0 }}
        transition={{ duration: 0.35, ease }}
      >
        Ver foto
      </motion.span>
    </motion.div>
  );
}

function Ampliacao({
  indice,
  compartilhada,
  aoFechar,
  aoTrocar,
}: {
  indice: number;
  compartilhada: boolean;
  aoFechar: () => void;
  aoTrocar: (n: number) => void;
}) {
  const foto = galeria[indice];
  const fecharRef = useRef<HTMLButtonElement>(null);
  const caixa = useRef<HTMLDivElement>(null);
  const { reduzido } = useMidia();
  const proporcao = foto.largura / foto.altura;
  // não amplia além de ~1,8× a resolução do recorte
  const largura = `min(92vw, ${(78 * proporcao).toFixed(2)}svh, ${Math.round(foto.largura * 1.8)}px)`;

  useEffect(() => {
    fecharRef.current?.focus({ preventScroll: true });
    const html = document.documentElement;
    const antes = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      html.style.overflow = antes;
    };
  }, []);

  const teclas = (e: RKeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      aoFechar();
    } else if (e.key === 'ArrowRight') aoTrocar(indice + 1);
    else if (e.key === 'ArrowLeft') aoTrocar(indice - 1);
    else if (e.key === 'Tab' && caixa.current) {
      // mantém o foco dentro da ampliação
      const focaveis = caixa.current.querySelectorAll<HTMLElement>('button');
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    }
  };

  return (
    <motion.div
      ref={caixa}
      role="dialog"
      aria-modal="true"
      aria-label={`Fotografia ampliada: ${foto.legenda}`}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center px-4 py-16"
      onKeyDown={teclas}
    >
      {/* fundo: clique fecha */}
      <motion.div
        className="absolute inset-0 bg-preto/95"
        onClick={aoFechar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.45, delay: 0.1 } }}
        transition={{ duration: 0.5, ease }}
      />

      <motion.div
        layoutId={compartilhada && !reduzido ? `foto-${indice}` : undefined}
        className="relative overflow-hidden bg-preto"
        style={{ aspectRatio: proporcao, width: largura, maxWidth: '100%' }}
        initial={compartilhada && !reduzido ? undefined : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={compartilhada && !reduzido ? undefined : { opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.7, ease: easeIO }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={foto.src}
            src={foto.src}
            srcSet={foto.srcSet}
            sizes="92vw"
            width={foto.largura}
            height={foto.altura}
            alt={foto.alt}
            className="h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          />
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="relative mt-5 flex w-full max-w-[min(92vw,900px)] items-center justify-between gap-4 text-papel"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6, transition: { duration: 0.2 } }}
        transition={{ delay: 0.35, duration: 0.6, ease }}
      >
        <p className="legenda min-w-0" aria-live="polite">
          <span className="tabular-nums text-areia">
            {String(indice + 1).padStart(2, '0')} / {String(galeria.length).padStart(2, '0')}
          </span>
          <span className="ml-4">{foto.legenda}</span>
        </p>
        <div className="flex shrink-0 items-center gap-1">
          <BotaoAmpliacao rotulo="Foto anterior" aoClicar={() => aoTrocar(indice - 1)}>←</BotaoAmpliacao>
          <BotaoAmpliacao rotulo="Próxima foto" aoClicar={() => aoTrocar(indice + 1)}>→</BotaoAmpliacao>
          <BotaoAmpliacao refBotao={fecharRef} rotulo="Fechar" aoClicar={aoFechar} texto>
            Fechar
          </BotaoAmpliacao>
        </div>
      </motion.div>
    </motion.div>
  );
}

function BotaoAmpliacao({
  children,
  rotulo,
  aoClicar,
  refBotao,
  texto = false,
}: {
  children: ReactNode;
  rotulo: string;
  aoClicar: () => void;
  refBotao?: Ref<HTMLButtonElement>;
  texto?: boolean;
}) {
  return (
    <motion.button
      ref={refBotao}
      type="button"
      aria-label={rotulo}
      onClick={aoClicar}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.92 }}
      transition={springFirme}
      className={`legenda flex h-11 items-center justify-center border border-papel/25 transition-colors hover:border-cobre hover:text-cobre ${texto ? 'px-4' : 'w-11 text-base'}`}
    >
      {children}
    </motion.button>
  );
}
