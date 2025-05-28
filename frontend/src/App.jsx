
import {Routes, Route, Navigate} from 'react-router'
import LoginPage from './pages/LoginPage.jsx'
import Onboarding from './pages/Onboarding.jsx'
import useAuthUser from './hooks/useAuthUser.js'
import Dashboard from './pages/Dashboard.jsx'
import  { Toaster } from 'react-hot-toast';

export default function App() {

  const {authData, isloading}  = useAuthUser();

  // if(isloading) return <h1>Loading...</h1>;
  const isAuthenticated = Boolean(authData);
  const isOnboarded = authData?.user?.isOnboarded;

  return (
    <div data-theme="light">
      <Toaster/>
      <Routes >
        <Route path="/" element={!isAuthenticated ? <LoginPage /> : !isOnboarded ? <Navigate to="/onboarding" /> : <Navigate to="/dashboard" />} />
        <Route path = "/onboarding" element={isAuthenticated && !isOnboarded ? <Onboarding/> : <Navigate to="/dashboard" />} />
        <Route path = "/dashboard" element={isAuthenticated && isOnboarded ? <Dashboard/> : <Navigate to="/" />} />
        <Route path = "*" element={<Navigate to="/" />} />
      </Routes>  
    </div>
    
  )
}
