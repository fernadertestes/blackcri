import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { looks, type Look } from '../content/fotos';
import { Linhas, ease, useMidia } from '../lib/movimento';
import { useTom } from '../lib/tons';
import { Cabecalho } from './Manifesto';

/**
 * Guarda-roupa — assinatura: travelling lateral.
 * Desktop: a seção fica presa e a rolagem vertical vira um deslocamento
 * horizontal dos looks, como folhear um lookbook. Cada foto desliza dentro
 * da moldura no sentido contrário (profundidade).
 * Celular ou movimento reduzido: faixa com rolagem horizontal nativa e encaixe.
 */
export function Looks() {
  const { cinema } = useMidia();
  if (looks.length === 0) return null;
  return cinema ? <LooksFixo /> : <LooksFaixa />;
}

const intro = '1,80 m, 75 kg, mega dotado de 24 cm, pesado e grossão';
const tituloLooks = ['5 motivos', 'pra sair', 'comigo'] as const;

function LooksFixo() {
  const secao = useTom<HTMLElement>('areia');
  const trilho = useRef<HTMLDivElement>(null);
  const [curso, setCurso] = useState(0);

  // mede quanto o trilho excede a tela (recalcula ao redimensionar)
  useLayoutEffect(() => {
    const el = trilho.current;
    if (!el) return;
    const medir = () => setCurso(Math.max(0, el.scrollWidth - window.innerWidth));
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    window.addEventListener('resize', medir);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', medir);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: secao, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 160, damping: 32, mass: 0.4 });
  const x = useTransform(p, (v) => -v * curso);
  const barra = useTransform(p, [0, 1], [0, 1]);

  return (
    <section
      ref={secao}
      id="looks"
      aria-labelledby="looks-titulo"
      className="sobre-claro relative bg-areia text-carvao"
      style={{ height: `calc(100svh + ${curso}px)` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1600px] px-10 pt-16">
          <Cabecalho n="Nº 03" rotulo="5 motivos pra sair comigo" />
        </div>

        <motion.div ref={trilho} className="flex w-max items-end gap-[3vw] px-10 pb-8 pt-6" style={{ x }}>
          {/* painel de abertura */}
          <div className="flex h-[56vh] w-[min(42vw,26rem)] shrink-0 flex-col justify-end pr-[2vw]">
            <h2 id="looks-titulo" className="titulo text-[clamp(2.7rem,4.4vw,4.6rem)]">
              <Linhas linhas={tituloLooks} />
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-carvao/80">{intro}</p>
            <p className="legenda mt-8 flex items-center gap-3 text-carvao/70">
              <span aria-hidden className="h-px w-10 bg-carvao/50" /> Role para folhear
            </p>
          </div>

          {looks.map((l, i) => (
            <CartaoLook key={l.n} look={l} i={i} progresso={p} />
          ))}
        </motion.div>

        <div aria-hidden className="mx-auto flex w-full max-w-[1600px] items-center gap-4 px-10">
          <span className="legenda tabular-nums text-carvao/70">01</span>
          <span className="relative h-px flex-1 bg-carvao/20">
            <motion.span className="absolute inset-0 origin-left bg-cobre-escuro" style={{ scaleX: barra }} />
          </span>
          <span className="legenda tabular-nums text-carvao/70">{String(looks.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  );
}

function CartaoLook({ look, i, progresso }: { look: Look; i: number; progresso: MotionValue<number> }) {
  // a foto desliza dentro da moldura no sentido contrário ao trilho
  const xFoto = useTransform(progresso, [0, 1], ['4%', '-4%']);
  const alto = i % 2 === 0;
  return (
    <motion.figure
      className={`group relative shrink-0 ${alto ? '' : 'self-start mt-[4vh]'}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease }}
    >
      <div className={`relative aspect-[4/3] overflow-hidden bg-carvao ${alto ? 'h-[48vh]' : 'h-[40vh]'}`}>
        <motion.div className="absolute inset-y-0 -left-[6%] -right-[6%]" style={{ x: xFoto }}>
          <img
            src={look.src}
            srcSet={look.srcSet}
            sizes="64vh"
            width={look.largura}
            height={look.altura}
            alt={look.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
          />
        </motion.div>
        <span aria-hidden className="titulo absolute left-4 top-3 text-[clamp(3rem,6vh,4.5rem)] leading-none text-papel mix-blend-difference">
          {look.n}
        </span>
      </div>
    </motion.figure>
  );
}

function LooksFaixa() {
  const secao = useTom<HTMLElement>('areia');
  return (
    <section ref={secao} id="looks" aria-labelledby="looks-titulo" className="sobre-claro relative bg-areia py-20 text-carvao md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Cabecalho n="Nº 03" rotulo="5 motivos pra sair comigo" />
        <h2 id="looks-titulo" className="titulo mt-8 text-[clamp(2.8rem,12vw,5.5rem)]">
          <Linhas linhas={tituloLooks} />
        </h2>
        <p className="mt-5 max-w-sm text-base leading-relaxed text-carvao/80">{intro}</p>
      </div>
      {/* rolagem horizontal nativa, só dentro da faixa */}
      <ul
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:thin] md:px-10"
        aria-label="Looks — deslize para o lado"
        tabIndex={0}
      >
        {looks.map((l) => (
          <li key={l.n} className="w-[72vw] max-w-[360px] shrink-0 snap-start">
            <div className="relative aspect-[4/3] overflow-hidden bg-carvao">
              <img src={l.src} srcSet={l.srcSet} sizes="72vw" width={l.largura} height={l.altura} alt={l.alt} loading="lazy" decoding="async" className="h-full w-full object-cover object-center" />
              <span aria-hidden className="titulo absolute left-3 top-2 text-5xl leading-none text-papel mix-blend-difference">{l.n}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
