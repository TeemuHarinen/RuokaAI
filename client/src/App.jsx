import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import './App.css'

const App = () => {
  return (
    <>
    <h2> Ruoka AI by Teemu Harinen </h2>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
