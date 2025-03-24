import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LandingLayout from "./Layouts/LandingLayout"
import LandingPage from "./pages/LandingPage"
import SignUp from "./pages/signUp/SignUp"
import SignIn from "./pages/signIn/SignIn"
import Dashboard from "./pages/Dashboard"
import PatientData from "./pages/patientdata/PatientData";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout/>,
    children: [
      {
        index: true,
        element: <LandingPage/>
      },
      {
        path: 'signup',
        element: <SignUp/>
      },
      {
        path:'signin',
        element: <SignIn/>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <Dashboard/>
  },
  {
    path: 'patientData',
    element: <PatientData/>
  }
  
])

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}
export default App