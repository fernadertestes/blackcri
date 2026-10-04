/**
 * ============================================================
 *  CONTEÚDO EDITÁVEL DO SITE — BLACK CRIOULO
 *  Textos, contatos e fotografias ficam centralizados aqui.
 * ============================================================
 */

/**
 * CONTATO
 * Preencha apenas com dados reais. Campos vazios ('') não aparecem no site.
 * Enquanto todos estiverem vazios, o site mostra "Contato profissional em breve."
 */
export const contato = {
  email: '',          // ex.: 'contato@seudominio.com'
  whatsapp: '',       // só números com DDI e DDD, ex.: '5521999999999'
  instagram: '',      // só o usuário, sem @, ex.: 'blackcrioulo'
  agencia: { nome: '', url: '' }, // ex.: { nome: 'Agência X', url: 'https://...' }
};

export const textos = {
  nome: ['BLACK', 'CRIOULO'] as const,
  linhaCapa: 'Rio de Janeiro · Personagem & modelo',
  frase: 'O Rio no olhar. A atitude no corpo.',
  manifesto: {
    titulo: 'Tem presença que chega antes da palavra.',
    texto:
      'Black Crioulo tem o passo tranquilo de quem conhece a cidade e o olhar de quem sabe provocar. Entre a rua, a noite e a moda, sua presença mistura sensualidade, humor e atitude carioca.',
    destaque: ['Meu jeito é', 'carioca.'] as const,
  },
  interludio: 'O charme está no jeito.',
  contato: {
    titulo: 'Vamos criar uma cena?',
    texto: 'Moda, imagem e projetos com personalidade.',
    emBreve: 'Contato profissional em breve.',
    escopo: 'Ensaios · Campanhas · Projetos criativos',
  },
};
