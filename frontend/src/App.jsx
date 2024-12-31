import Signup from './components/auth/Signup';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/OpenPages/HomePage';
import Login from './components/auth/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import ApplicantsPage from './pages/RecruiterPages/ApplicantsPage';
import UnprotectRoutes from './components/UnprotectRoutes';
import './App.css';
import PostJob from './pages/RecruiterPages/PostJob';
import '@mantine/core/styles.css';
import JobDetailsPage from './pages/OpenPages/JobDetailsPage';
import Footer from './components/Footer';
import AllJobPage from './pages/OpenPages/AllJobPage.jsx';
import { Toaster } from 'sonner';
import ProfilePage from './pages/CommonPages/ProfilePage.jsx';
import 'mantine-datatable/styles.layer.css';

function App() {
  return (
    <div className="black antialiased">
      <Navbar />

      <Routes>
        <Route element={<UnprotectRoutes />}>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/" element={<HomePage />} />
        <Route path="/all-jobs" element={<AllJobPage />} />
        <Route path="/job/:id" element={<JobDetailsPage />} />

        <Route
          element={
            <ProtectedRoutes
              allowedRoles={['jobseeker', 'recruiter', 'admin']}
            />
          }
        >
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route element={<ProtectedRoutes allowedRoles={['recruiter']} />}>
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/applicants" element={<ApplicantsPage />} />
        </Route>
      </Routes>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            backgroundColor: '#575757',
            color: 'white',
          },
        }}
      />
      <Footer />
    </div>
  );
}

export default App;
