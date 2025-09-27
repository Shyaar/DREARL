import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'



function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={<h1 className="text-3xl bg-red font-bold">Welcome to <span className='text-white'>DREARL</span></h1>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App