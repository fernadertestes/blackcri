import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { fotoPraia, fotoTerraco, type Foto } from '../content/fotos';
import { textos } from '../content/site';
import { FotoParallax, Linhas, useMidia, useParallaxY } from '../lib/movimento';

/**
 * A cidade — assinatura: respiro em dois tempos.
 * Cada painel: foto que desliza e se aproxima; frase por linha sobre a base escurecida.
 */
export function Cidade() {
  const [l1, l2] = textos.cidade;
  return (
    <section aria-label="A cidade" className="relative bg-preto">
      <h2 className="sr-only">{textos.cidade.join(' ')}</h2>
      <Painel foto={fotoPraia} linha={l1} legenda="Rua Santa Clara · Copacabana" posicao="object-[78%_0%] md:object-[70%_0%]" origem="70% 30%" />
      <Painel foto={fotoTerraco} linha={l2} legenda="Ativo · 24 cm, pesado e grossão" posicao="object-[22%_0%] md:object-[30%_0%]" origem="30% 30%" cobre direita />
    </section>
  );
}

function Painel({
  foto,
  linha,
  legenda,
  posicao,
  origem,
  cobre = false,
  direita = false,
}: {
  foto: Foto;
  linha: string;
  legenda: string;
  posicao: string;
  origem: string;
  cobre?: boolean;
  direita?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { leve } = useMidia();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const escala = useTransform(p, [0, 1], leve ? [1, 1] : [1.12, 1]);
  const leg = useParallaxY<HTMLParagraphElement>(24);

  return (
    <div ref={ref} className="relative h-[86svh] min-h-[480px] overflow-hidden md:h-[100svh]">
      <motion.div className="absolute inset-0" style={{ scale: escala, transformOrigin: origem }}>
        <FotoParallax foto={foto} sizes="100vw" intensidade={7} className="h-full w-full" imgClassName={posicao} />
      </motion.div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-preto via-preto/60 to-transparent" />
      <div aria-hidden className={`absolute inset-0 ${direita ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-preto/50 via-transparent to-transparent`} />

      <div className={`absolute inset-x-0 bottom-0 mx-auto flex max-w-[1600px] flex-col px-5 pb-8 md:px-10 md:pb-12 ${direita ? 'md:items-end md:text-right' : ''}`}>
        <p aria-hidden className={`titulo text-[clamp(3rem,8vw,8.5rem)] ${cobre ? 'text-cobre' : 'text-papel'}`}>
          <Linhas linhas={[linha]} duracao={1.2} />
        </p>
        <motion.p ref={leg.ref} style={{ y: leg.y }} className="legenda mt-6 text-areia">
          {legenda}
        </motion.p>
      </div>
    </div>
  );
}
