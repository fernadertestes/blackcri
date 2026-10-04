import { useRef } from 'react';
import { motion, useScroll, useTransform, type TargetAndTransition } from 'motion/react';
import { fotoCapa } from '../content/fotos';
import { textos } from '../content/site';
import { Linhas, Magnetico, ease, useMidia } from '../lib/movimento';
import { useTom } from '../lib/tons';

/**
 * Coreografia de abertura (segundos):
 * 0.00 foto (opacidade + escala) · 0.55 BLACK · 0.80 CRIOULO · 1.15 linha de crédito
 * 1.35 frase · 1.45 menu (Navegacao) · 1.50 links · 1.90 indicação de rolagem
 * Nada bloqueia a navegação: a página já pode rolar desde o primeiro quadro.
 */
export function Capa() {
  const tom = useTom<HTMLElement>('carvao');
  const alvo = useRef<HTMLElement>(null);
  const { reduzido, leve } = useMidia();
  const ini = (d: TargetAndTransition) => (reduzido ? false : d);

  // Profundidade: imagem se aproxima, nome sobe, fundo desce — velocidades diferentes.
  const { scrollYProgress: p } = useScroll({ target: alvo, offset: ['start start', 'end start'] });
  const escalaFoto = useTransform(p, [0, 1], [1, leve ? 1 : 1.1]);
  const sombra = useTransform(p, [0, 1], [0, 0.55]);
  const yNome = useTransform(p, [0, 1], [0, leve ? 0 : -150]);
  const opNome = useTransform(p, [0, 0.75], [1, leve ? 1 : 0.15]);
  const yFundo = useTransform(p, [0, 1], [0, leve ? 0 : 140]);
  const yCreditos = useTransform(p, [0, 1], [0, leve ? 0 : -60]);

  return (
    <section
      ref={(el) => {
        tom.current = el;
        alvo.current = el;
      }}
      id="inicio"
      aria-label="Capa"
      className="tom relative isolate h-[100svh] min-h-[560px] overflow-hidden bg-carvao"
    >
      {/* Fundo: palavra contornada que desce mais devagar que tudo */}
      <motion.span
        aria-hidden
        style={{ y: yFundo }}
        initial={ini({ opacity: 0 })}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 2, ease }}
        className="titulo contorno contorno-claro pointer-events-none absolute -left-[2vw] top-[8vh] hidden text-[30vw] leading-none lg:block"
      >
        COPA
      </motion.span>

      {/* Fotografia — entrada (externa) + aproximação na rolagem (interna, origem no topo para manter o rosto) */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={ini({ opacity: 0, scale: 1.12 })}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ opacity: { duration: 1.4, ease }, scale: { duration: 2.2, ease } }}
        style={{ transformOrigin: '50% 0%' }}
      >
        <motion.div className="absolute inset-0" style={{ scale: escalaFoto, transformOrigin: '50% 0%' }}>
          <img
            src={fotoCapa.src}
            srcSet={fotoCapa.srcSet}
            sizes="(min-width: 720px) 100vw, 1440px"
            width={fotoCapa.largura}
            height={fotoCapa.altura}
            alt={fotoCapa.alt}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[73%_0%] [filter:brightness(.94)_contrast(1.03)] sm:object-[72%_0%] lg:object-[100%_0%]"
          />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_10%,rgba(201,120,74,.18),transparent_55%)]" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-carvao via-carvao/35 via-30% to-transparent to-60%" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-carvao/50 via-transparent to-transparent lg:from-carvao/70 lg:via-carvao/15 lg:via-40%" />
        <motion.div aria-hidden className="absolute inset-0 bg-carvao" style={{ opacity: sombra }} />
      </motion.div>

      {/* Créditos editoriais */}
      <motion.div style={{ y: yCreditos }} className="absolute inset-x-0 top-24 mx-auto hidden max-w-[1600px] justify-between px-10 md:flex">
        <motion.p className="legenda text-papel/80" initial={ini({ opacity: 0, x: -10 })} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.6, duration: 0.9, ease }}>
          Acompanhante
        </motion.p>
        <motion.p className="legenda text-right text-papel/80" initial={ini({ opacity: 0, x: 10 })} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.7, duration: 0.9, ease }}>
          Massoterapeuta
          <br />
          Rua Santa Clara
        </motion.p>
      </motion.div>

      {/* Nome + chamada */}
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1600px] px-5 pb-8 md:px-10 md:pb-10">
        <motion.div style={{ y: yNome, opacity: opNome }}>
          <motion.p
            className="legenda mb-4 text-areia md:mb-6"
            initial={ini({ opacity: 0, y: 10 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.9, ease }}
          >
            {textos.linhaCapa}
          </motion.p>

          <h1 className="titulo text-papel" aria-label="Black Crioulo">
            <span aria-hidden>
              <Linhas
                aoCarregar
                linhas={textos.nome}
                atraso={0.55}
                intervalo={0.25}
                duracao={1.25}
                linhaClassName={(i) =>
                  `text-[clamp(4.6rem,25vw,9rem)] sm:text-[clamp(7rem,19vw,22rem)] lg:text-[clamp(10rem,16.5vw,20rem)] ${i === 1 ? 'md:pl-[10vw]' : ''}`
                }
              />
            </span>
          </h1>
        </motion.div>

        <div className="mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-xs font-sans text-lg leading-snug text-papel md:text-xl"
            initial={ini({ opacity: 0, y: 14 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 1, ease }}
          >
            “{textos.frase}”
          </motion.p>
          <motion.div
            className="flex items-end gap-8"
            initial={ini({ opacity: 0, y: 10 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.9, ease }}
          >
            <a href="#editorial" className="link-ed legenda text-papel">
              <Magnetico>
                Ver o corpo <span aria-hidden>↓</span>
              </Magnetico>
            </a>
            <a href="#contato" className="link-ed legenda text-papel">
              <Magnetico>Me chama</Magnetico>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Indicação de rolagem */}
      <motion.div
        aria-hidden
        className="absolute right-5 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3 md:right-10"
        initial={ini({ opacity: 0 })}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
      >
        <span className="legenda text-[0.6rem] text-papel/70 [writing-mode:vertical-rl]">Role</span>
        <span className="relative block h-16 w-px overflow-hidden bg-papel/25 md:h-24">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/3 bg-cobre"
            initial={reduzido ? false : { y: '-100%' }}
            animate={reduzido ? undefined : { y: ['-100%', '300%'] }}
            transition={{ delay: 2.1, duration: 2.4, ease, repeat: 2, repeatDelay: 0.6 }}
          />
        </span>
      </motion.div>
    </section>
  );
}
