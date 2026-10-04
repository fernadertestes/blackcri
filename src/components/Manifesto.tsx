import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { fotoPulso } from '../content/fotos';
import { textos } from '../content/site';
import { FotoParallax, Linhas, PalavraFundo, Palavras, Revelar, useMidia, useParallaxY } from '../lib/movimento';
import { useTom } from '../lib/tons';

/** Assinatura: calma. Palavras entram uma a uma; o destaque cresce com a rolagem. */
export function Manifesto() {
  const m = textos.manifesto;
  const secao = useTom<HTMLElement>('papel');
  const { leve, reduzido } = useMidia();
  const legenda = useParallaxY<HTMLElement>(14);

  const destaque = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pd } = useScroll({ target: destaque, offset: ['start end', 'center center'] });
  const escala = useTransform(pd, [0, 1], leve ? [1, 1] : [0.86, 1]);
  const x = useTransform(pd, [0, 1], leve ? ['0%', '0%'] : ['6%', '0%']);

  return (
    <section ref={secao} id="manifesto" aria-labelledby="manifesto-titulo" className="tom papel sobre-claro relative overflow-hidden">
      <PalavraFundo alvo={secao} texto="Ativo" de="10%" para="-35%" className="contorno contorno-escuro top-[34%] text-[38vw]" />

      <div className="relative mx-auto max-w-[1600px] px-5 pb-24 pt-24 md:px-10 md:pb-40 md:pt-36">
        <Cabecalho n="Nº 01" rotulo="Sobre" />

        <div className="mt-14 grid grid-cols-12 gap-x-5 gap-y-12 md:mt-24">
          <h2 id="manifesto-titulo" className="titulo col-span-12 text-[clamp(3.2rem,9.5vw,10rem)] !leading-[0.92] lg:col-span-10">
            <Palavras texto={m.titulo} intervalo={0.07} />
          </h2>

          <figure className="col-span-7 sm:col-span-4 md:col-span-3 md:col-start-2 md:mt-10">
            <MascaraFoto>
              <FotoParallax foto={fotoPulso} sizes="(min-width: 768px) 25vw, 58vw" intensidade={5} className="aspect-[15/16]" />
            </MascaraFoto>
            <motion.figcaption ref={legenda.ref} style={{ y: legenda.y }} className="legenda mt-3 flex justify-between gap-3 whitespace-nowrap text-areia-escura">
              <span>1,80 m · 75 kg</span>
              <span>Ed. 01</span>
            </motion.figcaption>
          </figure>

          <div className="col-span-12 sm:col-span-8 md:col-span-6 md:col-start-7 md:mt-10">
            <Revelar atraso={0.1}>
              <p className="text-lg leading-relaxed text-carvao/85 md:text-[1.375rem] md:leading-[1.6]">
                <span className="titulo float-left mr-3 mt-1 text-[4.2rem] leading-[0.8] text-cobre-escuro md:text-[5.4rem]">{m.texto.charAt(0)}</span>
                {m.texto.slice(1)}
              </p>
            </Revelar>
            <Revelar atraso={0.25} className="mt-10 flex items-center gap-4">
              <span className="h-px w-12 bg-carvao/40" aria-hidden />
              <span className="legenda text-areia-escura">{m.chamada}</span>
            </Revelar>
          </div>
        </div>

        <Revelar atraso={0.15} className="mt-16 md:mt-24">
          <ul className="grid gap-x-10 gap-y-4 md:grid-cols-2">
            {m.itens.map((item) => (
              <li key={item} className="border-t border-carvao/15 pt-3 text-base leading-snug text-carvao/85 md:text-lg">
                {item}
              </li>
            ))}
          </ul>
        </Revelar>

        <motion.div ref={destaque} style={{ scale: escala, x }} className="relative mt-24 origin-right md:mt-40">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[46%] overflow-hidden md:w-[42%]" aria-hidden>
            <video
              className="h-full w-full object-cover"
              src="/fundo.mp4?v=1080"
              autoPlay={!reduzido}
              muted
              loop
              playsInline
              preload="auto"
              ref={(el) => {
                if (el) el.muted = true;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent from-55% to-papel" />
          </div>
          <p className="titulo relative z-10 text-right text-[clamp(3.6rem,15vw,17rem)]">
            <Linhas linhas={[m.destaque[0], <span className="text-cobre-escuro">{m.destaque[1]}</span>]} intervalo={0.16} />
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/** Cabeçalho de revista: a linha se desenha e o número desliza. */
export function Cabecalho({ n, rotulo, escuro = false }: { n: string; rotulo: string; escuro?: boolean }) {
  const { reduzido } = useMidia();
  const linha = escuro ? 'bg-papel/15' : 'bg-carvao/20';
  return (
    <motion.div
      className="flex items-center gap-4 pb-4"
      initial={reduzido ? false : 'fora'}
      whileInView="dentro"
      viewport={{ once: true, amount: 0.8 }}
    >
      <span className="overflow-hidden">
        <motion.span className={`legenda block ${escuro ? 'text-areia' : ''}`} variants={{ fora: { y: '100%' }, dentro: { y: 0 } }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          {n}
        </motion.span>
      </span>
      <motion.span
        aria-hidden
        className={`h-px flex-1 origin-left ${linha}`}
        variants={{ fora: { scaleX: 0 }, dentro: { scaleX: 1 } }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      />
      <span className="overflow-hidden">
        <motion.span className={`legenda block ${escuro ? 'text-areia' : 'text-areia-escura'}`} variants={{ fora: { y: '100%' }, dentro: { y: 0 } }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}>
          {rotulo}
        </motion.span>
      </span>
    </motion.div>
  );
}

/** Revela uma foto por máscara: moldura sobe, imagem desce em contrapartida. Só transform. */
export function MascaraFoto({ children, direcao = 'cima', className = '' }: { children: ReactNode; direcao?: 'cima' | 'lado'; className?: string }) {
  const { reduzido } = useMidia();
  const fora = direcao === 'cima' ? { y: '100%' } : { x: '-100%' };
  const contra = direcao === 'cima' ? { y: '-100%', scale: 1.12 } : { x: '100%', scale: 1.12 };
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={reduzido ? false : 'fora'}
      whileInView="dentro"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
    >
      <motion.div className="h-full overflow-hidden" variants={{ fora, dentro: { x: 0, y: 0 } }} transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}>
        <motion.div className="h-full" variants={{ fora: contra, dentro: { x: 0, y: 0, scale: 1 } }} transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
