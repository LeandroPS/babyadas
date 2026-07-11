import { useNavigate } from 'react-router-dom'
import { createBoardId, displayPath } from '../board'
import '../App.css'
import './HomePage.css'

export function HomePage() {
  const navigate = useNavigate()

  function handleCreate() {
    navigate(displayPath(createBoardId()))
  }

  return (
    <div className="app app--home">
      <img src="/babyadas-logo.png" alt="Babyadas" className="home-logo" />
      <h1 className="home-title">Babyadas</h1>
      <p className="home-subtitle">Placar para competições do chá de bebê</p>
      <button type="button" className="home-create-btn" onClick={handleCreate}>
        Criar novo placar
      </button>
    </div>
  )
}
