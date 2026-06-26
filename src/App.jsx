import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PlayerStats from './components/PlayerStats'
import QuestLog from './components/QuestLog'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div id="top" className="app">
      <Navbar />
      <main>
        <Hero />
        <PlayerStats />
        <QuestLog />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
