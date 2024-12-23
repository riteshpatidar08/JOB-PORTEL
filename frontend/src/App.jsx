import Signup from './components/auth/Signup';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './components/auth/Login';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <ProtectedRoutes
              allowedRoles={['jobseeker', 'recruiter', 'admin']}
            />
          }
        >
          <Route path="/" element={<HomePage />} />
        
        </Route>
      </Routes>
    </div>
  );
}

export default App;
