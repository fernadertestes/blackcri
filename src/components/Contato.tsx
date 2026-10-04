import { motion } from 'motion/react';
import { fotoJanela } from '../content/fotos';
import { contato, textos } from '../content/site';
import { FotoParallax, Linhas, Magnetico, Revelar, ease, useMidia } from '../lib/movimento';
import { useTom } from '../lib/tons';
import { Cabecalho, MascaraFoto } from './Manifesto';

type Canal = { rotulo: string; valor: string; href: string; externo?: boolean };

/** Monta só os canais que têm dados reais preenchidos em content/site.ts */
function canais(): Canal[] {
  const lista: Canal[] = [];
  const email = contato.email.trim();
  const zap = contato.whatsapp.replace(/\D/g, '');
  const insta = contato.instagram.trim().replace(/^@/, '');
  const ag = contato.agencia;
  if (email) lista.push({ rotulo: 'E-mail', valor: email, href: `mailto:${email}` });
  if (zap) lista.push({ rotulo: 'WhatsApp', valor: `+${zap}`, href: `https://wa.me/${zap}`, externo: true });
  if (insta) lista.push({ rotulo: 'Instagram', valor: `@${insta}`, href: `https://instagram.com/${insta}`, externo: true });
  if (ag.nome.trim() && ag.url.trim()) lista.push({ rotulo: 'Agência', valor: ag.nome.trim(), href: ag.url.trim(), externo: true });
  return lista;
}

/** Assinatura: convite. Título por linhas, foto revelada por máscara, canais em sequência. */
export function Contato() {
  const c = textos.contato;
  const lista = canais();
  const secao = useTom<HTMLElement>('papel');
  const { reduzido } = useMidia();
  const [l1, l2] = splitTitulo(c.titulo);

  return (
    <section ref={secao} id="contato" aria-labelledby="contato-titulo" className="tom papel sobre-claro relative overflow-hidden">
      {/* Foto da janela: no desktop ocupa a seção e o texto pousa na parede clara */}
      <div className="relative aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto">
        <MascaraFoto className="h-full w-full">
          <FotoParallax foto={fotoJanela} sizes="100vw" intensidade={5} className="aspect-[16/10] w-full lg:aspect-auto lg:h-full" imgClassName="object-left" />
        </MascaraFoto>
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-papel/80 via-papel/35 via-45% to-transparent to-70% lg:block" />
      </div>

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-12 gap-x-5 gap-y-12 px-5 py-20 md:px-10 lg:min-h-[100svh] lg:content-center lg:py-28">
        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <Cabecalho n="Nº 04" rotulo="Contato" />
        </div>

        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <h2 id="contato-titulo" className="titulo text-[clamp(3.4rem,10vw,11rem)] lg:text-[clamp(3.6rem,6.4vw,7.6rem)]" aria-label={c.titulo}>
            <span aria-hidden>
              <Linhas linhas={[l1, l2]} intervalo={0.14} />
            </span>
          </h2>
          <Revelar atraso={0.2} className="mt-8 max-w-md">
            <p className="text-xl leading-snug md:text-2xl">{c.texto}</p>
            <p className="legenda mt-4 text-carvao/65">{c.escopo}</p>
          </Revelar>

          <div className="mt-14">
            {lista.length > 0 ? (
              <motion.ul
                className="max-w-lg border-t border-carvao/20"
                initial={reduzido ? false : 'fora'}
                whileInView="dentro"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ staggerChildren: 0.08 }}
              >
                {lista.map((k) => (
                  <motion.li
                    key={k.rotulo}
                    className="border-b border-carvao/20"
                    variants={{ fora: { opacity: 0, x: -16 }, dentro: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.7, ease }}
                  >
                    <a
                      href={k.href}
                      {...(k.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex items-baseline justify-between gap-6 py-5 transition-colors hover:text-cobre-escuro"
                    >
                      <span className="legenda text-areia-escura">{k.rotulo}</span>
                      <Magnetico forca={4}>
                        <span className="text-lg md:text-xl">
                          {k.valor}
                          <span aria-hidden className="ml-3 inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
                          {k.externo && <span className="sr-only"> (abre em nova aba)</span>}
                        </span>
                      </Magnetico>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <motion.p
                className="flex items-center gap-4 text-base text-carvao/70"
                initial={reduzido ? false : 'fora'}
                whileInView="dentro"
                viewport={{ once: true }}
              >
                <motion.span
                  className="block h-px w-10 origin-left bg-cobre-escuro"
                  aria-hidden
                  variants={{ fora: { scaleX: 0 }, dentro: { scaleX: 1 } }}
                  transition={{ duration: 0.9, ease }}
                />
                <motion.span variants={{ fora: { opacity: 0, x: -8 }, dentro: { opacity: 1, x: 0 } }} transition={{ duration: 0.7, ease, delay: 0.3 }}>
                  {c.emBreve}
                </motion.span>
              </motion.p>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

/** Divide o título em duas linhas equilibradas para a máscara. */
function splitTitulo(t: string): [string, string] {
  const p = t.split(' ');
  const meio = Math.ceil(p.length / 2);
  return [p.slice(0, meio).join(' '), p.slice(meio).join(' ')];
}
