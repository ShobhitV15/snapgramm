import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import PageLayout  from './Layouts/PageLayout/PageLayout';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase';

function App() {
  const [authUser] = useAuthState(auth);
  return (
    <>
    <PageLayout>   {/**Wrapping everything in pagelayout */}
    <Routes>
      <Route path='/home' element={ authUser ? <HomePage/> : <Navigate to='/auth'/>}/>
      <Route path='/auth' element={ !authUser ? <AuthPage/> : <Navigate to='/home'/>} />  {/** this authUser holds the login/logout state globally */}
      <Route path='/:username' element={<ProfilePage/>}/>
    </Routes>
    </PageLayout>
    </>
  )
}

export default App
