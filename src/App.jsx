import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import PageLayout  from './Layouts/PageLayout/PageLayout';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase';
import useGetUserProfileByUsername from './hooks/useGetUserProfileByUsername';

function App() {
  const [authUser] = useAuthState(auth);
  useGetUserProfileByUsername
  return (
    <>
    <PageLayout>   {/**Wrapping everything in pagelayout */}
    <Routes>
      <Route path='/' element={ authUser ? <HomePage/> : <Navigate to='/auth'/>}/>
      <Route path='/auth' element={ !authUser ? <AuthPage/> : <Navigate to='/'/>} />  {/** this authUser holds the login/logout state globally */}
      <Route path='/:username' element={<ProfilePage/>}/>
    </Routes>
    </PageLayout>
    </>
  )
}

export default App
