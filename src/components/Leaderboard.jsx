import { useEffect, useState } from 'react';

// Données de démonstration, utilisées si l'API n'est pas joignable.
const DEMO_DATA = [
  { name: 'Urys', elo: 1842, wins: 212, losses: 48 },
  { name: 'Frost', elo: 1790, wins: 187, losses: 55 },
  { name: 'Nova', elo: 1744, wins: 160, losses: 61 },
  { name: 'Kairo', elo: 1698, wins: 141, losses: 70 },
  { name: 'Zeph', elo: 1655, wins: 133, losses: 72 },
  { name: 'Mira', elo: 1610, wins: 120, losses: 80 },
  { name: 'Axel', elo: 1573, wins: 109, losses: 84 },
  { name: 'Luna', elo: 1540, wins: 98, losses: 88 },
  { name: 'Orion', elo: 1502, wins: 90, losses: 91 },
  { name: 'Sky', elo: 1471, wins: 84, losses: 95 },
];

const REFRESH_MS = 15000;

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('/api/leaderboard/boxing');
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        if (!cancelled) {
          setPlayers(data.slice(0, 10));
          setDemo(false);
        }
      } catch (err) {
        if (!cancelled) {
          setPlayers(DEMO_DATA);
          setDemo(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    const timer = setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  return (
    <section id="classement" className="leaderboard">
      <h2>
        Top 10 <span className="glow">Boxing</span>
      </h2>

      {demo && (
        <p className="notice">API injoignable : affichage de données de démonstration.</p>
      )}

      {loading ? (
        <p className="notice">Chargement...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Rang</th>
              <th>Pseudo</th>
              <th>ELO</th>
              <th>Win/Loss</th>
            </tr>
          </thead>
          <tbody>
            {players.map((p, i) => (
              <tr key={p.name} className={i < 3 ? 'top top-' + (i + 1) : ''}>
                <td className="rank">#{i + 1}</td>
                <td>{p.name}</td>
                <td className="elo">{p.elo}</td>
                <td>
                  <span className="win">{p.wins}W</span>
                  {' / '}
                  <span className="loss">{p.losses}L</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
