import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import VerifyEmail from "./pages/VerifyEmail"
import Verify from "./pages/Verify"
import ProtectedRoute from "./components/protectedRoute"  // fixed import

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/verify',
    element: <VerifyEmail />,
  },
  {
    path: '/verify/:token',
    element: <Verify />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
