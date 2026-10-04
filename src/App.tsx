import { MotionConfig } from 'motion/react';
import { Navegacao } from './components/Navegacao';
import { Capa } from './components/Capa';
import { Faixa } from './components/Faixa';
import { Manifesto } from './components/Manifesto';
import { Sequencia } from './components/Sequencia';
import { Looks } from './components/Looks';
import { Galeria } from './components/Galeria';
import { Cidade } from './components/Cidade';
import { Interludio } from './components/Interludio';
import { Contato } from './components/Contato';
import { Rodape } from './components/Rodape';
import { Costura } from './lib/tons';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <>
        <Navegacao />
        <main>
          <Capa />
          <Faixa />
          <Manifesto />
          <Costura de="papel" para="preto" altura="34vh" />
          <Sequencia />
          <Costura de="preto" para="areia" altura="30vh" />
          <Looks />
          <Costura de="areia" para="carvao" altura="30vh" />
          <Galeria />
          <Costura de="carvao" para="preto" altura="18vh" />
          <Cidade />
          <Interludio />
          <Costura de="preto" para="papel" altura="34vh" />
          <Contato />
        </main>
        <Costura de="papel" para="preto" altura="26vh" />
        <Rodape />
        <div aria-hidden className="grao-global" />
      </>
    </MotionConfig>
  );
}
