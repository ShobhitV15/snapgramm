import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import PageLayout  from './Layouts/PageLayout/PageLayout';

function App() {
  return (
    <>
    <PageLayout>   {/**Wrapping everything in pagelayout */}
    <Routes>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/auth' element={<AuthPage/>}/>
    </Routes>
    </PageLayout>
    </>
  )
}

export default App
