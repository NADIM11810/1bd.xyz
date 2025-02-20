import { RouterProvider } from "react-router-dom"
import { router } from "./Routes/Routes"
import{ Toaster } from 'react-hot-toast';
function App() {
  return (
    <div className=" min-h-screen">
       <Toaster/>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
