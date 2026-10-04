/**
 * ============================================================
 *  CONTEÚDO EDITÁVEL DO SITE — BLACK CRIOULO
 *  Textos, contatos e fotografias ficam centralizados aqui.
 * ============================================================
 */

/**
 * CONTATO
 * Preencha apenas com dados reais. Campos vazios ('') não aparecem no site.
 * Enquanto todos estiverem vazios, o site mostra "Me chama no X"
 */
export const contato = {
  email: '',          // ex.: 'contato@seudominio.com'
  whatsapp: '',       // só números com DDI e DDD, ex.: '5521999999999'
  instagram: '',      // só o usuário, sem @, ex.: 'blackcrioulo'
  x: 'https://x.com/blackcriolo_ofc?s=11',
  agencia: { nome: '', url: '' }, // ex.: { nome: 'Agência X', url: 'https://...' }
  links: [
    { rotulo: 'OnNow Play', valor: 'blackcrrioulo24cm', href: 'https://onnowplay.com/blackcrrioulo24cm' },
    { rotulo: 'OnlyFans', valor: 'blackcriolo24cm', href: 'https://onlyfans.com/blackcriolo24cm' },
    { rotulo: 'Privacy', valor: 'BlackCriolo_ofc', href: 'https://privacy.com.br/checkout/BlackCriolo_ofc' },
    { rotulo: 'Garoto com Local', valor: 'black-crioulo-24cm', href: 'https://garotocomlocal.com.br/acompanhante-masculino/black-crioulo-24cm/' },
  ],
};

export const textos = {
  nome: ['BLACK', 'CRIOULO'] as const,
  linhaCapa: 'Centro do Rio · 35 anos · versátil ativo',
  frase: 'Magro, pauzão de 24 cm bem grosso',
  cidade: ['Centro do Rio', 'Te como inteiro'] as const,
  manifesto: {
    titulo: 'Te fodo inteiro',
    texto:
      'Black Crioulo, 35 anos, magro, versátil ativo, do Centro do Rio, com um pauzão de 24 cm bem grosso, duro, pesado e pronto pra entrar fundo até você pedir mais, e com Privacy pra ver tudo antes',
    destaque: ['Pauzão', 'grosso'] as const,
  },
  interludio: 'Grosso até o talo',
  contato: {
    titulo: 'Quer foder?',
    texto: 'Centro do Rio, versátil ativo, 35 anos, magro, pauzão de 24 cm bem grosso, com Privacy pra ver antes de marcar',
    emBreve: 'Me chama no X',
    escopo: 'Privacy · OnlyFans · OnNow Play · Garoto com Local · X',
  },
};
