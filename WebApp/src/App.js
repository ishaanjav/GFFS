import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Warning from './components/Warning'
import History from './components/History'

function App() {
  return (
    // color of page ----->-----------------------v
    <div className="App" style={{ background: '#f3f3f3' }}>
      <Header />
      <div style={{ width: '100%', marginTop: '60px', display: 'inline-block' }}>
        <div style={{ width: '50%', display: 'inline-block', float: 'left' }}>
          <Warning />
        </div>
        <div style={{ width: '50%', display: 'inline-block' }}>
          <h1>Interactive Map here of global flood warnings </h1>
        </div>
      </div>
      <div style={{ width: '100%', marginTop: '80px', display: 'inline-block', marginBottom: '20px' }}>
        <div style={{ width: '50%', display: 'inline-block', float: 'left' }}>
          {/* <h1>History of floods</h1> */}
          <History />
        </div>
        <div style={{ width: '50%', display: 'inline-block' }}>
          <h1> Latest floods around the world </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
