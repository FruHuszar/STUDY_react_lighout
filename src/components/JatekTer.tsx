import { useJatekContext } from "../contexts/JatekContext";
import Lampa from "./Lampa";

export default function Jatekter() {
  const { lampak, lepesek, nyert, kattint, ujJatek } = useJatekContext();

  return (
    <div className="jatek">
      <p>Lépések: {lepesek}</p>
      {/* valami && valami trükk: akkor rajzolja ki a második részt ha az első nem false */}
      {nyert && (
        <div className="nyert-hatter">
          <dialog open className="nyert">
            Nyertél {lepesek} lépésből!
            <button className="uj-jatek" onClick={ujJatek}>
              Új játék
            </button>
          </dialog>
        </div>
      )}
      <div className={nyert ? "jatekter vege" : "jatekter"}>
        {lampak.map((allapot, index) => (
          <Lampa
            key={index}
            vilagit={allapot}
            kattintas={() => kattint(index)}
          />
        ))}
      </div>
    </div>
  );
}
