/**
 * Recortes e versões web das fotografias originais (pasta /fotos/originais).
 *
 *   ensaio_estudio-parede-escura.png  1672×941  — horizontal, parede escura (capa)
 *   ensaio_retrato-camisa-preta.png   1122×1402 — retrato, camisa preta, luz de janela
 *   ensaio_corredor-laranja.png       1122×1402 — batente da porta, corredor laranja
 *   ensaio_rua-muro-antigo.png        1122×1402 — rua de pedras, muro antigo ao sol
 *   ensaio_retrato-pb.png             1122×1402 — retrato em preto e branco, regata preta
 *   ensaio_praia-fim-de-tarde.png     1672×941  — horizontal, praia ao fim de tarde
 *   ensaio_janela-luz.png             1672×941  — horizontal, luz de janela na parede clara
 *   ensaio_cadeira-terno.png          1122×1402 — sentado, terno preto aberto
 *   ensaio_camisa-branca.png          1672×941  — horizontal, camisa branca, parede bege
 *   ensaio_retrato-luz-azul.png       1122×1402 — retrato, regata preta, luz azul
 *   ensaio_terraco-por-do-sol.png     1672×941  — horizontal, terraço, cidade ao pôr do sol
 *   ensaio_jeans-banco.png            1122×1402 — sentado no banco, jeans
 *   ensaio_noite-porta-de-aco.png     1122×1402 — noite, rua molhada, porta de aço
 *
 * Cada recorte: { nome, origem, x, y, w, h } em pixels da foto original.
 * Rode `npm run fotos` depois de editar este arquivo ou trocar as originais.
 * Saída: src/assets/fotos/*.webp nas larguras listadas (nunca maiores que o recorte).
 */
export const larguras = [720, 1440];

const E = 'ensaio_estudio-parede-escura.png';
const R = 'ensaio_retrato-camisa-preta.png';
const C = 'ensaio_corredor-laranja.png';
const U = 'ensaio_rua-muro-antigo.png';
const PB = 'ensaio_retrato-pb.png';
const P = 'ensaio_praia-fim-de-tarde.png';
const J = 'ensaio_janela-luz.png';
const T = 'ensaio_cadeira-terno.png';
const CB = 'ensaio_camisa-branca.png';
const AZ = 'ensaio_retrato-luz-azul.png';
const TE = 'ensaio_terraco-por-do-sol.png';
const JE = 'ensaio_jeans-banco.png';
const NO = 'ensaio_noite-porta-de-aco.png';

export const recortes = [
  // Fotos inteiras (capa, galeria, ampliação)
  { nome: 'estudio', origem: E, x: 0, y: 0, w: 1672, h: 941 },
  { nome: 'retrato', origem: R, x: 0, y: 0, w: 1122, h: 1402 },
  { nome: 'corredor', origem: C, x: 0, y: 0, w: 1122, h: 1402 },
  { nome: 'rua', origem: U, x: 0, y: 0, w: 1122, h: 1402 },
  { nome: 'retrato-pb', origem: PB, x: 0, y: 0, w: 1122, h: 1402 },
  { nome: 'praia', origem: P, x: 0, y: 0, w: 1672, h: 941 },
  { nome: 'janela', origem: J, x: 0, y: 0, w: 1672, h: 941 },
  { nome: 'cadeira', origem: T, x: 0, y: 0, w: 1122, h: 1402 },
  { nome: 'camisa-branca', origem: CB, x: 0, y: 0, w: 1672, h: 941 },
  { nome: 'luz-azul', origem: AZ, x: 0, y: 0, w: 1122, h: 1402 },
  { nome: 'terraco', origem: TE, x: 0, y: 0, w: 1672, h: 941 },
  { nome: 'jeans', origem: JE, x: 0, y: 0, w: 1122, h: 1402 },
  { nome: 'noite', origem: NO, x: 0, y: 0, w: 1122, h: 1402 },
  // Looks — recortes verticais (4:5) das horizontais
  { nome: 'look_camisa-branca', origem: CB, x: 780, y: 0, w: 752, h: 941 },
  { nome: 'look_linho-preto', origem: TE, x: 20, y: 0, w: 752, h: 941 },
  // Sequência 01 — horizontal do estúdio, menos parede vazia (proporção 1,63)
  { nome: 'seq-01_estudio', origem: E, x: 250, y: 0, w: 1422, h: 871 },
  // Detalhes
  { nome: 'detalhe_corrente', origem: R, x: 300, y: 560, w: 600, h: 640 },
  { nome: 'detalhe_pulso-rua', origem: U, x: 660, y: 900, w: 360, h: 384 },
];
