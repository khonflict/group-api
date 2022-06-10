import '../App/App.css';

function Pairs({pair}) {
    return (
    <div className="Pairs">
    {
      pair.success ? 
        <h1>{pair.quotes[Object.keys(pair.quotes)[0]].toFixed(2)}</h1>
      :
        <h4>Currency Converter</h4>
    }
    </div>
    
  );
}

export default Pairs;