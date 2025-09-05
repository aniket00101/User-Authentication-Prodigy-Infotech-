import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import VerifyEmail from "./pages/VerifyEmail"
import Verify from "./pages/Verify"
import ProtectedRoute from "./components/protectedRoute"  // fixed import
import ForgotPassword from "./pages/ForgotPassword"
import VerifyOTP from "./pages/VerifyOTP"
import ChangePassword from "./pages/Changepassword"

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
    path: '/verify-otp/:email',
    element: <VerifyOTP />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/change-password/:email',
    element: <ChangePassword />,
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
