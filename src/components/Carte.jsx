
import "/src/App.css";

function Carte({ carte, handleChoix, retournee, bloque }) {
  const handleClick = () => {
    if (!bloque) handleChoix(carte);
  };

  return (
    <div className="carte" onClick={handleClick}>
      <div className={retournee ? "face active" : "face"}>
        {retournee ? carte.symbole : "?"}
      </div>
    </div>
  );
}

export default Carte;
