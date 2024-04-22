import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import PageLayout  from './Layouts/PageLayout/PageLayout';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {
  return (
    <>
    <PageLayout>   {/**Wrapping everything in pagelayout */}
    <Routes>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/auth' element={<AuthPage/>}/>
      <Route path='/:username' element={<ProfilePage/>}/>
    </Routes>
    </PageLayout>
    </>
  )
}

export default App
