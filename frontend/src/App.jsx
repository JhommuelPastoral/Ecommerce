
import {Routes, Route, Navigate} from 'react-router'
import Login from './pages/Login.jsx'
import Onboarding from './pages/Onboarding.jsx'
import useAuthUser from './hooks/useAuthUser.js'
import Dashboard from './pages/Dashboard.jsx'

export default function App() {

  const {authData, isloading}  = useAuthUser();

  if(isloading) return <h1>Loading...</h1>;
  const isAuthenticated = Boolean(authData);
  const isOnboarded = authData?.user?.isOnboarded;

  return (
    <Routes>
      <Route path="/" element={!isAuthenticated ? <Login /> : !isOnboarded ? <Navigate to="/onboarding" /> : <Navigate to="/dashboard" />} />
      <Route path = "/onboarding" element={isAuthenticated && !isOnboarded ? <Onboarding/> : <Navigate to="/dashboard" />} />
      <Route path = "/dashboard" element={isAuthenticated && isOnboarded ? <Dashboard/> : <Navigate to="/" />} />
      <Route path = "*" element={<Navigate to="/" />} />
    </Routes>  
    
  )
}
