import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Carte from "./components/Carte";


const symboles = ["A", "B", "C", "D", "E", "F"];

function App() {
  const [cartes, setCartes] = useState([]);
  const [choix1, setChoix1] = useState(null);
  const [choix2, setChoix2] = useState(null);
  const [bloque, setBloque] = useState(false);

 
  useEffect(() => {
    melangerCartes();
  }, []);

  const melangerCartes = () => {
    const jeu = [...symboles, ...symboles]
      .sort(() => Math.random() - 0.5)
      .map((symbole, index) => ({
        id: index,
        symbole,
        trouve: false,
      }));

    setCartes(jeu);
  };

  const handleChoix = (carte) => {
    choix1 ? setChoix2(carte) : setChoix1(carte);
  };

  useEffect(() => {
    if (choix1 && choix2) {
      setBloque(true);

      if (choix1.symbole === choix2.symbole) {
        setCartes((prev) =>
          prev.map((c) =>
            c.symbole === choix1.symbole ? { ...c, trouve: true } : c
          )
        );
        resetTour();
      } else {
        setTimeout(resetTour, 800);
      }
    }
  }, [choix1, choix2]);

  const resetTour = () => {
    setChoix1(null);
    setChoix2(null);
    setBloque(false);
  };

  return (
    <div className="app">
      <h1>Memory Game</h1>

      <div className="grille">
        {cartes.map((carte) => (
          <Carte
            key={carte.id}
            carte={carte}
            handleChoix={handleChoix}
            retournee={
              carte === choix1 || carte === choix2 || carte.trouve
            }
            bloque={bloque}
          />
        ))}
      </div>

      <button onClick={melangerCartes}>Nouvelle partie</button>
    </div>
  );
}
export default App;