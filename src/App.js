import React, {useState, useEffect} from 'react';
import imagen from './cryptomonedas.png'
import Formulario from './components/Formulario';
import axios from 'axios';
import Spinner from './components/Spinner';
import Cotizacion from './components/Cotizacion';



function App() {

  const [moneda, guardarMoneda] = useState('');
  const [cryptomoneda, guardarCryptomoneda] = useState('');
  const [cargando, guardarCargando] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect( () => {
    const cotizarCryptomoneda = async () => {

      if(moneda === '' || cryptomoneda === '') return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);
     
      guardarCargando(true);

      setTimeout( () => {
        guardarCargando(false);
        guardarResultado(resultado.data.DISPLAY[cryptomoneda][moneda])
      },3000 )
    }
    cotizarCryptomoneda()
  },[moneda, cryptomoneda] )

  const component = (cargando) ? <Spinner/>  : <Cotizacion resultado={resultado} />;


  return (
    <div className="container">
      <div className="row">
        <div className="one-half column ">
          <img src={imagen} alt="imagen Crypto" className="logotipo"/>
        </div>
        <div className="one-half column">
          <h1>Cotiza Cryptomonedas al Instante</h1>
          <Formulario 
            guardarMoneda={guardarMoneda} 
            guardarCryptomoneda={guardarCryptomoneda}  
          />
          {component}
        </div>
      </div>
    </div>
  );
}

export default App;
