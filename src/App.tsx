import { createBrowserRouter, Navigate, Outlet, RouterProvider, ScrollRestoration } from 'react-router';
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthProvider';
import MessagesPage from './components/MessagesPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import AboutUs from './components/About';

const RootLayout = () => {
  return (<>
    <ScrollRestoration />
    <AuthProvider>
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-20 flex items-center justify-center bg-gradient-to-br from-purple-600 to-green-500 px-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  </>)
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/messages", element: <ProtectedRoute><MessagesPage /></ProtectedRoute> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/about", element: <AboutUs /> },
      { path: "*", element: <Navigate to="/" /> }
    ]
  }
])

function App() {
  return (<RouterProvider router={router} />)
}
export default App;
