import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from '~/pages/Auth/Login'
import Register from '~/pages/Auth/Register'
import Board from '~/pages/Boards/_id'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to='/login' replace />
  }
  return children
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/board' element={
          <ProtectedRoute>
            <Board />
          </ProtectedRoute>
        }> </Route>
        <Route path='/' element={<Navigate to='/login' replace />}></Route>
      </Routes>
    </Router>
  )
}

export default App