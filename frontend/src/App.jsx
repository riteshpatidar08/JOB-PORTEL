import Signup from './components/auth/Signup';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './components/auth/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import RecruiterHomePage from './pages/RecruiterHomePage';
import ApplicantsPage from './pages/ApplicantsPage';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>

        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
 <Route path="/" element={<HomePage />} />
        <Route
          element={
            <ProtectedRoutes
              allowedRoles={['recruiter']}
            />
          }
        >
         
          <Route path='/recruiter-home' element={<RecruiterHomePage/>} />
          <Route path='/applicants' element={<ApplicantsPage/>}/>
        
        </Route>
      </Routes>
    </div>
  );
}

export default App;
