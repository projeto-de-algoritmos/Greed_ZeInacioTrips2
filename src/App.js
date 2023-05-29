import { VectorMap } from '@south-paw/react-vector-maps';
import React, { useEffect, useState } from 'react';
import BrMap from './map/brMap';
import { Container, Map, MapContainer } from './styles';
import Navbar from './components/Navbar';
import TypingText from './components/Message';
import Graph from './graph/Graph';
import ReasultModal from './components/ResultModal';

import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import About from './components/About';
import FormViagem from './components/FormViagem';
import Vector from './Vector/Vector';
import Viagem from './Vector/Viagem';
import LinhaDoTempo from './components/LinhaDoTempo/LinhaDoTempo';

const App = () => {

  const [focused, setFocused] = useState('None');
  const [output, setOutput] = useState('None');
  const [starting, setStarting] = useState('None');
  const [destiny, setDestiny] = useState('None');
  const [modal, setModal] = useState(false);

  const vector = new Vector();
  const [viagens, setViagens] = useState(vector.viagens);

  const addViagem = (origem, destino, duracao, deadline) => {
    vector.addViagem(origem, destino, duracao, deadline);
    vector.scheduleToMinimizeLateness();
    setViagens([...vector.viagens]);
  };


  const layerProps = {
    onFocus: ({ target }) => setFocused(target.attributes.name.value),
    onClick: ({ target }) => {
      const id = target.attributes.id.value;
      if (starting === 'None') {
        setStarting(id);
      } else if (destiny === 'None') {
        setDestiny(id);
      } else {
        setStarting(id);
        setDestiny('None');
      }
    }
  };

  const graph = new Graph();

  useEffect(() => {

    console.log(`starting: ${starting} destiny: ${destiny}`);


    if (starting === 'None' && destiny === 'None') {
      setOutput('Selecione os estados');
      return;
    }
    if (starting != 'None' && destiny != 'None') {

      const resultado = graph.shortestPath(starting, destiny);
      setOutput(resultado);
      setModal(true);
    }

  }, [starting, destiny]);

  useEffect(() => {
    vector.viagens = viagens;
    vector.scheduleToMinimizeLateness();
  }, [viagens]);


  return (
    <Container>
      {modal && <ReasultModal
        visible={modal}
        setVisible={setModal}
        output={output}
      />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/minimizing"
          element={
            <MapContainer>
              <Map>
                <TypingText message='Cadastre novas viagens que o algoritmo de Scheduling to Minimizing Lateness apresentará  o melhor roteiro para o Zé Inácio. Interaja com o mouse sobre a linha de viagens para obter detalhes' shouldDelete={true} />
                <FormViagem addViagem={addViagem} />
                <LinhaDoTempo viagens={viagens} />
              </Map>
            </MapContainer>
          } />
        <Route path="/dijkstra" element={
          <MapContainer>
            <Map>
              <TypingText message='Escolha dois estados que o algoritmo de Dijkstra apresentará o melhor caminho para o Zé Inácio! ' shouldDelete={true} />
              <VectorMap {...BrMap} layerProps={layerProps} checkedLayers={[starting, destiny]} />
            </Map>
          </MapContainer>
        } />
      </Routes>
    </Container>
  );
}

export default App;
