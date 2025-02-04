
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/nav-bar';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import ProfilePage from './pages/profile/ProfilePage';
import AdminPage from './pages/admin/AdminPage';
import UnauthorizedPage from './pages/unauthorized/UnauthorizedPage';
import NotFoundPage from './pages/not-found/NotFoundPage';
import AuthGuard from './guards/AuthGuard';
import { Role } from './models/role';


function App() {
  return (
    <>
      <Router>
        <NavBar/>
        <div className="container">
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>

            <Route path='/profile' 
              element={
                <AuthGuard roles={[Role.ADMIN, Role.USER]}>
                  <ProfilePage/>
                </AuthGuard>
              }/>
            <Route path='/admin' 
              element={<AuthGuard roles={[Role.ADMIN]}>
                <AdminPage/>
            </AuthGuard>}/>
            
            <Route path='/404' element={<NotFoundPage/>}/>
            <Route path='/401' element={<UnauthorizedPage/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
