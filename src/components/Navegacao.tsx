import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { ease, easeIO, useMidia } from '../lib/movimento';

const itens = [
  { href: '#manifesto', rotulo: 'Sobre', n: '01' },
  { href: '#editorial', rotulo: 'Corpo', n: '02' },
  { href: '#looks', rotulo: 'Looks', n: '03' },
  { href: '#galeria', rotulo: 'Fotos', n: '04' },
  { href: '#contato', rotulo: 'Chama', n: '05' },
];

/** Atraso da navegação na coreografia da capa. */
const ENTRADA = 1.45;

export function Navegacao() {
  const [aberto, setAberto] = useState(false);
  const [recolhido, setRecolhido] = useState(false);
  const botao = useRef<HTMLButtonElement>(null);
  const primeiroLink = useRef<HTMLAnchorElement>(null);
  const { reduzido } = useMidia();

  const { scrollY, scrollYProgress } = useScroll();
  const progresso = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  // Recolhe ao descer, reaparece ao subir. Só troca estado quando muda.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const anterior = scrollY.getPrevious() ?? 0;
    if (y < 120) setRecolhido(false);
    else if (y > anterior + 4) setRecolhido(true);
    else if (y < anterior - 4) setRecolhido(false);
  });

  useEffect(() => {
    if (!aberto) return;
    document.body.style.overflow = 'hidden';
    primeiroLink.current?.focus();
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAberto(false);
        botao.current?.focus();
      }
    };
    window.addEventListener('keydown', esc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', esc);
    };
  }, [aberto]);

  const oculto = recolhido && !aberto;

  return (
    <>
      <a
        href="#manifesto"
        className="sr-only z-[80] bg-papel px-4 py-2 text-sm text-carvao focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
      >
        Pular para o conteúdo
      </a>

      {/* Barra fina de progresso da leitura */}
      <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[75] h-[2px] origin-left bg-cobre" style={{ scaleX: progresso }} />

      {/* mix-blend-difference: a navegação se lê sobre foto clara, escura e papel */}
      <motion.header
        className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] mix-blend-difference"
        initial={reduzido ? false : { opacity: 0 }}
        animate={{ opacity: 1, y: oculto ? '-110%' : '0%' }}
        transition={{ opacity: { delay: ENTRADA, duration: 0.8, ease }, y: { duration: 0.6, ease: easeIO } }}
        onFocusCapture={() => setRecolhido(false)}
      >
        <nav
          aria-label="Principal"
          className="pointer-events-auto mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 text-[#f3eee6] md:px-10 md:py-7"
        >
          <a href="#inicio" className="titulo group text-2xl tracking-wide" aria-label="Black Crioulo — início">
            B
            <span
              className="mx-[0.06em] inline-block h-[0.12em] w-[0.5em] translate-y-[-0.3em] bg-current transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-[0.9em]"
              aria-hidden
            />
            C
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {itens.map((i, k) => (
              <motion.li
                key={i.href}
                initial={reduzido ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ENTRADA + 0.1 + k * 0.07, duration: 0.7, ease }}
              >
                <a href={i.href} className="link-ed legenda group !text-[0.7rem]">
                  <span className="inline-block opacity-50 transition-transform duration-500 group-hover:-translate-y-0.5">{i.n}</span>
                  {i.rotulo}
                </a>
              </motion.li>
            ))}
          </ul>

          <motion.button
            ref={botao}
            type="button"
            whileTap={{ scale: 0.94 }}
            className="legenda flex items-center gap-3 py-2 md:hidden"
            aria-expanded={aberto}
            aria-controls="menu-movel"
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setAberto((v) => !v)}
          >
            <span className="relative inline-block h-[1.2em] w-[5em] overflow-hidden text-right" aria-hidden>
              <AnimatePresence initial={false}>
                <motion.span
                  key={aberto ? 'f' : 'm'}
                  className="absolute inset-x-0 top-0 block"
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.45, ease }}
                >
                  {aberto ? 'Fechar' : 'Menu'}
                </motion.span>
              </AnimatePresence>
            </span>
            <span aria-hidden className="relative block h-3 w-6">
              <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${aberto ? 'top-1.5 rotate-45' : 'top-0.5'}`} />
              <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${aberto ? 'top-1.5 -rotate-45' : 'top-2.5'}`} />
            </span>
          </motion.button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {aberto && (
          <motion.div
            id="menu-movel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-hidden bg-carvao px-5 pb-10 pt-28 md:hidden"
            initial={reduzido ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduzido ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduzido ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.6, ease: easeIO, delay: 0.15 } }}
            transition={{ duration: 0.75, ease: easeIO }}
          >
            <span aria-hidden className="titulo contorno contorno-claro pointer-events-none absolute -right-6 bottom-20 text-[52vw] leading-none">
              RJ
            </span>
            <ul className="relative">
              {itens.map((i, k) => (
                <li key={i.href} className="overflow-hidden border-b border-papel/15">
                  <motion.a
                    ref={k === 0 ? primeiroLink : undefined}
                    href={i.href}
                    onClick={() => setAberto(false)}
                    className="flex items-baseline gap-4 py-3.5 transition-colors hover:text-cobre"
                    initial={reduzido ? false : { y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={reduzido ? undefined : { y: '-110%', transition: { duration: 0.4, ease: easeIO, delay: k * 0.03 } }}
                    transition={{ delay: 0.32 + k * 0.08, duration: 0.8, ease }}
                  >
                    <span className="legenda text-areia">{i.n}</span>
                    <span className="titulo text-[13vw] leading-[0.95]">{i.rotulo}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.p
              className="legenda relative text-areia"
              initial={reduzido ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease }}
            >
              Centro do Rio · garoto de programa · 35 anos
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
