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
  linhaCapa: 'Copacabana · acompanhante e massoterapeuta',
  frase: 'Só a cabecinha comigo não funciona',
  cidade: ['Copacabana', 'Colocar tudo'] as const,
  manifesto: {
    titulo: 'Socar fundo',
    texto:
      'Só a cabecinha comigo não funciona, gosto de socar fundo e colocar tudo, e se aguenta uma pegada com conceito, está eu aqui',
    destaque: ['24 cm', 'grossão'] as const,
    chamada: 'Ativo · 1,80 m · 75 kg',
    itens: [
      '1,80 m / 75 kg',
      'Mega dotado, 24 cm, pesado e grossão — quer comprovar?',
      'Ativo',
      'Macho e super discreto',
      'Bem safado e carinhoso',
      'Realizo suas fantasias, S&M: me conte e combinamos',
      'Massagens profissionais relaxantes, tântrica e a 4 mãos',
      'Atendo casais e mulheres',
      'Packs de fotos e vídeos, ou vídeo chamada',
      'Local discreto e confortável, ou na sua casa ou motel',
      'Viagens, pernoite e uma boa companhia',
      '24h',
    ],
  },
  interludio: 'Já teve a melhor companhia?',
  contato: {
    titulo: 'Então me liga',
    texto:
      'Rua Santa Clara, Copacabana, local discreto e confortável, ou na sua casa ou motel, viagens, pernoite e atendimento 24h — me liga e permita-se ao extraordinário',
    emBreve: 'Me chama no X',
    escopo: 'Casais e mulheres · massagem tântrica · vídeo chamada',
  },
};
