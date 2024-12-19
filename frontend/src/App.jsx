import Signup from "./components/auth/Signup"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import {Routes,Route} from 'react-router-dom'
function App() {
  return (
    <div >
      <Navbar/>
    <Routes>
      <Route path="/register" element={<Signup/>}/>
      </Routes>  
    
    </div>
  )
}

export default App