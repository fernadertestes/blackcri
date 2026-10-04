/**
 * ============================================================
 *  FOTOGRAFIAS
 *  Originais em /fotos/originais (13 fotos). Os arquivos de
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
import camisa_branca720 from '../assets/fotos/camisa-branca-720.webp';
import camisa_branca1440 from '../assets/fotos/camisa-branca-1440.webp';
import luz_azul720 from '../assets/fotos/luz-azul-720.webp';
import luz_azul1122 from '../assets/fotos/luz-azul-1122.webp';
import terraco720 from '../assets/fotos/terraco-720.webp';
import terraco1440 from '../assets/fotos/terraco-1440.webp';
import jeans720 from '../assets/fotos/jeans-720.webp';
import jeans1122 from '../assets/fotos/jeans-1122.webp';
import noite720 from '../assets/fotos/noite-720.webp';
import noite1122 from '../assets/fotos/noite-1122.webp';
import lookCB720 from '../assets/fotos/look_camisa-branca-720.webp';
import lookCB752 from '../assets/fotos/look_camisa-branca-752.webp';
import lookLP720 from '../assets/fotos/look_linho-preto-720.webp';
import lookLP752 from '../assets/fotos/look_linho-preto-752.webp';
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
  alt: 'Black Crioulo sem camisa, encostado em uma parede escura de textura envelhecida, com corrente prateada grossa, calça preta e pulseira de cobre, olhando para a câmera',
};

export const fotoRetrato: Foto = {
  src: retrato1122,
  srcSet: set(retrato720, 720, retrato1122, 1122),
  largura: 1122,
  altura: 1402,
  alt: 'Retrato de Black Crioulo de camisa preta aberta e corrente prateada, encostado em uma parede clara com sombra de janela, olhar sério para a câmera',
};

export const fotoCorredor: Foto = {
  src: corredor1122,
  srcSet: set(corredor720, 720, corredor1122, 1122),
  largura: 1122,
  altura: 1402,
  alt: 'Black Crioulo sem camisa no batente de uma porta, braço apoiado no alto, com corredor de luz laranja ao fundo, corrente prateada e calça preta',
};

export const fotoRua: Foto = {
  src: rua1122,
  srcSet: set(rua720, 720, rua1122, 1122),
  largura: 1122,
  altura: 1402,
  alt: 'Black Crioulo de regata clara e calça preta, encostado em um muro antigo ao sol numa rua de pedras, com corrente prateada e pulseira de cobre',
};

export const fotoRetratoPB: Foto = {
  src: pb1122,
  srcSet: set(pb720, 720, pb1122, 1122),
  largura: 1122,
  altura: 1402,
  alt: 'Retrato em preto e branco de Black Crioulo de regata preta e corrente prateada grossa, fundo escuro, olhar direto e sério',
};

export const fotoPraia: Foto = {
  src: praia1440,
  srcSet: set(praia720, 720, praia1440, 1440),
  largura: 1672,
  altura: 941,
  alt: 'Black Crioulo caminhando no calçadão à beira-mar ao fim de tarde, camisa de linho clara aberta, corrente prateada e calça preta, com o mar e os morros ao fundo',
};

export const fotoJanela: Foto = {
  src: janela1440,
  srcSet: set(janela720, 720, janela1440, 1440),
  largura: 1672,
  altura: 941,
  alt: 'Black Crioulo sem camisa ao lado de uma janela, olhando para fora, com a luz do sol desenhando sombras numa parede clara',
};

export const fotoCadeira: Foto = {
  src: cadeira1122,
  srcSet: set(cadeira720, 720, cadeira1122, 1122),
  largura: 1122,
  altura: 1402,
  alt: 'Black Crioulo sentado numa cadeira de madeira, terno preto aberto sobre o peito, corrente prateada e pulseira de cobre, fundo bege',
};

export const fotoCamisaBranca: Foto = {
  src: camisa_branca1440,
  srcSet: set(camisa_branca720, 720, camisa_branca1440, 1440),
  largura: 1672,
  altura: 941,
  alt: 'Black Crioulo de camisa branca aberta e calça preta, dobrando a manga, encostado numa parede bege com sombras de janela',
};

export const fotoLuzAzul: Foto = {
  src: luz_azul1122,
  srcSet: set(luz_azul720, 720, luz_azul1122, 1122),
  largura: 1122,
  altura: 1402,
  alt: 'Retrato de Black Crioulo de regata preta e corrente prateada, rosto iluminado por luz azul lateral sobre fundo escuro',
};

export const fotoTerraco: Foto = {
  src: terraco1440,
  srcSet: set(terraco720, 720, terraco1440, 1440),
  largura: 1672,
  altura: 941,
  alt: 'Black Crioulo de camisa preta aberta, apoiado no muro de um terraço, com a cidade e os morros ao pôr do sol atrás dele',
};

export const fotoJeans: Foto = {
  src: jeans1122,
  srcSet: set(jeans720, 720, jeans1122, 1122),
  largura: 1122,
  altura: 1402,
  alt: 'Black Crioulo sentado num banco de metal, jaqueta e calça jeans escuras, peito à mostra, corrente prateada e botas pretas, olhando para o lado',
};

export const fotoNoite: Foto = {
  src: noite1122,
  srcSet: set(noite720, 720, noite1122, 1122),
  largura: 1122,
  altura: 1402,
  alt: 'À noite, Black Crioulo de regata preta e braços cruzados, encostado numa porta de aço, com a calçada molhada e as luzes da rua ao fundo',
};

/* ---------- Looks (seção Guarda-roupa) ---------- */

export type Look = Foto & { n: string; nome: string; peca: string };

const looksBrutos: Array<Partial<Look>> = [
  { ...fotoCadeira, n: '01', nome: 'Terno', peca: 'Terno aberto · peito à mostra' },
  { ...fotoJeans, n: '02', nome: 'Jeans', peca: 'Jeans aberto · corpo magro' },
  {
    src: lookCB752,
    srcSet: set(lookCB720, 720, lookCB752, 752),
    largura: 752,
    altura: 941,
    alt: fotoCamisaBranca.alt,
    n: '03',
    nome: 'Camisa branca',
    peca: 'Camisa aberta · peito à mostra',
  },
  {
    src: lookLP752,
    srcSet: set(lookLP720, 720, lookLP752, 752),
    largura: 752,
    altura: 941,
    alt: fotoTerraco.alt,
    n: '04',
    nome: 'Linho preto',
    peca: 'Linho aberto · centro ao pôr do sol',
  },
  { ...fotoLuzAzul, n: '05', nome: 'Regata', peca: 'Regata justa · corpo magro' },
];
export const looks = looksBrutos.filter(valida<Look>);

/* ---------- Usos por seção ---------- */

export const fotoCapa = fotoEstudio;

export const fotoPulso: Foto = {
  src: pulso360,
  largura: 360,
  altura: 384,
  alt: 'Detalhe da mão e do pulso com uma pulseira fina de cobre, ao lado da calça preta, numa rua ensolarada',
};

export const fotoInterludio: Foto = { ...fotoNoite, alt: '' }; // decorativa: o texto é o conteúdo

const corrente: Foto = {
  src: corrente600,
  largura: 600,
  altura: 640,
  alt: 'Detalhe da corrente prateada de elos grossos sobre o peito, entre as lapelas da camisa preta',
};

const editorialBruto: Array<Partial<FotoEditorial>> = [
  {
    src: seq1422,
    srcSet: set(seq720, 720, seq1422, 1422),
    largura: 1422,
    altura: 871,
    alt: fotoEstudio.alt,
    legenda: '01 / TESÃO',
    titulo: 'Tesão',
    formato: 'amplo',
  },
  { ...fotoRetrato, legenda: '02 / CORPO', titulo: 'Corpo', formato: 'vertical' },
  { ...fotoRua, legenda: '03 / CENTRO', titulo: 'Centro', formato: 'vertical' },
];
export const editorial = editorialBruto.filter(valida<FotoEditorial>);

// A ordem segue o ritmo da composição: ampla, retrato, retrato, ampla...
const galeriaBruta: Array<Partial<FotoGaleria>> = [
  { ...fotoEstudio, legenda: 'Sem camisa · parede escura', formato: 'amplo' },
  { ...fotoCorredor, legenda: 'Corpo à mostra · luz quente', formato: 'retrato' },
  { ...fotoRetratoPB, legenda: 'Olhar de quem come', formato: 'retrato' },
  { ...fotoPraia, legenda: 'Centro do Rio · fim de tarde', formato: 'amplo' },
  { ...fotoRetrato, legenda: 'Camisa aberta · peito', formato: 'retrato' },
  { ...fotoCadeira, legenda: 'Terno aberto · pronto', formato: 'retrato' },
  { ...fotoJanela, legenda: 'Sem camisa · luz no corpo', formato: 'amplo' },
  { ...fotoRua, legenda: 'Na rua do centro', formato: 'retrato' },
  { ...corrente, legenda: 'Detalhe · peito', formato: 'detalhe' },
  { ...fotoPulso, legenda: 'Detalhe · pulso', formato: 'detalhe' },
  { ...fotoCamisaBranca, legenda: 'Camisa aberta · magro', formato: 'amplo' },
  { ...fotoLuzAzul, legenda: 'Regata justa · corpo', formato: 'retrato' },
  { ...fotoJeans, legenda: 'Jeans aberto · magro', formato: 'retrato' },
  { ...fotoTerraco, legenda: 'Terraço · centro ao pôr do sol', formato: 'amplo' },
  { ...fotoNoite, legenda: 'Noite · pronto pra te foder', formato: 'retrato' },
  // Novas fotos entram aqui:
  // { src: nova, largura: 1200, altura: 1600, alt: '...', legenda: 'Noite · escada', formato: 'retrato' },
];
export const galeria = galeriaBruta.filter(valida<FotoGaleria>);
