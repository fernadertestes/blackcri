import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { editorial, type FotoEditorial } from '../content/fotos';
import { FotoParallax, Linhas, ease, useMidia, useParallaxY } from '../lib/movimento';
import { useTom } from '../lib/tons';
import { Cabecalho, MascaraFoto } from './Manifesto';

/**
 * Editorial — Presença.
 * Desktop: seção fixa durante ~2,4 telas de rolagem, três "páginas":
 *   0.00–0.30  a horizontal ocupa a composição
 *   0.12–0.40  o retrato vertical entra por máscara, com escala
 *   0.32–0.60  a horizontal recua
 *   0.55–0.82  o detalhe entra pela lateral e assume o foco; o retrato recua
 *   0.82–1.00  pausa e liberação
 * Celular ou movimento reduzido: imagens verticais em fluxo natural.
 */
export function Sequencia() {
  const { cinema } = useMidia();
  if (editorial.length === 0) return null;
  return cinema && editorial.length >= 3 ? <SequenciaFixa /> : <SequenciaFluxo />;
}

const descricao =
  'Parede escura, luz de janela, rua ao sol. Três fotografias lidas como páginas de revista: a presença, o olhar, a cidade.';

function SequenciaFixa() {
  const secao = useTom<HTMLElement>('preto');
  const { scrollYProgress } = useScroll({ target: secao, offset: ['start start', 'end end'] });
  // suaviza a leitura da rolagem sem atrasar demais
  const p = useSpring(scrollYProgress, { stiffness: 180, damping: 34, mass: 0.4 });
  const [pagina, setPagina] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const n = v < 0.3 ? 0 : v < 0.6 ? 1 : 2;
    setPagina((a) => (a === n ? a : n));
  });

  const [f1, f2, f3] = editorial;

  // 1 · horizontal
  const s1 = useTransform(p, [0.32, 0.6], [1, 0.84]);
  const x1 = useTransform(p, [0.32, 0.6], ['0vw', '-5vw']);
  const sombra1 = useTransform(p, [0.32, 0.6], [0, 0.62]);
  // 2 · vertical
  const m2 = useTransform(p, [0.12, 0.4], ['100%', '0%']);
  const c2 = useTransform(p, [0.12, 0.4], ['-100%', '0%']);
  const z2 = useTransform(p, [0.12, 0.45], [1.18, 1]);
  const s2 = useTransform(p, [0.6, 0.85], [1, 0.88]);
  const x2 = useTransform(p, [0.6, 0.85], ['0vw', '3vw']);
  const sombra2 = useTransform(p, [0.6, 0.85], [0, 0.55]);
  // 3 · detalhe
  const m3 = useTransform(p, [0.55, 0.82], ['-100%', '0%']);
  const c3 = useTransform(p, [0.55, 0.82], ['100%', '0%']);
  const z3 = useTransform(p, [0.55, 0.9], [1.16, 1]);
  const y3 = useTransform(p, [0.55, 1], ['4vh', '-2vh']);

  const barra = useTransform(p, [0, 1], [0, 1]);

  return (
    <section ref={secao} id="editorial" aria-labelledby="editorial-titulo" className="tom relative h-[340vh] bg-preto">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Página 1 */}
        <motion.figure className="absolute left-[4vw] top-[15vh] h-[57vh] w-[58vw] origin-left" style={{ scale: s1, x: x1 }}>
          <FotoParallax foto={f1} sizes="60vw" intensidade={5} progresso={p} className="h-full w-full" />
          <motion.div aria-hidden className="absolute inset-0 bg-preto" style={{ opacity: sombra1 }} />
          <Legenda foto={f1} />
        </motion.figure>

        {/* Página 2 — entra por máscara */}
        <motion.figure className="absolute right-[9vw] top-[12vh] aspect-[4/5] h-[66vh] origin-right" style={{ scale: s2, x: x2 }}>
          <div className="h-full w-full overflow-hidden">
            <motion.div className="h-full w-full overflow-hidden" style={{ y: m2 }}>
              <motion.div className="h-full w-full" style={{ y: c2, scale: z2 }}>
                <img src={f2.src} srcSet={f2.srcSet} sizes="34vw" width={f2.largura} height={f2.altura} alt={f2.alt} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
              </motion.div>
            </motion.div>
          </div>
          <motion.div aria-hidden className="absolute inset-0 bg-preto" style={{ opacity: sombra2 }} />
          <Legenda foto={f2} progresso={p} faixa={[0.3, 0.4]} />
        </motion.figure>

        {/* Página 3 — entra pela lateral e assume o foco */}
        <motion.figure className="absolute left-[34vw] top-[14vh] aspect-[4/5] h-[68vh]" style={{ y: y3 }}>
          <div className="h-full w-full overflow-hidden">
            <motion.div className="h-full w-full overflow-hidden" style={{ x: m3 }}>
              <motion.div className="h-full w-full" style={{ x: c3, scale: z3 }}>
                <img src={f3.src} srcSet={f3.srcSet} sizes="40vw" width={f3.largura} height={f3.altura} alt={f3.alt} loading="lazy" decoding="async" className="h-full w-full object-cover object-[50%_20%]" />
              </motion.div>
            </motion.div>
          </div>
          <Legenda foto={f3} progresso={p} faixa={[0.74, 0.84]} />
        </motion.figure>

        {/* Cabeçalho e título da página atual */}
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto max-w-[1600px] px-10 pt-24">
          <Cabecalho n="Nº 02" rotulo={`Editorial · Ed. 01`} escuro />
        </div>
        <div className="absolute bottom-[5vh] left-[4vw]">
          <p className="legenda mb-3 text-areia">Editorial</p>
          <h2 id="editorial-titulo" className="titulo relative h-[0.92em] overflow-hidden text-[clamp(4rem,9vw,9.5rem)] text-papel">
            <span className="sr-only">Presença, Atitude, Detalhe</span>
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={pagina}
                aria-hidden
                className="block"
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.8, ease }}
              >
                {editorial[pagina].titulo}
              </motion.span>
            </AnimatePresence>
          </h2>
        </div>

        {/* Indicador de progresso */}
        <div aria-hidden className="absolute right-[3vw] top-1/2 flex -translate-y-1/2 flex-col items-center gap-4">
          <span className="legenda tabular-nums text-papel">{String(pagina + 1).padStart(2, '0')}</span>
          <span className="relative block h-32 w-px bg-papel/20">
            <motion.span className="absolute inset-0 origin-top bg-cobre" style={{ scaleY: barra }} />
          </span>
          <span className="legenda tabular-nums text-papel/50">03</span>
        </div>
      </div>
    </section>
  );
}

function Legenda({ foto, progresso, faixa }: { foto: FotoEditorial; progresso?: MotionValue<number>; faixa?: [number, number] }) {
  const conteudo = (
    <>
      <span className="legenda text-papel">{foto.legenda}</span>
      <span className="legenda text-areia/60">Ed. 01</span>
    </>
  );
  const classe = 'absolute -bottom-8 left-0 right-0 flex justify-between';
  if (!progresso || !faixa) return <figcaption className={classe}>{conteudo}</figcaption>;
  return <LegendaAnimada progresso={progresso} faixa={faixa} className={classe}>{conteudo}</LegendaAnimada>;
}

function LegendaAnimada({ progresso, faixa, className, children }: { progresso: MotionValue<number>; faixa: [number, number]; className: string; children: ReactNode }) {
  const opacity = useTransform(progresso, faixa, [0, 1]);
  const y = useTransform(progresso, faixa, [10, 0]);
  return <motion.figcaption style={{ opacity, y }} className={className}>{children}</motion.figcaption>;
}

const fluxo = {
  amplo: { box: 'col-span-12 md:col-span-9', img: 'aspect-[4/5] md:aspect-[16/10] object-[80%_0%] md:object-center' },
  vertical: { box: 'col-span-11 col-start-2 md:col-span-5 md:col-start-7', img: 'aspect-[4/5] object-top' },
  vertical2: { box: 'col-span-11 md:col-span-5 md:col-start-2', img: 'aspect-[4/5] object-top' },
  detalhe: { box: 'col-span-9 md:col-span-4 md:col-start-2', img: 'aspect-[3/4]' },
};

function SequenciaFluxo() {
  const secao = useTom<HTMLElement>('preto');
  return (
    <section ref={secao} id="editorial" aria-labelledby="editorial-titulo" className="tom relative bg-preto">
      <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-24 md:px-10 md:pb-36 md:pt-32">
        <Cabecalho n="Nº 02" rotulo="Editorial · Ed. 01" escuro />
        <h2 id="editorial-titulo" className="titulo mt-10 text-[clamp(3.6rem,17vw,10rem)] text-papel">
          <Linhas linhas={['Presença']} />
        </h2>
        <p className="mt-6 max-w-sm text-base leading-relaxed text-papel/75">{descricao}</p>

        <div className="mt-14 grid grid-cols-12 gap-x-5 gap-y-16">
          {editorial.map((f, i) => (
            <ItemFluxo key={f.legenda} f={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ItemFluxo({ f, i }: { f: FotoEditorial; i: number }) {
  const c = f.formato === 'vertical' && i === 2 ? fluxo.vertical2 : fluxo[f.formato];
  const leg = useParallaxY<HTMLElement>(10);
  return (
    <figure className={c.box}>
      <MascaraFoto>
        <img src={f.src} srcSet={f.srcSet} sizes="(min-width: 768px) 60vw, 92vw" width={f.largura} height={f.altura} alt={f.alt} loading="lazy" decoding="async" className={`w-full object-cover ${c.img}`} />
      </MascaraFoto>
      <motion.figcaption ref={leg.ref} style={{ y: leg.y }} className="mt-3 flex justify-between border-t border-papel/15 pt-3">
        <span className="legenda text-papel">{f.legenda}</span>
        <span className="legenda text-areia/60">Ed. 01</span>
      </motion.figcaption>
    </figure>
  );
}
