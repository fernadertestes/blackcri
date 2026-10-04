# Black Crioulo — site editorial

React + TypeScript + Tailwind CSS 4 + Motion (Vite).

```bash
npm install
npm run dev           # desenvolvimento em http://localhost:5173
npm run build         # site estático em /dist (Vercel, Netlify, qualquer hospedagem)
npm run build:single  # um único index.html autocontido em /dist-single
```

## Onde editar

| O quê | Arquivo |
|---|---|
| Textos (capa, manifesto, interlúdio, contato) | `src/content/site.ts` → `textos` |
| Contatos reais | `src/content/site.ts` → `contato` |
| Fotos, legendas e textos alternativos | `src/content/fotos.ts` |
| Recortes das fotos | `scripts/recortes.config.mjs` + `npm run fotos` |
| Cores e fontes | `src/index.css` → bloco `@theme` |

## Preencher os contatos

Em `src/content/site.ts`, preencha só o que for real:

```ts
export const contato = {
  email: 'contato@seudominio.com',
  whatsapp: '5521999999999',   // DDI + DDD + número, só dígitos
  instagram: 'usuario',        // sem @
  agencia: { nome: 'Agência X', url: 'https://...' },
};
```

Campo vazio não aparece. Com todos vazios, o site mostra "Contato profissional em breve."

## Trocar ou acrescentar fotos

As fotografias originais ficam em `fotos/originais/`:

- `ensaio_estudio-parede-escura.png` (horizontal — capa e página 01 da sequência)
- `ensaio_retrato-camisa-preta.png` (retrato — página 02, contato, detalhe da corrente)
- `ensaio_corredor-laranja.png` (corredor laranja — galeria e interlúdio)
- `ensaio_rua-muro-antigo.png` (rua — página 03, detalhe do pulso)
- `ensaio_retrato-pb.png` (retrato em preto e branco — galeria)
- `ensaio_praia-fim-de-tarde.png` (horizontal — seção "A cidade" e galeria)
- `ensaio_janela-luz.png` (horizontal — fundo do contato e galeria)
- `ensaio_cadeira-terno.png` (sentado de terno — galeria)

As duas fotos usadas na primeira versão estão guardadas em `fotos/arquivo/` e não entram no site.

**Trocar uma original:** substitua o arquivo em `fotos/originais/` (mesmo nome), ajuste as coordenadas em `scripts/recortes.config.mjs` se o enquadramento mudar e rode `npm run fotos`. Os `.webp` em `src/assets/fotos/` são gerados de novo.

**Acrescentar foto ao editorial:** coloque a imagem otimizada em `src/assets/`, importe em `src/content/fotos.ts` e inclua um item em `editorial`:

```ts
{ src: novaFoto, largura: 1200, altura: 1600, legenda: '04 / NOITE', formato: 'vertical', alt: 'Descrição objetiva da imagem.' }
```

`formato` pode ser `amplo`, `vertical` ou `detalhe`. As três primeiras fotos têm composição fixa; a partir da quarta, o layout alterna os lados sozinho. Um item sem `src` ou sem `alt` é ignorado e nunca aparece como imagem quebrada.

**Enquadramento da capa:** ajuste `object-[x%_y%]` por breakpoint na `<img>` de `src/components/Capa.tsx`.

## Acessibilidade e movimento

- Com `prefers-reduced-motion` ligado, as animações e o parallax são desativados.
- No celular e em telas de toque o parallax fica desligado e as revelações são mais curtas.
- Há link para pular ao conteúdo, foco visível em cobre e menu móvel que fecha com Esc.

## Movimento (v2)

| Onde | O quê |
|---|---|
| `src/lib/movimento.tsx` | Curvas e springs, `Linhas` (máscara por linha), `Palavras` (stagger), `FotoParallax`, `PalavraFundo`, `Magnetico`, `useMidia` |
| `src/components/Capa.tsx` | Coreografia de abertura (tempos no comentário do topo) e profundidade na rolagem |
| `src/components/Sequencia.tsx` | Sequência fixa de 3 páginas no desktop; fluxo vertical no celular e com movimento reduzido |
| `src/components/Galeria.tsx` | Folha de contato, cursor "VER FOTO", ampliação com transição compartilhada (Esc, fundo, botão, ← →) |
| `src/lib/tons.tsx` | Costuras em degradê entre areia, papel, carvão e preto |

Para ajustar a duração da sequência fixa, mude `h-[340vh]` em `SequenciaFixa`. Os intervalos de cada página estão documentados no topo do arquivo.
