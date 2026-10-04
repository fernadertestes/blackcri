import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { textos } from '../content/site';
import { Linhas, Magnetico, useMidia } from '../lib/movimento';
import { useTom } from '../lib/tons';

/** Assinatura: fecho. O nome sobe por máscara e se assenta com a rolagem. */
export function Rodape() {
  const tom = useTom<HTMLElement>('preto');
  const nome = useRef<HTMLDivElement>(null);
  const { leve } = useMidia();
  const { scrollYProgress } = useScroll({ target: nome, offset: ['start end', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], leve ? ['0%', '0%'] : ['-4%', '0%']);

  return (
    <footer ref={tom} className="tom relative overflow-hidden bg-preto">
      <div className="mx-auto max-w-[1600px] px-5 pb-8 pt-16 md:px-10 md:pt-24">
        <motion.div ref={nome} style={{ x }}>
          <p className="titulo text-[clamp(3.4rem,17.5vw,20rem)] leading-[0.82] text-papel md:whitespace-nowrap md:text-[12.4vw] 2xl:text-[12.4rem]" aria-label="Black Crioulo">
            <span aria-hidden>
              <Linhas linhas={[textos.nome.join(' ')]} duracao={1.3} />
            </span>
          </p>
        </motion.div>
        <div className="mt-10 flex flex-col gap-4 border-t border-papel/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="legenda text-areia">Rua Santa Clara · Copacabana</p>
          <p className="legenda text-papel/50">© {new Date().getFullYear()} Black Crioulo</p>
          <a href="#inicio" className="link-ed legenda self-start text-papel sm:self-auto">
            <Magnetico>
              Voltar ao início <span aria-hidden className="inline-block">↑</span>
            </Magnetico>
          </a>
        </div>
      </div>
    </footer>
  );
}
