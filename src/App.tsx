import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Header from './components/Header'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthProvider'
import MessagesPage from './components/MessagesPage'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-24 pb-20 flex items-center justify-center bg-gradient-to-br from-purple-600 to-green-500 px-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </>

  )
}

export default App
