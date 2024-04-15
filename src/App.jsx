import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';

function App() {
  return (
    <>
    <Routes>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/auth' element={<AuthPage/>}/>
    </Routes>
    </>
  )
}

export default App
