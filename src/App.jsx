import Navbar from './components/Navbar.jsx';
import Leaderboard from './components/Leaderboard.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <section className="hero">
          <h1>
            Practice PvP <span className="glow">1.7.10</span>
          </h1>
          <p>Boxing, ELO et classement en temps réel.</p>
        </section>
        <Leaderboard />
      </main>
    </>
  );
}
