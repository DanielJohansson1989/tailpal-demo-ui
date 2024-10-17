import './App.css';
import BankID from './components/BankId';
import Dashboard from './components/DashBoard';
import PetId from './components/PetId';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> 
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} /> 
            <Route path="/bankid" element={<BankID />} />
            <Route path="/petid" element={<PetId />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Header() {
  const navigate = useNavigate(); 

  const handleLogoClick = () => {
    navigate('/'); 
  };

  return (
    <header className="App-header">
      <span onClick={handleLogoClick} style={{ cursor: 'pointer' }}>        
        <img 
          src="https://static.wixstatic.com/media/bb9651_c18982779dea4131bb1d1cd239a30924~mv2.png/v1/fill/w_80,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/TailPal_Black_green.png" 
          className="tailpal-logo" 
          alt="logo" 
        />
      </span>
      <span className='timeContainer'>10:00</span>
      <span>
        <i className='fa-solid fa-bars' id='hamburgerIcon'></i>
      </span>
    </header>
  );
}

export default App;

