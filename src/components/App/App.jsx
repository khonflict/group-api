import './App.css';
import Pairs from '../Pairs/Pairs';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [pair, setPair] = useState({});
  const [exAmount, setExAmount] = useState(1);
  const [total, setTotal] = useState(0);

  const handleChangeEx = (event) => {
    if(pair.success){
    setExAmount(event.target.value);
    const tempTotal = pair.quotes[Object.keys(pair.quotes)[0]].toFixed(2);
    tempTotal && setTotal((event.target.value*tempTotal).toFixed(2));
  }
}

  const handleChange = async (event) => {
    const pairSelected = event.target.value;
    const currency = pairSelected;
    const URL = `https://api.apilayer.com/currency_data/live?source=usd&currencies=${currency}`;
    try{
      const response = await axios.get(URL, {
        headers: {
          apikey: "MGxnDX5u01lOCfcgbsYmYoNOVPd6cgGo"
        }
      })
      setPair(response.data);
      setExAmount(1);
      console.log(response.data);
      setTotal(response.data.quotes[Object.keys(response.data.quotes)[0]].toFixed(2))
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 title">Jumbo Exchange</h1>
          <p className="lead">Return Big Buck$</p>
        </div>
      </div>
      <br />
      <form>
      <label htmlFor="pairs">Convert USD to:</label>
        <select name="pairs" id="pairs" onChange={handleChange}>
          <option value="default">select one</option>
          <option value="EUR">Euro</option>
          <option value="JPY">Japanese yen</option>
          <option value="GBP">Pound sterling</option>
          <option value="MYR">Malaysian ringgit</option>
          <option value="RON">Romanian leu</option>
        </select>
      
      <Pairs pair={pair}/>
      <label class="exchange" htmlFor="hiTeo">Exchange Rate:</label>
      <input class="amount" type="number" min="0.1" step="0.1" value={exAmount} name="hiTeo" id="hiTeo" onChange={handleChangeEx}/>
      <input class="amount" type="number" value={total} readOnly/>
      </form>
    </div>
  );
}

export default App;