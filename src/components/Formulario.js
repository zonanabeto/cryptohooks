import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Criptomoneda from './Criptomoneda';
import Error from './Error';


const Formulario = ({guardarCryptomoneda, guardarMoneda}) => {

    const [criptomonedas, guardarCriptomonedas] = useState([]);
    const [monedaCotizar, guardarMonedaCotizar] = useState('');
    const [cryptoCotizar, guardarCryptoCotizar] = useState('');
    const [error, guardarError] = useState(false);

    useEffect(()=>{

        const consultarApi = async  () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }

        consultarApi();
    },[]);

    const cotizarMoneda = (e) => {
        e.preventDefault();
        if(monedaCotizar === '' || cryptoCotizar === ''){
            guardarError(true);
            return;
        }

        guardarError(false);
        guardarCryptomoneda(cryptoCotizar);
        guardarMoneda(monedaCotizar);
    }

    const componente = (error) ? <Error mensaje='Ambos campos son obligatorios.' /> : null;


    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {componente}
            <div className="row">
                <label> Elige tu Moneda </label>
                <select 
                    className='u-full-width' 
                    onChange={ e=> guardarMonedaCotizar(e.target.value)}
                >
                    <option value="">--Elige tu moneda--</option>
                    <option value="USD">Dolar Estadunidense</option>
                    <option value="MXN">Peso Mexicano</option>
                    <option value="GBP">Libras</option>
                    <option value="EUR">Euro</option>
                </select>
            </div>
            <div className="row">
                <label >Elige tu Cryptomoneda</label>
                <select className='u-full-width' onChange={ e=> guardarCryptoCotizar(e.target.value)}>
                <option value="">--Elige tu Crypto--</option>
                    {criptomonedas.map(criptomoneda => (
                        <Criptomoneda
                            criptomoneda={criptomoneda}
                            key={criptomoneda.CoinInfo.Id}
                        />
                    ))}
                </select>
            </div>
            <input type="submit" className='button-primary u-full-width' value='Calcular' />
        </form>
    );
};

export default Formulario;