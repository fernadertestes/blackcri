import { useScroll, useTransform, motion } from 'motion/react';
import { fotoInterludio } from '../content/fotos';
import { textos } from '../content/site';
import { FotoParallax, PalavraFundo, Palavras, useMidia, useParallaxY } from '../lib/movimento';
import { useTom } from '../lib/tons';

/** Assinatura: noite. Luz baixa, foto em plano profundo, palavras entrando devagar. */
export function Interludio() {
  const secao = useTom<HTMLElement>('preto');
  const { leve } = useMidia();
  const { scrollYProgress: p } = useScroll({ target: secao, offset: ['start end', 'end start'] });
  const escala = useTransform(p, [0, 1], leve ? [1, 1] : [1.14, 1]);
  const luz = useTransform(p, [0.15, 0.5, 0.9], [0.35, 0.85, 0.45]);
  const rotulo = useParallaxY<HTMLParagraphElement>(30);

  return (
    <section ref={secao} aria-label="Interlúdio" className="tom relative isolate flex min-h-[100svh] items-center overflow-hidden bg-preto">
      <motion.div className="absolute inset-0 -z-10 lg:left-[40%]" style={{ scale: escala, opacity: luz }}>
        <FotoParallax
          foto={fotoInterludio}
          sizes="100vw"
          intensidade={9}
          className="h-full w-full"
          imgClassName="object-[50%_12%] [filter:saturate(.95)_brightness(.8)]"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0b0a09_0%,rgba(11,10,9,.7)_45%,rgba(11,10,9,.1)_100%)]" />
      <PalavraFundo alvo={secao} texto="Noite" de="30%" para="-10%" className="contorno contorno-claro -z-10 bottom-[-6vw] right-0 text-[30vw]" />

      <div className="mx-auto w-full max-w-[1600px] px-5 py-32 md:px-10">
        <motion.p ref={rotulo.ref} style={{ y: rotulo.y }} className="legenda mb-10 text-areia">
          Interlúdio — Noite
        </motion.p>
        <p className="titulo max-w-[12ch] text-[clamp(3.8rem,13vw,15rem)] text-papel">
          <Palavras texto={textos.interludio} intervalo={0.16} amount={0.6} destaque={(_, i, n) => (i === n - 1 ? 'text-cobre' : undefined)} />
        </p>
      </div>
    </section>
  );
}
