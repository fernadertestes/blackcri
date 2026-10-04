import { motion, useScroll, useTransform } from 'motion/react';
import { fotoPraia } from '../content/fotos';
import { textos } from '../content/site';
import { FotoParallax, Linhas, useMidia, useParallaxY } from '../lib/movimento';
import { useTom } from '../lib/tons';

/**
 * Assinatura: respiro. A cidade entra em plano aberto, a foto desliza e
 * se aproxima; a frase da capa volta sobre o mar, por linhas.
 * Celular: o enquadramento acompanha o personagem.
 */
export function Cidade() {
  const secao = useTom<HTMLElement>('preto');
  const { leve } = useMidia();
  const { scrollYProgress: p } = useScroll({ target: secao, offset: ['start end', 'end start'] });
  const escala = useTransform(p, [0, 1], leve ? [1, 1] : [1.12, 1]);
  const legenda = useParallaxY<HTMLParagraphElement>(24);
  const [l1, l2] = textos.frase.split('. ').map((t, i, a) => (i < a.length - 1 ? `${t}.` : t));

  return (
    <section ref={secao} aria-label="A cidade" className="relative overflow-hidden bg-preto">
      <div className="relative h-[86svh] min-h-[480px] overflow-hidden md:h-[100svh]">
        <motion.div className="absolute inset-0" style={{ scale: escala, transformOrigin: '70% 30%' }}>
          <FotoParallax
            foto={fotoPraia}
            sizes="100vw"
            intensidade={7}
            className="h-full w-full"
            imgClassName="object-[78%_0%] md:object-[70%_0%]"
          />
        </motion.div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-preto via-preto/60 to-transparent" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-preto/50 via-transparent to-transparent" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1600px] px-5 pb-8 md:px-10 md:pb-12">
          <p className="titulo text-[clamp(3rem,8vw,8.5rem)] text-papel" aria-label={textos.frase}>
            <span aria-hidden>
              <Linhas linhas={[l1, <span className="text-cobre">{l2}</span>]} intervalo={0.18} duracao={1.2} />
            </span>
          </p>
          <motion.p ref={legenda.ref} style={{ y: legenda.y }} className="legenda mt-6 text-areia">
            Rio de Janeiro · fim de tarde
          </motion.p>
        </div>
      </div>
    </section>
  );
}
