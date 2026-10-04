/**
 * ============================================================
 *  FOTOGRAFIAS
 *  Originais em /fotos/originais (8 fotos). Os arquivos de
 *  src/assets/fotos são versões web e recortes dessas originais,
 *  gerados por `npm run fotos` (ver scripts/recortes.config.mjs).
 *
 *  `editorial` alimenta a sequência fixa (3 páginas).
 *  `galeria` alimenta a folha de contato com zoom e ampliação.
 *  Itens sem `src` ou sem `alt` são ignorados: o site nunca mostra
 *  espaço vazio nem imagem quebrada.
 * ============================================================
 */
import estudio720 from '../assets/fotos/estudio-720.webp';
import estudio1440 from '../assets/fotos/estudio-1440.webp';
import retrato720 from '../assets/fotos/retrato-720.webp';
import retrato1122 from '../assets/fotos/retrato-1122.webp';
import corredor720 from '../assets/fotos/corredor-720.webp';
import corredor1122 from '../assets/fotos/corredor-1122.webp';
import rua720 from '../assets/fotos/rua-720.webp';
import rua1122 from '../assets/fotos/rua-1122.webp';
import pb720 from '../assets/fotos/retrato-pb-720.webp';
import pb1122 from '../assets/fotos/retrato-pb-1122.webp';
import praia720 from '../assets/fotos/praia-720.webp';
import praia1440 from '../assets/fotos/praia-1440.webp';
import janela720 from '../assets/fotos/janela-720.webp';
import janela1440 from '../assets/fotos/janela-1440.webp';
import cadeira720 from '../assets/fotos/cadeira-720.webp';
import cadeira1122 from '../assets/fotos/cadeira-1122.webp';
import seq720 from '../assets/fotos/seq-01_estudio-720.webp';
import seq1422 from '../assets/fotos/seq-01_estudio-1422.webp';
import corrente600 from '../assets/fotos/detalhe_corrente-600.webp';
import pulso360 from '../assets/fotos/detalhe_pulso-rua-360.webp';

export type Foto = {
  src: string;
  srcSet?: string;
  largura: number;
  altura: number;
  alt: string;
};

export type FotoEditorial = Foto & {
  legenda: string; // ex.: '01 / PRESENÇA'
  titulo: string; // palavra da página na sequência
  formato: 'amplo' | 'vertical' | 'detalhe';
};

export type FotoGaleria = Foto & {
  legenda: string;
  formato: 'amplo' | 'retrato' | 'detalhe';
};

const valida = <T extends Foto>(f: Partial<T>): f is T => Boolean(f.src && f.largura && f.altura && f.alt);
const set = (a: string, wa: number, b: string, wb: number) => `${a} ${wa}w, ${b} ${wb}w`;

/* ---------- As quatro fotografias ---------- */

export const fotoEstudio: Foto = {
  src: estudio1440,
  srcSet: set(estudio720, 720, estudio1440, 1440),
  largura: 1672,
  altura: 941,
  alt: 'Black Crioulo sem camisa, encostado em uma parede escura de textura envelhecida, com corrente prateada grossa, calça preta e pulseira de cobre, olhando para a câmera.',
};

export const fotoRetrato: Foto = {
  src: retrato1122,
  srcSet: set(retrato720, 720, retrato1122, 1122),
  largura: 1122,
  altura: 1402,
  alt: 'Retrato de Black Crioulo de camisa preta aberta e corrente prateada, encostado em uma parede clara com sombra de janela, olhar sério para a câmera.',
};

export const fotoCorredor: Foto = {
  src: corredor1122,
  srcSet: set(corredor720, 720, corredor1122, 1122),
  largura: 1122,
  altura: 1402,
  alt: 'Black Crioulo sem camisa no batente de uma porta, braço apoiado no alto, com corredor de luz laranja ao fundo, corrente prateada e calça preta.',
};

export const fotoRua: Foto = {
  src: rua1122,
  srcSet: set(rua720, 720, rua1122, 1122),
  largura: 1122,
  altura: 1402,
  alt: 'Black Crioulo de regata clara e calça preta, encostado em um muro antigo ao sol numa rua de pedras, com corrente prateada e pulseira de cobre.',
};

export const fotoRetratoPB: Foto = {
  src: pb1122,
  srcSet: set(pb720, 720, pb1122, 1122),
  largura: 1122,
  altura: 1402,
  alt: 'Retrato em preto e branco de Black Crioulo de regata preta e corrente prateada grossa, fundo escuro, olhar direto e sério.',
};

export const fotoPraia: Foto = {
  src: praia1440,
  srcSet: set(praia720, 720, praia1440, 1440),
  largura: 1672,
  altura: 941,
  alt: 'Black Crioulo caminhando no calçadão à beira-mar ao fim de tarde, camisa de linho clara aberta, corrente prateada e calça preta, com o mar e os morros ao fundo.',
};

export const fotoJanela: Foto = {
  src: janela1440,
  srcSet: set(janela720, 720, janela1440, 1440),
  largura: 1672,
  altura: 941,
  alt: 'Black Crioulo sem camisa ao lado de uma janela, olhando para fora, com a luz do sol desenhando sombras numa parede clara.',
};

export const fotoCadeira: Foto = {
  src: cadeira1122,
  srcSet: set(cadeira720, 720, cadeira1122, 1122),
  largura: 1122,
  altura: 1402,
  alt: 'Black Crioulo sentado numa cadeira de madeira, terno preto aberto sobre o peito, corrente prateada e pulseira de cobre, fundo bege.',
};

/* ---------- Usos por seção ---------- */

export const fotoCapa = fotoEstudio;

export const fotoPulso: Foto = {
  src: pulso360,
  largura: 360,
  altura: 384,
  alt: 'Detalhe da mão e do pulso com uma pulseira fina de cobre, ao lado da calça preta, numa rua ensolarada.',
};

export const fotoInterludio: Foto = { ...fotoCorredor, alt: '' }; // decorativa: o texto é o conteúdo

const corrente: Foto = {
  src: corrente600,
  largura: 600,
  altura: 640,
  alt: 'Detalhe da corrente prateada de elos grossos sobre o peito, entre as lapelas da camisa preta.',
};

const editorialBruto: Array<Partial<FotoEditorial>> = [
  {
    src: seq1422,
    srcSet: set(seq720, 720, seq1422, 1422),
    largura: 1422,
    altura: 871,
    alt: fotoEstudio.alt,
    legenda: '01 / PRESENÇA',
    titulo: 'Presença',
    formato: 'amplo',
  },
  { ...fotoRetrato, legenda: '02 / ATITUDE', titulo: 'Atitude', formato: 'vertical' },
  { ...fotoRua, legenda: '03 / RUA', titulo: 'Rua', formato: 'vertical' },
];
export const editorial = editorialBruto.filter(valida<FotoEditorial>);

const galeriaBruta: Array<Partial<FotoGaleria>> = [
  { ...fotoEstudio, legenda: 'Estúdio · parede escura', formato: 'amplo' },
  { ...fotoCorredor, legenda: 'Corredor · luz laranja', formato: 'retrato' },
  { ...fotoRetratoPB, legenda: 'Retrato · preto e branco', formato: 'retrato' },
  { ...fotoPraia, legenda: 'Rio · fim de tarde', formato: 'amplo' },
  { ...fotoRetrato, legenda: 'Retrato · camisa preta', formato: 'retrato' },
  { ...fotoCadeira, legenda: 'Estúdio · terno', formato: 'retrato' },
  { ...fotoJanela, legenda: 'Janela · luz do sol', formato: 'amplo' },
  { ...fotoRua, legenda: 'Rua · muro antigo', formato: 'retrato' },
  { ...corrente, legenda: 'Detalhe · corrente', formato: 'detalhe' },
  { ...fotoPulso, legenda: 'Detalhe · cobre no pulso', formato: 'detalhe' },
  // Novas fotos entram aqui:
  // { src: nova, largura: 1200, altura: 1600, alt: '...', legenda: 'Noite · escada', formato: 'retrato' },
];
export const galeria = galeriaBruta.filter(valida<FotoGaleria>);
