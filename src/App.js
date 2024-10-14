import './App.css';
import PetId from './components/PetId';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <span>
                    <img src="https://static.wixstatic.com/media/bb9651_c18982779dea4131bb1d1cd239a30924~mv2.png/v1/fill/w_80,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/TailPal_Black_green.png" className="tailpal-logo" alt="logo" />
                </span>
                <span className='timeContainer'>10:00</span>
                <span>
                    <i className='fa-solid fa-bars' id='hamburgerIcon'></i>
                </span>
            </header>
            <main>
                <PetId />
            </main>
        </div>
    );
}

export default App;

